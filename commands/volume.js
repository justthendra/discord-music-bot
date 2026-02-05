const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createSuccessEmbed, createInfoEmbed, getVolumeEmoji } = require('../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Set volume level')
        .setDescriptionLocalizations({
            tr: 'Ses seviyesini ayarla'
        })
        .addIntegerOption(option =>
            option.setName('level')
                .setDescription('Volume level (0-100)')
                .setDescriptionLocalizations({
                    tr: 'Ses seviyesi (0-100)'
                })
                .setMinValue(0)
                .setMaxValue(100)),

    async execute(interaction, player) {
        const guildId = interaction.guildId;
        const volume = interaction.options.getInteger('level');

        if (volume === null) {
            // Show current volume
            const currentVolume = player.getVolume();
            const emoji = getVolumeEmoji(currentVolume);
            const embed = createInfoEmbed(
                `${emoji} ${i18n.t('volume.current', guildId, { volume: currentVolume })}`,
                guildId
            );
            return interaction.reply({ embeds: [embed] });
        }

        player.setVolume(volume);

        const emoji = getVolumeEmoji(volume);
        const embed = createSuccessEmbed(
            `${emoji} ${i18n.t('volume.changed', guildId, { volume })}`,
            guildId
        );

        await interaction.reply({ embeds: [embed] });
    },
};
