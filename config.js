module.exports = {
    // Bot settings
    defaultVolume: parseInt(process.env.DEFAULT_VOLUME) || 50,
    defaultLanguage: process.env.DEFAULT_LANGUAGE || 'tr',

    // Player settings
    player: {
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 60000, // 1 minute
        leaveOnEnd: true,
    },

    // Embed colors
    colors: {
        primary: '#5865F2',    // Discord blurple
        success: '#57F287',    // Green
        warning: '#FEE75C',    // Yellow
        error: '#ED4245',      // Red
        music: '#1DB954',      // Spotify green
        youtube: '#FF0000',    // YouTube red
        soundcloud: '#FF5500', // SoundCloud orange
    },

    // Emojis
    emojis: {
        play: '▶️',
        pause: '⏸️',
        stop: '⏹️',
        skip: '⏭️',
        previous: '⏮️',
        loop: '🔁',
        loopOne: '🔂',
        shuffle: '🔀',
        queue: '📜',
        music: '🎵',
        volume: '🔊',
        volumeMute: '🔇',
        volumeLow: '🔈',
        volumeMedium: '🔉',
        clock: '⏱️',
        user: '👤',
        error: '❌',
        success: '✅',
        warning: '⚠️',
        info: 'ℹ️',
        lyrics: '📝',
        search: '🔍',
        youtube: '📺',
        spotify: '🎧',
        soundcloud: '☁️',
    },

    // Progress bar settings
    progressBar: {
        length: 15,
        filledChar: '▰',
        emptyChar: '▱',
    }
};
