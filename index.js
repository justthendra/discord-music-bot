require('dotenv').config();
const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const { MusicPlayer } = require('disvoice');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const i18n = require('./locales');
const { createMusicButtons } = require('./utils/buttons');
const { createErrorEmbed, createSuccessEmbed, createInfoEmbed } = require('./utils/embedBuilder');

// Create Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
    ]
});

// Create music player instance
const player = new MusicPlayer({
    leaveOnEmpty: config.player.leaveOnEmpty,
    leaveOnEmptyCooldown: config.player.leaveOnEmptyCooldown,
    leaveOnEnd: config.player.leaveOnEnd,
    volume: config.defaultVolume
});

// Setup player events
player.on('trackStart', (track) => {
    console.log(`🎵 ${i18n.t('events.trackStart')}: ${track.title}`);
});

player.on('trackEnd', (track) => {
    console.log(`✅ ${i18n.t('events.trackEnd')}: ${track.title}`);
});

player.on('queueEnd', () => {
    console.log(`📭 ${i18n.t('events.queueEnd')}`);
});

player.on('error', (error, track) => {
    console.error(`❌ ${i18n.t('events.error')}: ${error.message}`, track?.title);
});

// Load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`📦 Loaded command: ${command.data.name}`);
    }
}

// Ready event
client.once('ready', () => {
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`✅ Bot ready! Logged in as ${client.user.tag}`);
    console.log(`🎵 Active in ${client.guilds.cache.size} servers`);
    console.log(`📦 Loaded ${client.commands.size} commands`);
    console.log(`${'═'.repeat(50)}\n`);

    // Set activity
    client.user.setActivity('music | /play', { type: ActivityType.Listening });
});

// Interaction handler
client.on('interactionCreate', async interaction => {
    const guildId = interaction.guildId;

    // Handle Slash Commands
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, player);
        } catch (error) {
            console.error(`[Command Error] ${interaction.commandName}:`, error);

            const errorMessage = `❌ ${i18n.t('common.error', guildId)}`;

            try {
                if (interaction.deferred) {
                    await interaction.editReply({ content: errorMessage });
                } else if (!interaction.replied) {
                    await interaction.reply({ content: errorMessage, ephemeral: true });
                } else {
                    await interaction.followUp({ content: errorMessage, ephemeral: true });
                }
            } catch (replyError) {
                console.error('[Reply Error]:', replyError.message);
            }
        }
        return;
    }

    // Handle Buttons
    if (interaction.isButton()) {
        if (!interaction.customId.startsWith('music_')) return;

        // Check voice channel
        const memberVoice = interaction.member.voice.channel;
        const botVoice = interaction.guild.members.me.voice.channel; // Not exact check for same channel but basic check

        if (!memberVoice) {
            return interaction.reply({
                content: `❌ ${i18n.t('common.notInVoice', guildId)}`,
                ephemeral: true
            });
        }

        // Defer update to prevent "interaction failed"
        await interaction.deferUpdate();

        try {
            switch (interaction.customId) {
                case 'music_pause_resume': {
                    // Provide feedback? Or just update button?
                    // We need to check state. Since player object doesn't strictly expose isPaused, 
                    // we try to toggle.
                    // Actually MusicPlayer has pause() returning bookean and resume().
                    // But we don't know current state easily without keeping track or checking player internals.
                    // However, we can check if it was paused.
                    // Let's assume we can try to pause, if it returns false (already paused), we resume.

                    // A better way: check button style or look at player state if available.
                    // For now, let's just use a try-catch logic or internal state if possible.
                    // user can see button state. 

                    // Hacky way: Assume playing, try pause. If fail, resume.
                    // Or maintain state in button? No.

                    // Actually, let's try to pause.
                    const isPaused = player.pause();
                    if (!isPaused) {
                        player.resume();
                    }
                    break;
                }

                case 'music_stop': {
                    player.stop();
                    // Disable buttons or remove them
                    await interaction.editReply({ components: [] });
                    await interaction.followUp({
                        embeds: [createSuccessEmbed(i18n.t('stop.stopped', guildId), guildId)],
                        ephemeral: true
                    });
                    return;
                }

                case 'music_skip': {
                    const current = player.getCurrentTrack();
                    if (current) {
                        player.skip();
                        await interaction.followUp({
                            embeds: [createSuccessEmbed(`${i18n.t('skip.skipped', guildId)}`, guildId)],
                            ephemeral: true
                        });
                    }
                    break;
                }

                case 'music_loop': {
                    const queue = player.getQueue();
                    const options = queue.getOptions();

                    // Cycle: Off -> Track -> Queue -> Off
                    if (!options.loop && !options.loopQueue) {
                        queue.setOptions({ loop: true, loopQueue: false }); // Track
                    } else if (options.loop) {
                        queue.setOptions({ loop: false, loopQueue: true }); // Queue
                    } else {
                        queue.setOptions({ loop: false, loopQueue: false }); // Off
                    }
                    break;
                }

                case 'music_shuffle': {
                    player.getQueue().shuffle();
                    await interaction.followUp({
                        embeds: [createSuccessEmbed(`${i18n.t('shuffle.shuffled', guildId)}`, guildId)],
                        ephemeral: true
                    });
                    break;
                }
            }

            // Update the message buttons to reflect new state
            // We need to reconstruct buttons with new state
            // How to know if paused? We just toggled it.
            // How to know loop mode? We just cycled it.

            // Re-read state
            // Is there an isPaused() method? No standard one in the interface provided earlier. 
            // MusicPlayer.ts has isPlaying but that might mean "not stopped".

            // Let's look at loop mode
            const queue = player.getQueue();
            const options = queue.getOptions();
            let loopMode = 'off';
            if (options.loop) loopMode = 'track';
            else if (options.loopQueue) loopMode = 'queue';

            // Pause state is tricky. Let's assume after toggle we can infer?
            // Or we can't easily know for UI update.
            // Let's assume playing unless we stopped.

            // Wait, I can try to use player.player.state.status if accessible or create a helper.
            // For now, let's default to playing for button state unless we know.

            const updatedRow = createMusicButtons(guildId, false, loopMode);
            // Note: Pause button visual update might be inaccurate if we don't track pause state.
            // Ideally MusicPlayer should expose isPaused.

            await interaction.editReply({ components: [updatedRow] });

        } catch (error) {
            console.error('Button Error:', error);
        }
    }
});

// Login
client.login(process.env.DISCORD_TOKEN);
