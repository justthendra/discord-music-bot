const { SlashCommandBuilder } = require('discord.js');
const i18n = require('../locales');
const { createSuccessEmbed, createInfoEmbed } = require('../utils/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('language')
        .setDescription('Change bot language')
        .setDescriptionLocalizations({
            tr: 'Bot dilini değiştir'
        })
        .addStringOption(option =>
            option.setName('lang')
                .setDescription('Language')
                .setDescriptionLocalizations({
                    tr: 'Dil'
                })
                .addChoices(
                    { name: 'English', value: 'en' },
                    { name: 'Türkçe', value: 'tr' }
                )),

    async execute(interaction, player) {
        const guildId = interaction.guildId;
        const lang = interaction.options.getString('lang');

        if (!lang) {
            // Show current language
            const currentLang = i18n.getLanguage(guildId);
            const langNames = { en: 'English', tr: 'Türkçe' };
            const embed = createInfoEmbed(
                `🌐 Current language: **${langNames[currentLang]}**`,
                guildId
            );
            return interaction.reply({ embeds: [embed] });
        }

        i18n.setLanguage(guildId, lang);

        const langNames = { en: 'English', tr: 'Türkçe' };
        const messages = {
            en: `🌐 Language changed to **${langNames[lang]}**!`,
            tr: `🌐 Dil **${langNames[lang]}** olarak değiştirildi!`
        };

        const embed = createSuccessEmbed(messages[lang], guildId);
        await interaction.reply({ embeds: [embed] });
    },
};
