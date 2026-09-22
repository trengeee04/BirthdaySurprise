# 💗 For Amrugaa — An Interactive Love Letter

A beautiful, interactive romantic website that takes Amrugaa on a journey through your feelings.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 How to Customize Everything

All content lives in **`src/data/`** — you never need to touch the components.

### 1. Change Names, Greetings & Messages

Edit **`src/data/siteConfig.js`**

```js
const siteConfig = {
  herName: "Amrugaa",      // ← Change her name
  myName: "Rudra",          // ← Change your name
  welcomeGreeting: "Hey Amrugaa... ❤️",
  // ... all text is here
};
```

### 2. Edit the Love Letter

Edit **`src/data/loveLetter.js`**

```js
const loveLetter = [
  {
    title: "Your Title ✨",
    text: "Your paragraph here..."
  },
  // Add as many sections as you want!
];
```

### 3. Edit or Add Questions

Edit **`src/data/questions.js`**

```js
const questions = [
  {
    question: "Your question? 🥺",
    yesText: "YES ❤️",
    noTexts: [
      "Nope 😌",
      "Try again!",
      // The NO button cycles through these
    ]
  },
  // Add/remove questions freely
];
```

### 4. Edit the Final Letter

Edit **`src/data/finalLetter.js`**

```js
const finalLetter = {
  greeting: "For Amrugaa,",
  intro: "Opening paragraph...",
  paragraphs: [
    "Paragraph 1...",
    "Paragraph 2...",
    // Add as many as you want
  ],
  ending: "Closing message ❤️",
  signature: "With all my heart,",
  signatureName: "Rudra(Bhondu Pest :3)❤️",
};
```

### 5. Add Photos

1. Drop your images into **`public/assets/images/`**
2. Edit **`src/data/memories.js`**:

```js
const memories = [
  {
    image: "/assets/images/photo1.jpg",
    caption: "That day... ❤️"
  },
  // Add more photos
];
```

### 6. Add a Video

1. Drop your video into **`public/assets/videos/`**
2. Edit **`src/data/siteConfig.js`**:

```js
videoSrc: "/assets/videos/your-video.mp4",
videoPoster: "/assets/videos/thumbnail.jpg",  // optional
```

### 7. Add Songs

1. Drop your MP3 files into **`public/assets/music/`**
2. Edit **`src/data/playlist.js`**:

```js
const playlist = [
  {
    title: "Song Name",
    artist: "Artist Name",
    src: "/assets/music/song1.mp3"
  },
  // Add more songs
];
```

### 8. Edit YES Button Responses

Edit **`src/data/yesResponses.js`**

```js
const yesResponses = [
  "HEHE, I KNEW IT ❤️",
  "See? That wasn't so hard! 💗",
  // These show between questions
];
```

---

## 📁 Project Structure

```
src/
├── data/           ← ✏️ EDIT THESE to customize content
│   ├── siteConfig.js
│   ├── questions.js
│   ├── loveLetter.js
│   ├── finalLetter.js
│   ├── playlist.js
│   ├── memories.js
│   └── yesResponses.js
│
├── components/     ← 🧩 React components (don't need to edit)
├── hooks/          ← 🪝 Custom hooks
├── styles/         ← 🎀 CSS files
└── App.jsx         ← 🎬 Main app orchestrator

public/
└── assets/
    ├── images/     ← 📸 Drop photos here
    ├── videos/     ← 🎬 Drop video here
    └── music/      ← 🎵 Drop songs here
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

### Netlify

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

Or connect your GitHub repo at [netlify.com](https://netlify.com).

### GitHub Pages

```bash
npm run build
# Deploy the 'dist' folder
```

---

## 💝 Made with love for Amrugaa
# BirthdaySurprise
