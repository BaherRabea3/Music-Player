# Music Player

A browser-based music player built with React and Vite. Browse the included song collection, control playback, and create playlists that are saved in your browser.

## Features

- Browse and play the bundled song collection
- Play, pause, skip to the next or previous track, and select a track from the library
- Seek through a track and adjust the volume
- Create and delete playlists
- Search for songs to add to a playlist
- Keep playlists in browser storage with `localStorage`
- Responsive layout for desktop and smaller screens

## Built with

- [React](https://react.dev/) 19
- [React Router](https://reactrouter.com/) 8
- [Vite](https://vite.dev/)
- HTML audio playback

## Getting started

### Prerequisites

- Node.js (a version supported by Vite)
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
public/
  Songs/                  Bundled MP3 files
src/
  components/
    AllSongs.jsx          Song library
    MusicPlayer.jsx       Playback controls
    Navbar.jsx            App navigation
    Playlists.jsx         Playlist management
  contexts/
    MusicContext.jsx      Shared playback and playlist state
  App.jsx                 Routes and app layout
  index.css               Application styles
  main.jsx                React entry point
```

## Song library

The bundled MP3 files are in `public/Songs/`, and the song metadata and audio URLs are defined in `src/contexts/MusicContext.jsx`. To add or replace a track, place its audio file in that folder and update the song list with its title, artist, duration, and URL. Vite serves files in `public/` from the site root, so reference a file as `/Songs/your-file.mp3`.

## Playlist storage

Playlists are stored in the browser's `localStorage` under the key `musicPlayerPlaylists`. They are local to the current browser and device; this project does not use a server account or cloud sync.

## License

No project license is currently specified. The included audio files may have separate rights and usage terms; confirm that you have permission to use or distribute them.
