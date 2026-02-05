const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config');

function createMusicButtons(guildId, isPaused = false, loopMode = 'off') {
    const row = new ActionRowBuilder();

    // Play/Pause Button
    row.addComponents(
        new ButtonBuilder()
            .setCustomId('music_pause_resume')
            .setEmoji(isPaused ? config.emojis.play : config.emojis.pause)
            .setStyle(isPaused ? ButtonStyle.Success : ButtonStyle.Secondary)
    );

    // Stop Button
    row.addComponents(
        new ButtonBuilder()
            .setCustomId('music_stop')
            .setEmoji(config.emojis.stop)
            .setStyle(ButtonStyle.Danger)
    );

    // Skip Button
    row.addComponents(
        new ButtonBuilder()
            .setCustomId('music_skip')
            .setEmoji(config.emojis.skip)
            .setStyle(ButtonStyle.Primary)
    );

    // Loop Button
    let loopStyle = ButtonStyle.Secondary;
    let loopEmoji = config.emojis.loop;

    if (loopMode === 'track') {
        loopStyle = ButtonStyle.Success;
        loopEmoji = config.emojis.loopOne;
    } else if (loopMode === 'queue') {
        loopStyle = ButtonStyle.Success;
        loopEmoji = config.emojis.loop;
    }

    row.addComponents(
        new ButtonBuilder()
            .setCustomId('music_loop')
            .setEmoji(loopEmoji)
            .setStyle(loopStyle)
    );

    // Shuffle Button
    row.addComponents(
        new ButtonBuilder()
            .setCustomId('music_shuffle')
            .setEmoji(config.emojis.shuffle)
            .setStyle(ButtonStyle.Secondary)
    );

    return row;
}

function createPaginationButtons(canBack, canNext) {
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('page_prev')
                .setEmoji(config.emojis.previous || '⬅️')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(!canBack),
            new ButtonBuilder()
                .setCustomId('page_next')
                .setEmoji(config.emojis.skip || '➡️') // Using skip emoji as next if specific next emoji is missing
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(!canNext)
        );
    return row;
}

module.exports = { createMusicButtons, createPaginationButtons };
