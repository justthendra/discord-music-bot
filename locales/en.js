// English translations
module.exports = {
    // General
    common: {
        error: 'An error occurred!',
        noPermission: 'You don\'t have permission to use this command!',
        notInVoice: 'You must join a voice channel first!',
        notPlaying: 'No song is currently playing!',
        queueEmpty: 'The queue is empty!',
        unknownArtist: 'Unknown',
        page: 'Page',
    },

    // Play command
    play: {
        description: 'Play music',
        optionDescription: 'Song name or URL (YouTube, Spotify, SoundCloud)',
        addedToQueue: 'Added to queue!',
        playlistAdded: '{count} songs added to queue!',
        playlistName: 'Playlist: {name}',
        notFound: 'Song not found!',
        source: 'Source',
    },

    // Skip command
    skip: {
        description: 'Skip the current song',
        skipped: 'Song skipped!',
        noNext: 'No more songs in queue!',
    },

    // Pause command
    pause: {
        description: 'Pause the song',
        paused: 'Song paused!',
        alreadyPaused: 'Song is already paused!',
    },

    // Resume command
    resume: {
        description: 'Resume the song',
        resumed: 'Song resumed!',
        notPaused: 'Song is not paused!',
    },

    // Stop command
    stop: {
        description: 'Stop music and clear queue',
        stopped: 'Music stopped and queue cleared!',
    },

    // Queue command
    queue: {
        description: 'Show the music queue',
        title: 'Music Queue',
        nowPlaying: 'Now Playing',
        upNext: 'Up Next',
        moreItems: '... and {count} more songs',
        totalDuration: 'Total Duration',
        tracks: 'tracks',
        loop: 'Loop',
        loopQueue: 'Loop Queue',
    },

    // Now Playing command
    nowplaying: {
        description: 'Show currently playing song',
        title: 'Now Playing',
        artist: 'Artist',
        duration: 'Duration',
        source: 'Source',
        requestedBy: 'Requested by',
        progress: 'Progress',
    },

    // Volume command
    volume: {
        description: 'Set volume level',
        optionDescription: 'Volume level (0-100)',
        current: 'Current volume: {volume}%',
        changed: 'Volume set to {volume}%!',
        invalid: 'Invalid volume! Enter a value between 0-100.',
    },

    // Shuffle command
    shuffle: {
        description: 'Shuffle the queue',
        shuffled: 'Queue shuffled!',
    },

    // Disconnect command
    disconnect: {
        description: 'Leave the voice channel',
        disconnected: 'Left the voice channel!',
        notConnected: 'Bot is not in a voice channel!',
    },

    // Loop command
    loop: {
        description: 'Set loop mode',
        optionDescription: 'Loop mode',
        modes: {
            off: 'Off',
            track: 'Track',
            queue: 'Queue',
        },
        modeChanged: 'Loop mode: {mode}',
        current: 'Current loop mode: {mode}',
    },

    // Seek command
    seek: {
        description: 'Seek to a specific time in the song',
        optionDescription: 'Time (seconds)',
        seeked: 'Seeked to {time} seconds!',
        invalid: 'Invalid time! Song duration: {duration} seconds',
    },

    // Remove command
    remove: {
        description: 'Remove a song from queue',
        optionDescription: 'Song number',
        removed: '"{title}" removed from queue!',
        invalid: 'Invalid song number! Queue has {count} songs.',
    },

    // Clear command
    clear: {
        description: 'Clear the queue',
        cleared: 'Queue cleared! {count} songs removed.',
    },

    // Lyrics command
    lyrics: {
        description: 'Show song lyrics',
        optionDescription: 'Song name (leave empty for current song)',
        title: 'Lyrics',
        notFound: 'Lyrics not found!',
        searching: 'Searching for lyrics...',
        tooLong: 'Lyrics too long, showing partial...',
        poweredBy: 'Powered by Genius',
    },

    // Help command
    help: {
        title: 'Commands',
        description: 'Here are all available commands:',
        category: {
            music: 'Music Commands',
            system: 'System Commands',
        },
    },

    // Events
    events: {
        trackStart: 'Now playing',
        trackEnd: 'Finished',
        queueEnd: 'Queue ended',
        error: 'Error',
    },
};
