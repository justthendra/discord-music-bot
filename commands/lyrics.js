const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createLyricsEmbed, createErrorEmbed, createInfoEmbed } = require('../utils/embedBuilder');

// Simple lyrics fetcher using Genius search
async function searchLyrics(query) {
    try {
        // Try to use genius-lyrics-api if available
        const { getLyrics, searchSong } = require('genius-lyrics-api');

        const apiKey = process.env.GENIUS_API_KEY;
        if (!apiKey) {
            return null;
        }

        const options = {
            apiKey,
            title: query,
            artist: '',
            optimizeQuery: true,
        };

        const lyrics = await getLyrics(options);
        if (lyrics) {
            // Try to get song info for proper title/artist
            const song = await searchSong(options);
            if (song && song.length > 0) {
                return {
                    title: song[0].title,
                    artist: song[0].artist.name,
                    lyrics: lyrics,
                };
            }
            return {
                title: query,
                artist: 'Unknown',
                lyrics: lyrics,
            };
        }
        return null;
    } catch (error) {
        console.error('Lyrics fetch error:', error.message);
        return null;
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Show song lyrics')
        .setDescriptionLocalizations({
            tr: 'Şarkı sözlerini göster'
        })
        .addStringOption(option =>
            option.setName('song')
                .setDescription('Song name (leave empty for current song)')
                .setDescriptionLocalizations({
                    tr: 'Şarkı adı (boş bırakırsanız çalan şarkı)'
                })),

    async execute(interaction, player) {
        const guildId = interaction.guildId;
        let query = interaction.options.getString('song');

        // If no query, use current track
        if (!query) {
            const current = player.getCurrentTrack();
            if (!current) {
                const embed = createErrorEmbed(i18n.t('common.notPlaying', guildId), guildId);
                return interaction.reply({ embeds: [embed] });
            }
            query = `${current.title} ${current.author || ''}`.trim();
        }

        await interaction.deferReply();

        // Show searching message
        const searchingEmbed = createInfoEmbed(i18n.t('lyrics.searching', guildId), guildId);
        await interaction.editReply({ embeds: [searchingEmbed] });

        const result = await searchLyrics(query);

        if (!result || !result.lyrics) {
            const embed = createErrorEmbed(i18n.t('lyrics.notFound', guildId), guildId);
            return interaction.editReply({ embeds: [embed] });
        }

        const embed = createLyricsEmbed(result.title, result.artist, result.lyrics, guildId);
        await interaction.editReply({ embeds: [embed] });
    },
};
