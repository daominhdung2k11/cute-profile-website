import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Repeat, Volume2, VolumeX, ListMusic, X, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../context/LanguageContext';

const MusicPlayer = ({ initialPlaylist = [], onPlaylistUpdate }) => {
  const { language } = useLanguage();
  const [playlist, setPlaylist] = useState(initialPlaylist);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isLooping, setIsLooping] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [newSongUrl, setNewSongUrl] = useState('');
  const [newSongTitle, setNewSongTitle] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const translations = {
    en: {
      noTrack: "No track",
      trackOf: "Track",
      of: "of",
      playlist: "Playlist",
      songTitle: "Song Title",
      songUrl: "YouTube / YouTube Music / Spotify URL",
      addSong: "Add Song",
      supportedPlatforms: "Supported: YouTube, YouTube Music, Spotify"
    },
    vi: {
      noTrack: "Không có bài hát",
      trackOf: "Bài",
      of: "của",
      playlist: "Danh Sách Phát",
      songTitle: "Tên Bài Hát",
      songUrl: "YouTube / YouTube Music / Spotify URL",
      addSong: "Thêm Bài Hát",
      supportedPlatforms: "Hỗ trợ: YouTube, YouTube Music, Spotify"
    }
  };

  const t = translations[language];

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error('Play error:', e));
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isLooping, currentTrackIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error('Play error:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (playlist.length > 0) {
      setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else if (playlist.length > 0) {
      setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const extractYouTubeId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const addSongToPlaylist = () => {
    if (!newSongUrl.trim() || !newSongTitle.trim()) return;

    let songUrl = newSongUrl;
    let songType = 'file';

    // Check if it's YouTube/YouTube Music
    if (newSongUrl.includes('youtube.com') || newSongUrl.includes('youtu.be')) {
      const videoId = extractYouTubeId(newSongUrl);
      if (videoId) {
        // Note: Direct YouTube audio playback requires additional setup
        // For now, we'll store the URL and handle it differently
        songUrl = `https://www.youtube.com/watch?v=${videoId}`;
        songType = 'youtube';
      }
    } else if (newSongUrl.includes('spotify.com')) {
      songType = 'spotify';
    }

    const newSong = {
      id: Date.now(),
      title: newSongTitle,
      url: songUrl,
      type: songType
    };

    const updatedPlaylist = [...playlist, newSong];
    setPlaylist(updatedPlaylist);
    if (onPlaylistUpdate) {
      onPlaylistUpdate(updatedPlaylist);
    }

    setNewSongUrl('');
    setNewSongTitle('');
  };

  const removeSong = (id) => {
    const updatedPlaylist = playlist.filter(song => song.id !== id);
    setPlaylist(updatedPlaylist);
    if (currentTrackIndex >= updatedPlaylist.length) {
      setCurrentTrackIndex(Math.max(0, updatedPlaylist.length - 1));
    }
    if (onPlaylistUpdate) {
      onPlaylistUpdate(updatedPlaylist);
    }
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <>
      <audio ref={audioRef} />
      
      {/* Main Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl border-t-2 border-[var(--theme-primary)] z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          {/* Progress Bar */}
          <div className="mb-2 sm:mb-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 accent-[var(--theme-primary)] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Current Track Info */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-accent)] flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                🎵
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-[var(--theme-text)] truncate">
                  {currentTrack?.title || t.noTrack}
                </p>
                <p className="text-xs text-gray-500">
                  {t.trackOf} {currentTrackIndex + 1} {t.of} {playlist.length}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                onClick={handlePrevious}
                size="icon"
                variant="ghost"
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10 hover:bg-[var(--theme-light)]"
                disabled={playlist.length === 0}
              >
                <SkipBack className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              <Button
                onClick={togglePlay}
                size="icon"
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-accent)] hover:opacity-90 shadow-lg"
                disabled={playlist.length === 0}
              >
                {isPlaying ? <Pause className="h-5 w-5 sm:h-6 sm:w-6" /> : <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" />}
              </Button>

              <Button
                onClick={handleNext}
                size="icon"
                variant="ghost"
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10 hover:bg-[var(--theme-light)]"
                disabled={playlist.length === 0}
              >
                <SkipForward className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              <Button
                onClick={toggleLoop}
                size="icon"
                variant="ghost"
                className={`rounded-full w-8 h-8 sm:w-10 sm:h-10 ${isLooping ? 'text-[var(--theme-primary)] bg-[var(--theme-light)]' : ''}`}
              >
                <Repeat className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            {/* Volume & Playlist */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                onClick={toggleMute}
                size="icon"
                variant="ghost"
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
              >
                {isMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />}
              </Button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 sm:w-24 accent-[var(--theme-primary)] hidden sm:block"
              />

              <Button
                onClick={() => setShowPlaylist(!showPlaylist)}
                size="icon"
                variant="ghost"
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
              >
                <ListMusic className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Panel */}
      {showPlaylist && (
        <div className="fixed bottom-20 sm:bottom-24 left-2 right-2 sm:left-auto sm:right-4 sm:w-96 bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[var(--theme-primary)] z-50 overflow-hidden">
          <div className="p-3 sm:p-4 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] text-white flex items-center justify-between">
            <h3 className="font-bold text-base sm:text-lg">{t.playlist}</h3>
            <Button
              onClick={() => setShowPlaylist(false)}
              size="icon"
              variant="ghost"
              className="rounded-full w-7 h-7 sm:w-8 sm:h-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          <div className="p-3 sm:p-4 border-b">
            <div className="space-y-2">
              <Input
                placeholder={t.songTitle}
                value={newSongTitle}
                onChange={(e) => setNewSongTitle(e.target.value)}
                className="text-xs sm:text-sm"
              />
              <Input
                placeholder={t.songUrl}
                value={newSongUrl}
                onChange={(e) => setNewSongUrl(e.target.value)}
                className="text-xs sm:text-sm"
              />
              <Button
                onClick={addSongToPlaylist}
                className="w-full bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] gap-2 text-xs sm:text-sm"
                disabled={!newSongUrl.trim() || !newSongTitle.trim()}
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                {t.addSong}
              </Button>
            </div>
          </div>

          <ScrollArea className="h-48 sm:h-64">
            <div className="p-2">
              {playlist.map((track, index) => (
                <div
                  key={track.id}
                  className={`p-2 sm:p-3 rounded-lg mb-1 sm:mb-2 cursor-pointer group transition-all ${
                    index === currentTrackIndex
                      ? 'bg-gradient-to-r from-[var(--theme-primary)]/20 to-[var(--theme-accent)]/20 border-2 border-[var(--theme-primary)]'
                      : 'hover:bg-[var(--theme-light)]'
                  }`}
                  onClick={() => playTrack(index)}
                >
                  <div className="flex items-center justify-between gap-1 sm:gap-2">
                    <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                      <span className="text-xs font-bold text-[var(--theme-primary)] w-4 sm:w-6 flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium truncate">{track.title}</p>
                        <p className="text-xs text-gray-500">{track.type}</p>
                      </div>
                    </div>
                    {playlist.length > 2 && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSong(track.id);
                        }}
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 rounded-full w-6 h-6 sm:w-8 sm:h-8 hover:text-red-500"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;