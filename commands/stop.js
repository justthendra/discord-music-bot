const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createSuccessEmbed } = require('../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop music and clear queue')
        .setDescriptionLocalizations({
            tr: 'Müziği durdur ve kuyruğu temizle'
        }),

    async execute(interaction, player) {
        const guildId = interaction.guildId;

        player.stop();

        const embed = createSuccessEmbed(`⏹️ ${i18n.t('stop.stopped', guildId)}`, guildId);
        await interaction.reply({ embeds: [embed] });
    },
};
