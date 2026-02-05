const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createSuccessEmbed, createInfoEmbed } = require('../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Set loop mode')
        .setDescriptionLocalizations({
            tr: 'Tekrar modunu ayarla'
        })
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Loop mode')
                .setDescriptionLocalizations({
                    tr: 'Tekrar modu'
                })
                .addChoices(
                    { name: 'Off', value: 'off', name_localizations: { tr: 'Kapalı' } },
                    { name: 'Track', value: 'track', name_localizations: { tr: 'Şarkı' } },
                    { name: 'Queue', value: 'queue', name_localizations: { tr: 'Kuyruk' } }
                )),

    async execute(interaction, player) {
        const guildId = interaction.guildId;
        const queue = player.getQueue();
        const mode = interaction.options.getString('mode');

        if (!mode) {
            // Show current mode
            const options = queue.getOptions();
            let currentMode = 'off';
            if (options.loop) currentMode = 'track';
            else if (options.loopQueue) currentMode = 'queue';

            const modeName = i18n.t(`loop.modes.${currentMode}`, guildId);
            const embed = createInfoEmbed(
                i18n.t('loop.current', guildId, { mode: modeName }),
                guildId
            );
            return interaction.reply({ embeds: [embed] });
        }

        // Set mode
        switch (mode) {
            case 'off':
                queue.setOptions({ loop: false, loopQueue: false });
                break;
            case 'track':
                queue.setOptions({ loop: true, loopQueue: false });
                break;
            case 'queue':
                queue.setOptions({ loop: false, loopQueue: true });
                break;
        }

        const modeName = i18n.t(`loop.modes.${mode}`, guildId);
        const embed = createSuccessEmbed(
            i18n.t('loop.modeChanged', guildId, { mode: modeName }),
            guildId
        );

        await interaction.reply({ embeds: [embed] });
    },
};
