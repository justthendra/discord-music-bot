const { EmbedBuilder } = require('discord.js');
const config = require('../config');
const i18n = require('../locales');

/**
 * Format duration in seconds to MM:SS or HH:MM:SS
 */
function formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';

    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Create a progress bar
 */
function createProgressBar(current, total, length = config.progressBar.length) {
    const percentage = total > 0 ? current / total : 0;
    const filled = Math.round(length * percentage);
    const empty = length - filled;

    return config.progressBar.filledChar.repeat(filled) +
        config.progressBar.emptyChar.repeat(empty);
}

/**
 * Get volume emoji based on level
 */
function getVolumeEmoji(volume) {
    if (volume === 0) return config.emojis.volumeMute;
    if (volume < 33) return config.emojis.volumeLow;
    if (volume < 66) return config.emojis.volumeMedium;
    return config.emojis.volume;
}

/**
 * Get source emoji
 */
function getSourceEmoji(source) {
    const sourceMap = {
        'YouTube': config.emojis.youtube,
        'Spotify': config.emojis.spotify,
        'SoundCloud': config.emojis.soundcloud,
    };
    return sourceMap[source] || config.emojis.music;
}

/**
 * Create a music embed for track info
 */
function createTrackEmbed(track, guildId, options = {}) {
    const { title, showProgress, currentTime } = options;

    const embed = new EmbedBuilder()
        .setColor(config.colors.music)
        .setTitle(title || `${config.emojis.music} ${i18n.t('nowplaying.title', guildId)}`)
        .setDescription(`**[${track.title}](${track.url})**`)
        .addFields(
            {
                name: `${config.emojis.user} ${i18n.t('nowplaying.artist', guildId)}`,
                value: track.author || i18n.t('common.unknownArtist', guildId),
                inline: true
            },
            {
                name: `${config.emojis.clock} ${i18n.t('nowplaying.duration', guildId)}`,
                value: formatDuration(track.duration),
                inline: true
            },
            {
                name: `${getSourceEmoji(track.source)} ${i18n.t('nowplaying.source', guildId)}`,
                value: track.source || 'Unknown',
                inline: true
            }
        )
        .setTimestamp();

    if (track.thumbnail) {
        embed.setThumbnail(track.thumbnail);
    }

    if (track.requester) {
        embed.addFields({
            name: `${config.emojis.user} ${i18n.t('nowplaying.requestedBy', guildId)}`,
            value: track.requester.tag || track.requester.username || 'Unknown',
            inline: true
        });
    }

    if (showProgress && currentTime !== undefined) {
        const progressBar = createProgressBar(currentTime, track.duration);
        embed.addFields({
            name: `${config.emojis.play} ${i18n.t('nowplaying.progress', guildId)}`,
            value: `${formatDuration(currentTime)} ${progressBar} ${formatDuration(track.duration)}`,
            inline: false
        });
    }

    return embed;
}

/**
 * Create a queue embed
 */
function createQueueEmbed(tracks, currentTrack, guildId, page = 1, itemsPerPage = 10) {
    const totalPages = Math.ceil(tracks.length / itemsPerPage);
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const pageItems = tracks.slice(startIdx, endIdx);

    const embed = new EmbedBuilder()
        .setColor(config.colors.primary)
        .setTitle(`${config.emojis.queue} ${i18n.t('queue.title', guildId)}`)
        .setTimestamp();

    if (currentTrack) {
        embed.addFields({
            name: `${config.emojis.music} ${i18n.t('queue.nowPlaying', guildId)}`,
            value: `**[${currentTrack.title}](${currentTrack.url})**\n` +
                `${config.emojis.user} ${currentTrack.author || i18n.t('common.unknownArtist', guildId)} • ` +
                `${config.emojis.clock} ${formatDuration(currentTrack.duration)}`,
            inline: false
        });
    }

    if (pageItems.length > 0) {
        const queueList = pageItems.map((track, index) => {
            const position = startIdx + index + 1;
            return `**${position}.** [${track.title}](${track.url}) - ${track.author || i18n.t('common.unknownArtist', guildId)} \`${formatDuration(track.duration)}\``;
        }).join('\n');

        let fieldValue = queueList;
        if (tracks.length > endIdx) {
            fieldValue += `\n\n${i18n.t('queue.moreItems', guildId, { count: tracks.length - endIdx })}`;
        }

        embed.addFields({
            name: `${config.emojis.queue} ${i18n.t('queue.upNext', guildId)} (${tracks.length} ${i18n.t('queue.tracks', guildId)})`,
            value: fieldValue,
            inline: false
        });
    }

    // Calculate total duration
    const totalDuration = tracks.reduce((acc, track) => acc + (track.duration || 0), 0) +
        (currentTrack?.duration || 0);

    embed.setFooter({
        text: `${i18n.t('queue.totalDuration', guildId)}: ${formatDuration(totalDuration)} • Page ${page}/${totalPages || 1}`
    });

    return embed;
}

