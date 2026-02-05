const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createSuccessEmbed, createErrorEmbed } = require('../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear the queue')
        .setDescriptionLocalizations({
            tr: 'Kuyruğu temizle'
        }),

    async execute(interaction, player) {
        const guildId = interaction.guildId;
        const queue = player.getQueue();
        const tracks = queue.getTracks();

        if (tracks.length === 0) {
            const embed = createErrorEmbed(i18n.t('common.queueEmpty', guildId), guildId);
            return interaction.reply({ embeds: [embed] });
        }

        const count = tracks.length;
        queue.clear();

        const embed = createSuccessEmbed(
            i18n.t('clear.cleared', guildId, { count }),
            guildId
        );

        await interaction.reply({ embeds: [embed] });
    },
};
