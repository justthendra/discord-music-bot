const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createTrackEmbed, createErrorEmbed, createSuccessEmbed, getSourceEmoji } = require('../utils/embedBuilder');
const { createMusicButtons } = require('../utils/buttons');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play music')
        .setDescriptionLocalizations({
            tr: 'Müzik çal'
        })
        .addStringOption(option =>
            option.setName('song')
                .setDescription('Song name or URL (YouTube, Spotify, SoundCloud)')
                .setDescriptionLocalizations({
                    tr: 'Şarkı adı veya URL (YouTube, Spotify, SoundCloud)'
                })
                .setRequired(true)),

    async execute(interaction, player) {
        const guildId = interaction.guildId;

        try {
            await interaction.deferReply();
        } catch (e) {
            console.error('Defer failed:', e.message);
            return;
        }

        const query = interaction.options.getString('song');
        const member = interaction.member;
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            const embed = createErrorEmbed(i18n.t('common.notInVoice', guildId), guildId);
            return interaction.editReply({ embeds: [embed] });
        }

        try {
            const result = await player.play(query, interaction.user, voiceChannel);

            // Get current options for button state
            const queue = player.getQueue();
            const options = queue.getOptions();
            let loopMode = 'off';
            if (options.loop) loopMode = 'track';
            else if (options.loopQueue) loopMode = 'queue';

            const buttons = createMusicButtons(guildId, false, loopMode);

            if (result.playlist) {
                const embed = createSuccessEmbed(
                    `${config.emojis.success} ${i18n.t('play.playlistAdded', guildId, { count: result.tracks.length })}\n` +
                    `${config.emojis.queue} ${i18n.t('play.playlistName', guildId, { name: result.playlist.name })}`,
                    guildId
                );
                await interaction.editReply({ embeds: [embed], components: [buttons] });
            } else if (result.tracks.length > 0) {
                const track = result.tracks[0];
                const sourceEmoji = getSourceEmoji(track.source);

                const embed = createTrackEmbed(track, guildId, {
                    title: `${config.emojis.success} ${i18n.t('play.addedToQueue', guildId)}`
                });

                await interaction.editReply({ embeds: [embed], components: [buttons] });
            } else {
                const embed = createErrorEmbed(i18n.t('play.notFound', guildId), guildId);
                await interaction.editReply({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Play error:', error);
            const embed = createErrorEmbed(`${i18n.t('common.error', guildId)}: ${error.message}`, guildId);
            await interaction.editReply({ embeds: [embed] });
        }
    },
};
