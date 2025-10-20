# 🌸 jummiki2k11 Profile Website

Trang web profile cá nhân cute với music player đầy đủ tính năng!

## ✨ Tính Năng

- 🎵 **Music Player**: Play/pause, next/prev, loop, volume control, progress bar
- 📝 **Profile Info**: Avatar, name, bio (2 ngôn ngữ)
- ➕ **Add Songs**: Thêm nhạc từ YouTube, YouTube Music, Spotify
- 🌐 **Đa ngôn ngữ**: Chuyển đổi Tiếng Anh ↔ Tiếng Việt
- 🎨 **Themes**: Chọn màu Pink hoặc Lavender
- ⚙️ **Admin Dashboard**: Chỉnh sửa thông tin và playlist

## 🚀 Cài Đặt

### Yêu Cầu
- Node.js (v16 trở lên)
- Yarn (hoặc npm)

### Bước 1: Cài Dependencies
```bash
yarn install
# hoặc
npm install
```

### Bước 2: Chạy Development Server
```bash
yarn start
# hoặc
npm start
```

Website sẽ chạy tại: `http://localhost:3000`

### Bước 3: Build Production
```bash
yarn build
# hoặc
npm run build
```

## 📁 Cấu Trúc Thư Mục

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── MusicPlayer.jsx # Music player với playlist
│   ├── ImageGallery.jsx
│   ├── VideoGallery.jsx
│   ├── LanguageToggle.jsx
│   └── ThemeToggle.jsx
├── pages/              # Pages
│   ├── Profile.jsx     # Trang profile chính
│   └── Admin.jsx       # Trang admin dashboard
├── context/            # React Context
│   ├── LanguageContext.jsx
│   └── ThemeContext.jsx
├── utils/              # Utilities
│   └── mock.js         # Mock data (chỉnh sửa ở đây!)
└── App.js              # Main app
```

## 🎨 Tùy Chỉnh

### Thay Đổi Thông Tin Cá Nhân
Mở file `src/utils/mock.js` và chỉnh sửa:

```javascript
export const mockProfileData = {
  name: {
    en: "jummiki2k11",
    vi: "jummiki2k11"
  },
  bio: {
    en: "Your bio here",
    vi: "Giới thiệu của bạn"
  },
  avatar: "URL_ảnh_của_bạn",
  playlist: [
    {
      id: 1,
      title: "Tên bài hát",
      url: "URL_file_mp3_hoặc_youtube",
      type: "file" // hoặc "youtube", "spotify"
    }
  ]
}
```

### Thay Đổi Màu Theme
Trong file `src/utils/mock.js`, tìm `themeColors`:

```javascript
export const themeColors = {
  pink: {
    primary: "#FFB6C1",    // Màu chính
    secondary: "#FFD1DC",  // Màu phụ
    accent: "#FFC0CB",     // Màu nhấn
    light: "#FFF0F5",      // Màu nền
    text: "#4A4A4A"        // Màu chữ
  },
  // Thêm theme mới của bạn ở đây!
}
```

## 🎵 Thêm Nhạc

### Cách 1: Trong Website
1. Mở music player (góc dưới)
2. Click icon Playlist
3. Nhập tên bài hát và URL (YouTube/YouTube Music/Spotify)
4. Click "Thêm Bài Hát"

### Cách 2: Sửa Code
Mở `src/utils/mock.js` và thêm vào `playlist`:

```javascript
{
  id: 3,
  title: "Tên bài hát mới",
  url: "https://youtube.com/watch?v=...",
  type: "youtube"
}
```

## 📦 Dependencies Chính

- **React 19** - UI framework
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI components
- **Lucide React** - Icons

## 🛠️ Troubleshooting

### Lỗi khi cài dependencies
```bash
# Xóa node_modules và yarn.lock
rm -rf node_modules yarn.lock
# Cài lại
yarn install
```

### Lỗi khi chạy
```bash
# Clear cache
yarn cache clean
# Restart
yarn start
```

### Nhạc không phát được
- Đảm bảo URL file MP3 có CORS được enable
- YouTube embed cần URL dạng: `https://www.youtube.com/embed/VIDEO_ID`
- Spotify embed cần URL dạng: `https://open.spotify.com/embed/track/TRACK_ID`

## 🌐 Deploy

### Deploy lên Netlify/Vercel
```bash
# Build
yarn build

# Upload thư mục "build" lên Netlify/Vercel
```

### Deploy lên GitHub Pages
```bash
# Thêm vào package.json
"homepage": "https://username.github.io/repo-name"

# Build và deploy
yarn build
# Push thư mục build lên branch gh-pages
```

## 💖 Made with Love

Trang web này được tạo bởi Emergent AI Agent

---

**Lưu ý:** Đây là phiên bản frontend-only với mock data. Dữ liệu sẽ mất khi refresh trang. Nếu muốn lưu dữ liệu thật, cần thêm backend + database.

Enjoy! 🎵✨
