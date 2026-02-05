<div align="center">

# 🎵 Discord Music Bot

A feature-rich Discord music bot with multi-platform support and bilingual interface.

[![Discord.js](https://img.shields.io/badge/discord.js-v14-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.js.org/)
[![Node.js](https://img.shields.io/badge/node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

[English](#english) | [Türkçe](#türkçe)

</div>

---

## English

### ✨ Features

| Feature | Description |
|---------|-------------|
| 🎥 **YouTube** | Play videos, playlists, and search |
| 🎵 **Spotify** | Tracks, albums, and playlists |
| ☁️ **SoundCloud** | Tracks and playlists |
| 🌐 **Bilingual** | English & Turkish support |
| 📝 **Lyrics** | Fetch song lyrics from Genius |
| 🔁 **Loop** | Track and queue repeat modes |
| 🔀 **Shuffle** | Randomize your queue |

### 🎮 Commands

| Command | Description |
|---------|-------------|
| `/play <song>` | Play music (URL or search) |
| `/skip` | Skip the current song |
| `/pause` | Pause playback |
| `/resume` | Resume playback |
| `/stop` | Stop and clear queue |
| `/queue` | Show the music queue |
| `/nowplaying` | Show current song |
| `/volume [level]` | Set or show volume (0-100) |
| `/shuffle` | Shuffle the queue |
| `/loop [mode]` | Set loop mode (off/track/queue) |
| `/remove <position>` | Remove song from queue |
| `/clear` | Clear the entire queue |
| `/lyrics [song]` | Show song lyrics |
| `/language [lang]` | Change bot language |
| `/disconnect` | Leave voice channel |

### 📦 Installation

#### Prerequisites

- [Node.js](https://nodejs.org/) v18.0.0 or higher
- [FFmpeg](https://ffmpeg.org/download.html) installed on your system
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) for YouTube support
- A Discord Bot Token

#### Setup

1. **Clone the repository**
```bash
git clone https://github.com/justthendra/discord-music-bot.git
cd discord-music-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env` with your bot token and client ID:
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GENIUS_API_KEY=your_genius_api_key_here  # Optional, for lyrics
```

4. **Deploy slash commands**
```bash
npm run deploy
```

5. **Start the bot**
```bash
npm start
```

### 🔗 Invite Link

Replace `YOUR_CLIENT_ID` with your bot's Client ID:

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=3165184&scope=bot%20applications.commands
```

### 🛠️ Troubleshooting

<details>
<summary><b>Bot doesn't join voice channel</b></summary>

1. Make sure the bot has `Connect` and `Speak` permissions
2. Verify you're in a voice channel
3. Check your `.env` token is correct
</details>

<details>
<summary><b>No audio output</b></summary>

1. Install FFmpeg: `winget install ffmpeg` (Windows) or `brew install ffmpeg` (macOS)
2. Install yt-dlp: `pip install yt-dlp`
3. Reinstall opus: `npm install @discordjs/opus`
</details>

<details>
<summary><b>Commands not showing</b></summary>

1. Run `npm run deploy`
2. Restart Discord (Ctrl+R)
3. Wait a few minutes for Discord to sync
</details>

---

## Türkçe

### ✨ Özellikler

| Özellik | Açıklama |
|---------|----------|
| 🎥 **YouTube** | Video, playlist ve arama desteği |
| 🎵 **Spotify** | Şarkı, albüm ve playlist desteği |
| ☁️ **SoundCloud** | Şarkı ve playlist desteği |
| 🌐 **Çift Dil** | Türkçe ve İngilizce desteği |
| 📝 **Şarkı Sözleri** | Genius'tan şarkı sözleri |
| 🔁 **Tekrar** | Şarkı ve kuyruk tekrar modları |
| 🔀 **Karıştır** | Kuyruğu rastgele sırala |

### 🎮 Komutlar

| Komut | Açıklama |
|-------|----------|
| `/play <şarkı>` | Müzik çal (URL veya arama) |
| `/skip` | Şarkıyı atla |
| `/pause` | Duraklat |
| `/resume` | Devam et |
| `/stop` | Durdur ve kuyruğu temizle |
| `/queue` | Kuyruğu göster |
| `/nowplaying` | Çalan şarkıyı göster |
| `/volume [seviye]` | Ses seviyesi (0-100) |
| `/shuffle` | Kuyruğu karıştır |
| `/loop [mod]` | Tekrar modu (kapalı/şarkı/kuyruk) |
| `/remove <sıra>` | Şarkıyı kuyruktan kaldır |
| `/clear` | Kuyruğu temizle |
| `/lyrics [şarkı]` | Şarkı sözlerini göster |
| `/language [dil]` | Bot dilini değiştir |
| `/disconnect` | Ses kanalından ayrıl |

### 📦 Kurulum

#### Gereksinimler

- [Node.js](https://nodejs.org/) v18.0.0 veya üzeri
- [FFmpeg](https://ffmpeg.org/download.html) sisteminizde kurulu
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) YouTube desteği için
- Discord Bot Token

#### Kurulum Adımları

1. **Repoyu klonlayın**
```bash
git clone https://github.com/justthendra/discord-music-bot.git
cd discord-music-bot
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın**
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
DISCORD_TOKEN=bot_tokeniniz
CLIENT_ID=client_id_niz
GENIUS_API_KEY=genius_api_anahtariniz  # Opsiyonel, şarkı sözleri için
```

4. **Slash komutlarını kaydedin**
```bash
npm run deploy
```

5. **Botu başlatın**
```bash
npm start
```

### 🔗 Davet Linki

`YOUR_CLIENT_ID` yerine botunuzun Client ID'sini yazın:

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=3165184&scope=bot%20applications.commands
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!

---

<div align="center">
Made with ❤️ by <a href="https://github.com/justthendra">justthendra</a>
</div>
