const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createSuccessEmbed, createErrorEmbed } = require('../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove a song from queue')
        .setDescriptionLocalizations({
            tr: 'Kuyruktan şarkı kaldır'
        })
        .addIntegerOption(option =>
            option.setName('position')
                .setDescription('Song position in queue')
                .setDescriptionLocalizations({
                    tr: 'Kuyruktaki şarkı numarası'
                })
                .setRequired(true)
                .setMinValue(1)),

    async execute(interaction, player) {
        const guildId = interaction.guildId;
        const position = interaction.options.getInteger('position');
        const queue = player.getQueue();
        const tracks = queue.getTracks();

        if (tracks.length === 0) {
            const embed = createErrorEmbed(i18n.t('common.queueEmpty', guildId), guildId);
            return interaction.reply({ embeds: [embed] });
        }

        if (position < 1 || position > tracks.length) {
            const embed = createErrorEmbed(
                i18n.t('remove.invalid', guildId, { count: tracks.length }),
                guildId
            );
            return interaction.reply({ embeds: [embed] });
        }

        const removed = queue.remove(position - 1);

        if (removed) {
            const embed = createSuccessEmbed(
                i18n.t('remove.removed', guildId, { title: removed.title }),
                guildId
            );
            await interaction.reply({ embeds: [embed] });
        } else {
            const embed = createErrorEmbed(i18n.t('common.error', guildId), guildId);
            await interaction.reply({ embeds: [embed] });
        }
    },
};
