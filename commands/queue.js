const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const i18n = require('../locales');
const config = require('../config');
const { createErrorEmbed } = require('../utils/embedBuilder');
const { createPaginationButtons } = require('../utils/buttons');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Show the music queue')
        .setDescriptionLocalizations({
            tr: 'Müzik kuyruğunu göster'
        }),

    async execute(interaction, player) {
        const guildId = interaction.guildId;
        const queue = player.getQueue();
        const current = player.getCurrentTrack();
        const tracks = queue.getTracks();

        if (!current && tracks.length === 0) {
            const embed = createErrorEmbed(i18n.t('queue.empty', guildId), guildId);
            return interaction.reply({ embeds: [embed] });
        }

        const ITEMS_PER_PAGE = 10;
        const totalPages = Math.ceil(tracks.length / ITEMS_PER_PAGE) || 1;
        let currentPage = 1;

        const generateEmbed = (page) => {
            const start = (page - 1) * ITEMS_PER_PAGE;
            const currentTracks = tracks.slice(start, start + ITEMS_PER_PAGE);

            const embed = new EmbedBuilder()
                .setColor(config.colors.primary)
                .setTitle(`${config.emojis.queue} ${i18n.t('queue.title', guildId)}`)
                .setTimestamp();

            // Current Track
            if (current) {
                embed.addFields({
                    name: `${config.emojis.play} ${i18n.t('queue.nowPlaying', guildId)}`,
                    value: `[${current.title}](${current.url}) | \`${current.author}\` | \`${current.durationHuman}\``
                });
            }

            // Queue List
            if (currentTracks.length > 0) {
                const trackList = currentTracks.map((track, index) => {
                    return `**${start + index + 1}.** [${track.title}](${track.url}) | \`${track.durationHuman}\``;
                }).join('\n');

                embed.addFields({
                    name: `${config.emojis.list || '📋'} ${i18n.t('queue.upNext', guildId)} (${tracks.length})`,
                    value: trackList
                });
            } else {
                embed.addFields({
                    name: `${i18n.t('queue.upNext', guildId)}`,
                    value: i18n.t('queue.empty', guildId)
                });
            }

            embed.setFooter({
                text: `${i18n.t('common.page', guildId)} ${page}/${totalPages} • ${i18n.t('queue.loop', guildId)}: ${queue.getOptions().loop ? 'On' : 'Off'} | ${i18n.t('queue.loopQueue', guildId)}: ${queue.getOptions().loopQueue ? 'On' : 'Off'}`
            });

            return embed;
        };

        // Initial reply
        const embed = generateEmbed(currentPage);
        const buttons = createPaginationButtons(currentPage > 1, currentPage < totalPages);

        // Only show buttons if there are multiple pages
        const components = totalPages > 1 ? [buttons] : [];

        const message = await interaction.reply({
            embeds: [embed],
            components: components,
            fetchReply: true
        });

        if (totalPages <= 1) return;

        // Create Collector
        const collector = message.createMessageComponentCollector({
            filter: i => ['page_prev', 'page_next'].includes(i.customId) && i.user.id === interaction.user.id,
            time: 60000
        });

        collector.on('collect', async i => {
            if (i.customId === 'page_prev') {
                currentPage--;
            } else if (i.customId === 'page_next') {
                currentPage++;
            }

            const newEmbed = generateEmbed(currentPage);
            const newButtons = createPaginationButtons(currentPage > 1, currentPage < totalPages);

            await i.update({
                embeds: [newEmbed],
                components: [newButtons]
            });
        });

        collector.on('end', async () => {
            // Remove buttons when expired
            try {
                const finalEmbed = generateEmbed(currentPage);
                await interaction.editReply({
                    embeds: [finalEmbed],
                    components: []
                });
            } catch (e) {
                // Message might be deleted
            }
        });
    },
};
