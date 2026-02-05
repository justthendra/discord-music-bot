const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createSuccessEmbed, createErrorEmbed } = require('../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song')
        .setDescriptionLocalizations({
            tr: 'Şarkıyı atla'
        }),

    async execute(interaction, player) {
        const guildId = interaction.guildId;
        const current = player.getCurrentTrack();

        if (!current) {
            const embed = createErrorEmbed(i18n.t('common.notPlaying', guildId), guildId);
            return interaction.reply({ embeds: [embed] });
        }

        const skipped = player.skip();

        const embed = createSuccessEmbed(
            `⏭️ ${i18n.t('skip.skipped', guildId)} - **${current.title}**`,
            guildId
        );

        await interaction.reply({ embeds: [embed] });
    },
};
