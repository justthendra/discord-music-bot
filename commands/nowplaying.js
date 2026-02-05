const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createTrackEmbed, createErrorEmbed } = require('../utils/embedBuilder');
const { createMusicButtons } = require('../utils/buttons');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Show currently playing song')
        .setDescriptionLocalizations({
            tr: 'Şu an çalan şarkıyı göster'
        }),

    async execute(interaction, player) {
        const guildId = interaction.guildId;
        const current = player.getCurrentTrack();

        if (!current) {
            const embed = createErrorEmbed(i18n.t('common.notPlaying', guildId), guildId);
            return interaction.reply({ embeds: [embed] });
        }

        // Determine loop state
        const queue = player.getQueue();
        const options = queue.getOptions();
        let loopMode = 'off';
        if (options.loop) loopMode = 'track';
        else if (options.loopQueue) loopMode = 'queue';

        const embed = createTrackEmbed(current, guildId, {
            showProgress: true,
            currentTime: 0 // Initial position
        });

        const buttons = createMusicButtons(guildId, false, loopMode);

        await interaction.reply({ embeds: [embed], components: [buttons] });
    },
};
