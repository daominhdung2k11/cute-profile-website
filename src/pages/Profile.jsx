import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { mockProfileData } from '../utils/mock';
import MusicPlayer from '../components/MusicPlayer';
import LanguageToggle from '../components/LanguageToggle';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(mockProfileData.playlist);

  const handlePlaylistUpdate = (updatedPlaylist) => {
    setPlaylist(updatedPlaylist);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--theme-light)] via-white to-[var(--theme-secondary)]/30 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b-2 border-[var(--theme-primary)]">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-accent)] flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg flex-shrink-0">
                {mockProfileData.name[language].charAt(0).toUpperCase()}
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-[var(--theme-text)] truncate">
                {mockProfileData.name[language]}
              </h1>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <LanguageToggle />
              <ThemeToggle />
              <Button
                onClick={() => navigate('/admin')}
                variant="outline"
                size="icon"
                className="rounded-full border-2 border-[var(--theme-primary)] hover:bg-[var(--theme-light)] w-8 h-8 sm:w-10 sm:h-10"
              >
                <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Profile Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-[var(--theme-primary)]/30 overflow-hidden">
            {/* Decorative Header */}
            <div className="h-24 sm:h-32 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] relative">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/30"></div>
                <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/20"></div>
                <div className="absolute bottom-2 left-1/3 sm:bottom-4 w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-white/25"></div>
              </div>
            </div>

            {/* Avatar & Info */}
            <div className="relative px-4 sm:px-8 pb-6 sm:pb-8">
              <div className="flex flex-col items-center -mt-16 sm:-mt-20">
                {/* Avatar */}
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-6 sm:border-8 border-white shadow-2xl overflow-hidden bg-white">
                    <img
                      src={mockProfileData.avatar}
                      alt={mockProfileData.name[language]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-accent)] rounded-full flex items-center justify-center shadow-lg border-3 sm:border-4 border-white">
                    <span className="text-xl sm:text-3xl">🎵</span>
                  </div>
                </div>

                {/* Name */}
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--theme-text)] mb-3 sm:mb-4 text-center">
                  {mockProfileData.name[language]}
                </h2>

                {/* Bio */}
                <div className="w-full max-w-2xl">
                  <div className="bg-gradient-to-r from-[var(--theme-light)] to-[var(--theme-secondary)]/50 rounded-xl sm:rounded-2xl p-4 sm:p-8 border-2 border-[var(--theme-primary)]/20">
                    <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-accent)] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg sm:text-xl">💝</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-2xl font-bold text-[var(--theme-text)] mb-2 sm:mb-3">
                          {language === 'en' ? 'About Me' : 'Về Tôi'}
                        </h3>
                        <div className="text-sm sm:text-lg text-[var(--theme-text)]/80 leading-relaxed italic whitespace-pre-line">
                          {mockProfileData.bio[language]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Music Section Info */}
                <div className="mt-6 sm:mt-8 text-center">
                  <div className="inline-flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] rounded-full text-white font-semibold shadow-lg text-sm sm:text-base">
                    <span className="text-lg sm:text-2xl">🎧</span>
                    <span className="hidden sm:inline">{language === 'en' ? 'My Music Collection' : 'Bộ Sưu Tập Nhạc'}</span>
                    <span className="sm:hidden">{language === 'en' ? 'Music' : 'Nhạc'}</span>
                    <span className="bg-white/30 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      {playlist.length} {language === 'en' ? 'tracks' : 'bài'}
                    </span>
                  </div>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 px-4">
                    {language === 'en' 
                      ? 'Use the music player below to listen and add more tracks!'
                      : 'Dùng trình phát nhạc bên dưới để nghe và thêm bài hát!'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-[var(--theme-primary)]/20 text-center">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎵</div>
              <h4 className="font-bold text-[var(--theme-text)] mb-1 sm:mb-2 text-sm sm:text-base">
                {language === 'en' ? 'Full Control' : 'Điều Khiển Đầy Đủ'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                {language === 'en' ? 'Play, pause, skip, and loop' : 'Phát, tạm dừng, chuyển, lặp lại'}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-[var(--theme-primary)]/20 text-center">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">➕</div>
              <h4 className="font-bold text-[var(--theme-text)] mb-1 sm:mb-2 text-sm sm:text-base">
                {language === 'en' ? 'Add Songs' : 'Thêm Bài Hát'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                {language === 'en' ? 'YouTube, YT Music, Spotify' : 'YouTube, YT Music, Spotify'}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-[var(--theme-primary)]/20 text-center sm:col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎨</div>
              <h4 className="font-bold text-[var(--theme-text)] mb-1 sm:mb-2 text-sm sm:text-base">
                {language === 'en' ? 'Cute Design' : 'Thiết Kế Dễ Thương'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                {language === 'en' ? 'Beautiful pastel colors' : 'Màu pastel tuyệt đẹp'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Music Player */}
      <MusicPlayer 
        initialPlaylist={playlist}
        onPlaylistUpdate={handlePlaylistUpdate}
      />
    </div>
  );
};

export default Profile;