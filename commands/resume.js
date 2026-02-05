const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createSuccessEmbed, createErrorEmbed } = require('../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the song')
        .setDescriptionLocalizations({
            tr: 'Şarkıyı devam ettir'
        }),

    async execute(interaction, player) {
        const guildId = interaction.guildId;

        if (!player.getCurrentTrack()) {
            const embed = createErrorEmbed(i18n.t('common.notPlaying', guildId), guildId);
            return interaction.reply({ embeds: [embed] });
        }

        const resumed = player.resume();

        if (resumed) {
            const embed = createSuccessEmbed(`▶️ ${i18n.t('resume.resumed', guildId)}`, guildId);
            await interaction.reply({ embeds: [embed] });
        } else {
            const embed = createErrorEmbed(i18n.t('resume.notPaused', guildId), guildId);
            await interaction.reply({ embeds: [embed] });
        }
    },
};
