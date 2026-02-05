const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createSuccessEmbed, createErrorEmbed } = require('../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the queue')
        .setDescriptionLocalizations({
            tr: 'Kuyruğu karıştır'
        }),

    async execute(interaction, player) {
        const guildId = interaction.guildId;
        const queue = player.getQueue();

        if (queue.isEmpty()) {
            const embed = createErrorEmbed(i18n.t('common.queueEmpty', guildId), guildId);
            return interaction.reply({ embeds: [embed] });
        }

        queue.shuffle();

        const embed = createSuccessEmbed(`🔀 ${i18n.t('shuffle.shuffled', guildId)}`, guildId);
        await interaction.reply({ embeds: [embed] });
    },
};
