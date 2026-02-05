// Turkish translations
module.exports = {
    // General
    common: {
        error: 'Bir hata oluştu!',
        noPermission: 'Bu komutu kullanma yetkiniz yok!',
        notInVoice: 'Önce bir ses kanalına katılmalısınız!',
        notPlaying: 'Şu an bir şarkı çalmıyor!',
        queueEmpty: 'Kuyruk boş!',
        unknownArtist: 'Bilinmiyor',
        page: 'Sayfa',
    },

    // Play command
    play: {
        description: 'Müzik çal',
        optionDescription: 'Şarkı adı veya URL (YouTube, Spotify, SoundCloud)',
        addedToQueue: 'Kuyruğa eklendi!',
        playlistAdded: '{count} şarkı kuyruğa eklendi!',
        playlistName: 'Playlist: {name}',
        notFound: 'Şarkı bulunamadı!',
        source: 'Kaynak',
    },

    // Skip command
    skip: {
        description: 'Şarkıyı atla',
        skipped: 'Şarkı atlandı!',
        noNext: 'Sırada başka şarkı yok!',
    },

    // Pause command
    pause: {
        description: 'Şarkıyı duraklat',
        paused: 'Şarkı duraklatıldı!',
        alreadyPaused: 'Şarkı zaten duraklatılmış!',
    },

    // Resume command
    resume: {
        description: 'Şarkıyı devam ettir',
        resumed: 'Şarkı devam ediyor!',
        notPaused: 'Şarkı duraklatılmamış!',
    },

    // Stop command
    stop: {
        description: 'Müziği durdur ve kuyruğu temizle',
        stopped: 'Müzik durduruldu ve kuyruk temizlendi!',
    },

    // Queue command
    queue: {
        description: 'Müzik kuyruğunu göster',
        title: 'Müzik Kuyruğu',
        nowPlaying: 'Şu An Çalıyor',
        upNext: 'Sıradaki Şarkılar',
        moreItems: '... ve {count} şarkı daha',
        totalDuration: 'Toplam Süre',
        tracks: 'şarkı',
        loop: 'Tekrar',
        loopQueue: 'Kuyruk Tekrarı',
    },

    // Now Playing command
    nowplaying: {
        description: 'Şu an çalan şarkıyı göster',
        title: 'Şu An Çalıyor',
        artist: 'Sanatçı',
        duration: 'Süre',
        source: 'Kaynak',
        requestedBy: 'İsteyen',
        progress: 'İlerleme',
    },

    // Volume command
    volume: {
        description: 'Ses seviyesini ayarla',
        optionDescription: 'Ses seviyesi (0-100)',
        current: 'Şu anki ses seviyesi: {volume}%',
        changed: 'Ses seviyesi {volume}% olarak ayarlandı!',
        invalid: 'Geçersiz ses seviyesi! 0-100 arası bir değer girin.',
    },

    // Shuffle command
    shuffle: {
        description: 'Kuyruğu karıştır',
        shuffled: 'Kuyruk karıştırıldı!',
    },

    // Disconnect command
    disconnect: {
        description: 'Ses kanalından ayrıl',
        disconnected: 'Ses kanalından ayrıldı!',
        notConnected: 'Bot bir ses kanalında değil!',
    },

    // Loop command
    loop: {
        description: 'Tekrar modunu ayarla',
        optionDescription: 'Tekrar modu',
        modes: {
            off: 'Kapalı',
            track: 'Şarkı',
            queue: 'Kuyruk',
        },
        modeChanged: 'Tekrar modu: {mode}',
        current: 'Şu anki tekrar modu: {mode}',
    },

    // Seek command
    seek: {
        description: 'Şarkıda belirli bir zamana git',
        optionDescription: 'Zaman (saniye)',
        seeked: '{time} saniyeye ileri sarıldı!',
        invalid: 'Geçersiz zaman! Şarkı süresi: {duration} saniye',
    },

    // Remove command
    remove: {
        description: 'Kuyruktan şarkı kaldır',
        optionDescription: 'Şarkı numarası',
        removed: '"{title}" kuyruktan kaldırıldı!',
        invalid: 'Geçersiz şarkı numarası! Kuyrukta {count} şarkı var.',
    },

    // Clear command
    clear: {
        description: 'Kuyruğu temizle',
        cleared: 'Kuyruk temizlendi! {count} şarkı kaldırıldı.',
    },

    // Lyrics command
    lyrics: {
        description: 'Şarkı sözlerini göster',
        optionDescription: 'Şarkı adı (boş bırakırsanız çalan şarkı)',
        title: 'Şarkı Sözleri',
        notFound: 'Şarkı sözleri bulunamadı!',
        searching: 'Şarkı sözleri aranıyor...',
        tooLong: 'Şarkı sözleri çok uzun, sadece bir kısmı gösteriliyor...',
        poweredBy: 'Genius tarafından sağlanmaktadır',
    },

    // Help command
    help: {
        title: 'Komutlar',
        description: 'Mevcut tüm komutlar aşağıdadır:',
        category: {
            music: 'Müzik Komutları',
            system: 'Sistem Komutları',
        },
    },

    // Events
    events: {
        trackStart: 'Şimdi çalıyor',
        trackEnd: 'Bitti',
        queueEnd: 'Kuyruk sona erdi',
        error: 'Hata',
    },
};
