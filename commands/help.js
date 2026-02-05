const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const i18n = require('../locales');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List all available commands')
        .setDescriptionLocalizations({
            tr: 'Tüm komutları listele'
        }),

    async execute(interaction) {
        const guildId = interaction.guildId;
        const commands = interaction.client.commands;

        const embed = new EmbedBuilder()
            .setColor(config.colors.primary)
            .setTitle(`🤖 ${interaction.client.user.username} - ${i18n.t('help.title', guildId) || 'Commands'}`)
            .setDescription(i18n.t('help.description', guildId) || 'Here are all available commands:')
            .setThumbnail(interaction.client.user.displayAvatarURL());

        const categories = {
            Music: ['play', 'pause', 'resume', 'stop', 'skip', 'queue', 'nowplaying', 'volume', 'loop', 'shuffle', 'seek', 'remove', 'clear', 'lyrics', 'disconnect'],
            System: ['language', 'help']
        };

        // Helper to find command description
        const getDesc = (cmdName) => {
            const cmd = commands.get(cmdName);
            if (!cmd) return null;

            // Try to get localized description if available in raw data (depends on how djs stores it)
            // Or just use the default English description
            // For better i18n, we might need to add help strings to locale files, but for now English default is okay
            // or we try to map manually if we want perfection.
            // Let's stick to English descriptions from code for simplicity or check if we have translations.
            return cmd.data.description;
        };

        const musicCmds = categories.Music
            .map(name => {
                const desc = getDesc(name);
                return desc ? `\`/${name}\`: ${desc}` : null;
            })
            .filter(Boolean)
            .join('\n');

        const systemCmds = categories.System
            .map(name => {
                const desc = getDesc(name);
                return desc ? `\`/${name}\`: ${desc}` : null;
            })
            .filter(Boolean)
            .join('\n');

        if (musicCmds) {
            embed.addFields({
                name: `🎵 ${i18n.t('help.category.music', guildId) || 'Music'}`,
                value: musicCmds
            });
        }

        if (systemCmds) {
            embed.addFields({
                name: `⚙️ ${i18n.t('help.category.system', guildId) || 'System'}`,
                value: systemCmds
            });
        }

        const links = [];
        links.push(`[GitHub](https://github.com/justthendra/discord-music-bot)`);

        embed.addFields({
            name: '🔗 Links',
            value: links.join(' • ')
        });

        await interaction.reply({ embeds: [embed] });
    },
};
