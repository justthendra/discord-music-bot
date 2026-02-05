const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createSuccessEmbed, createErrorEmbed } = require('../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Leave the voice channel')
        .setDescriptionLocalizations({
            tr: 'Ses kanalından ayrıl'
        }),

    async execute(interaction, player) {
        const guildId = interaction.guildId;

        if (!player.isConnected()) {
            const embed = createErrorEmbed(i18n.t('disconnect.notConnected', guildId), guildId);
            return interaction.reply({ embeds: [embed] });
        }

        player.disconnect();

        const embed = createSuccessEmbed(`👋 ${i18n.t('disconnect.disconnected', guildId)}`, guildId);
        await interaction.reply({ embeds: [embed] });
    },
};