/**
 * Create success embed
 */
function createSuccessEmbed(message, guildId) {
    return new EmbedBuilder()
        .setColor(config.colors.success)
        .setDescription(`${config.emojis.success} ${message}`);
}

/**
 * Create error embed
 */
function createErrorEmbed(message, guildId) {
    return new EmbedBuilder()
        .setColor(config.colors.error)
        .setDescription(`${config.emojis.error} ${message}`);
}

/**
 * Create warning embed
 */
function createWarningEmbed(message, guildId) {
    return new EmbedBuilder()
        .setColor(config.colors.warning)
        .setDescription(`${config.emojis.warning} ${message}`);
}

/**
 * Create info embed
 */
function createInfoEmbed(message, guildId) {
    return new EmbedBuilder()
        .setColor(config.colors.primary)
        .setDescription(`${config.emojis.info} ${message}`);
}

/**
 * Create lyrics embed
 */
function createLyricsEmbed(title, artist, lyrics, guildId) {
    const embed = new EmbedBuilder()
        .setColor(config.colors.music)
        .setTitle(`${config.emojis.lyrics} ${i18n.t('lyrics.title', guildId)}`)
        .setDescription(`**${title}** - ${artist}`)
        .setFooter({ text: i18n.t('lyrics.poweredBy', guildId) });

    // Discord has a 4096 character limit for embed descriptions
    // We'll use fields for lyrics, each field can have 1024 chars
    if (lyrics.length <= 2000) {
        embed.addFields({ name: '\u200b', value: lyrics });
    } else {
        // Split lyrics into chunks
        const chunks = [];
        let remaining = lyrics;

        while (remaining.length > 0) {
            if (remaining.length <= 1000) {
                chunks.push(remaining);
                break;
            }

            // Find a good break point (newline or space)
            let breakPoint = remaining.lastIndexOf('\n', 1000);
            if (breakPoint === -1 || breakPoint < 500) {
                breakPoint = remaining.lastIndexOf(' ', 1000);
            }
            if (breakPoint === -1) {
                breakPoint = 1000;
            }

            chunks.push(remaining.slice(0, breakPoint));
            remaining = remaining.slice(breakPoint).trim();
        }

        // Add only first 3 chunks to avoid hitting embed limits
        const maxChunks = Math.min(chunks.length, 3);
        for (let i = 0; i < maxChunks; i++) {
            embed.addFields({
                name: i === 0 ? '\u200b' : '...',
                value: chunks[i]
            });
        }

        if (chunks.length > 3) {
            embed.addFields({
                name: '...',
                value: i18n.t('lyrics.tooLong', guildId)
            });
        }
    }

    return embed;
}

module.exports = {
    formatDuration,
    createProgressBar,
    getVolumeEmoji,
    getSourceEmoji,
    createTrackEmbed,
    createQueueEmbed,
    createSuccessEmbed,
    createErrorEmbed,
    createWarningEmbed,
    createInfoEmbed,
    createLyricsEmbed,
};
