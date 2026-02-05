const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createSuccessEmbed, createErrorEmbed } = require('../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the song')
        .setDescriptionLocalizations({
            tr: 'Şarkıyı duraklat'
        }),

    async execute(interaction, player) {
        const guildId = interaction.guildId;

        if (!player.getCurrentTrack()) {
            const embed = createErrorEmbed(i18n.t('common.notPlaying', guildId), guildId);
            return interaction.reply({ embeds: [embed] });
        }

        const paused = player.pause();

        if (paused) {
            const embed = createSuccessEmbed(`⏸️ ${i18n.t('pause.paused', guildId)}`, guildId);
            await interaction.reply({ embeds: [embed] });
        } else {
            const embed = createErrorEmbed(i18n.t('pause.alreadyPaused', guildId), guildId);
            await interaction.reply({ embeds: [embed] });
        }
    },
};
