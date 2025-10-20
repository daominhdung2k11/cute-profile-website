import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { mockProfileData } from '../utils/mock';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from '../hooks/use-toast';

const Admin = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [profile, setProfile] = useState(mockProfileData);
  const [newSongUrl, setNewSongUrl] = useState('');
  const [newSongTitle, setNewSongTitle] = useState('');

  const translations = {
    en: {
      title: "Admin Dashboard",
      backToProfile: "Back to Profile",
      saveChanges: "Save Changes",
      profileInfo: "Profile Information",
      nameEn: "Name (English)",
      nameVi: "Name (Vietnamese)",
      bioEn: "Bio (English)",
      bioVi: "Bio (Vietnamese)",
      avatarUrl: "Avatar URL",
      playlist: "Music Playlist",
      addSong: "Add New Song",
      songTitle: "Song Title",
      songUrl: "Song URL (YouTube/YT Music/Spotify)",
      saved: "Changes saved successfully!",
      songAdded: "Song added successfully!",
      currentPlaylist: "Current Playlist",
      supportedPlatforms: "Supported: YouTube, YouTube Music, Spotify"
    },
    vi: {
      title: "Trang Quản Trị",
      backToProfile: "Quay Lại Trang Cá Nhân",
      saveChanges: "Lưu Thay Đổi",
      profileInfo: "Thông Tin Cá Nhân",
      nameEn: "Tên (Tiếng Anh)",
      nameVi: "Tên (Tiếng Việt)",
      bioEn: "Giới Thiệu (Tiếng Anh)",
      bioVi: "Giới Thiệu (Tiếng Việt)",
      avatarUrl: "Link Ảnh Đại Diện",
      playlist: "Danh Sách Nhạc",
      addSong: "Thêm Bài Hát Mới",
      songTitle: "Tên Bài Hát",
      songUrl: "Link Bài Hát (YouTube/YT Music/Spotify)",
      saved: "Đã lưu thành công!",
      songAdded: "Đã thêm bài hát thành công!",
      currentPlaylist: "Danh Sách Hiện Tại",
      supportedPlatforms: "Hỗ trợ: YouTube, YouTube Music, Spotify"
    }
  };

  const t = translations[language];

  const handleSave = () => {
    console.log('Saving profile:', profile);
    toast({
      title: t.saved,
      description: "Your changes have been saved.",
    });
  };

  const handleAddSong = () => {
    if (newSongUrl && newSongTitle) {
      let songType = 'file';
      if (newSongUrl.includes('youtube.com') || newSongUrl.includes('youtu.be')) {
        songType = 'youtube';
      } else if (newSongUrl.includes('spotify.com')) {
        songType = 'spotify';
      }

      const newSong = {
        id: Date.now(),
        title: newSongTitle,
        url: newSongUrl,
        type: songType
      };

      setProfile({
        ...profile,
        playlist: [...profile.playlist, newSong]
      });
      
      setNewSongUrl('');
      setNewSongTitle('');
      
      toast({
        title: t.songAdded,
      });
    }
  };

  const handleDeleteSong = (id) => {
    setProfile({
      ...profile,
      playlist: profile.playlist.filter(song => song.id !== id)
    });
  };

  return (
    <div className="min-h-screen bg-[var(--theme-light)]">
      <header className="bg-white shadow-sm border-b-2 border-[var(--theme-primary)]">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--theme-text)]">{t.title}</h1>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="gap-2 rounded-full border-2 border-[var(--theme-primary)] text-xs sm:text-sm"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{t.backToProfile}</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <Button
                onClick={handleSave}
                className="gap-2 rounded-full bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] hover:opacity-90 text-xs sm:text-sm"
              >
                <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{t.saveChanges}</span>
                <span className="sm:hidden">Save</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
            <TabsTrigger value="profile" className="text-xs sm:text-sm">{t.profileInfo}</TabsTrigger>
            <TabsTrigger value="playlist" className="text-xs sm:text-sm">{t.playlist}</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>{t.profileInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="nameEn" className="text-sm">{t.nameEn}</Label>
                    <Input
                      id="nameEn"
                      value={profile.name.en}
                      onChange={(e) => setProfile({
                        ...profile,
                        name: { ...profile.name, en: e.target.value }
                      })}
                      className="mt-1 sm:mt-2 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nameVi" className="text-sm">{t.nameVi}</Label>
                    <Input
                      id="nameVi"
                      value={profile.name.vi}
                      onChange={(e) => setProfile({
                        ...profile,
                        name: { ...profile.name, vi: e.target.value }
                      })}
                      className="mt-1 sm:mt-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bioEn" className="text-sm">{t.bioEn}</Label>
                  <Textarea
                    id="bioEn"
                    value={profile.bio.en}
                    onChange={(e) => setProfile({
                      ...profile,
                      bio: { ...profile.bio, en: e.target.value }
                    })}
                    rows={3}
                    className="mt-1 sm:mt-2 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="bioVi" className="text-sm">{t.bioVi}</Label>
                  <Textarea
                    id="bioVi"
                    value={profile.bio.vi}
                    onChange={(e) => setProfile({
                      ...profile,
                      bio: { ...profile.bio, vi: e.target.value }
                    })}
                    rows={3}
                    className="mt-1 sm:mt-2 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="avatar" className="text-sm">{t.avatarUrl}</Label>
                  <Input
                    id="avatar"
                    value={profile.avatar}
                    onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                    className="mt-1 sm:mt-2 text-sm"
                  />
                  {profile.avatar && (
                    <div className="mt-3 sm:mt-4">
                      <img 
                        src={profile.avatar} 
                        alt="Avatar preview" 
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 sm:border-4 border-[var(--theme-primary)]"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playlist">
            <Card>
              <CardHeader>
                <CardTitle>{t.addSong}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div>
                    <Label htmlFor="newSongTitle" className="text-sm">{t.songTitle}</Label>
                    <Input
                      id="newSongTitle"
                      value={newSongTitle}
                      onChange={(e) => setNewSongTitle(e.target.value)}
                      placeholder={t.songTitle}
                      className="mt-1 sm:mt-2 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newSongUrl" className="text-sm">{t.songUrl}</Label>
                    <Input
                      id="newSongUrl"
                      value={newSongUrl}
                      onChange={(e) => setNewSongUrl(e.target.value)}
                      placeholder="https://youtube.com/... or https://spotify.com/..."
                      className="mt-1 sm:mt-2 text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                      {t.supportedPlatforms}
                    </p>
                  </div>
                  <Button
                    onClick={handleAddSong}
                    className="w-full gap-2 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] text-sm"
                    disabled={!newSongUrl || !newSongTitle}
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    {t.addSong}
                  </Button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-semibold text-base sm:text-lg">{t.currentPlaylist} ({profile.playlist.length})</h4>
                  <div className="space-y-2">
                    {profile.playlist.map((song, index) => (
                      <div
                        key={song.id}
                        className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-[var(--theme-light)] border-2 border-[var(--theme-primary)]/20 hover:border-[var(--theme-primary)] transition-all"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <span className="text-xs sm:text-sm font-bold text-[var(--theme-primary)] w-6 sm:w-8 flex-shrink-0">
                            #{index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm sm:text-base font-semibold truncate">{song.title}</p>
                            <p className="text-xs text-gray-500 truncate">{song.type} • {song.url}</p>
                          </div>
                        </div>
                        {profile.playlist.length > 2 && (
                          <Button
                            onClick={() => handleDeleteSong(song.id)}
                            size="icon"
                            variant="destructive"
                            className="rounded-full ml-2 w-8 h-8 sm:w-10 sm:h-10"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;