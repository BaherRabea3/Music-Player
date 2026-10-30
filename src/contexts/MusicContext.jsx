import { createContext, useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

const songs = [
  {
    id: 1,
    title: "3ayez Salamtak",
    artist: "Ahmed Saad",
    duration: "00:03:43",
    url: "public\\Songs\\Ahmed Saad - 3ayez Salamtak _ Official Visualizer - 2025 _ احمد سعد - عايز سلامتك.mp3",
  },
  {
    id: 2,
    title: "SABAH EL WARD",
    artist: "Saint Levant",
    duration: "00:04:04",
    url: "public\\Songs\\Saint Levant - SABAH EL WARD _ صباح الورد (Official Video).mp3",
  },
  {
    id: 3,
    title: "Men Gheir Kalam",
    artist: "TUL8TE",
    duration: "00:03:34",
    url: "public\\Songs\\TUL8TE - Men Gheir Kalam I تووليت - من غير كلام (1).mp3",
  },
  {
    id: 5,
    title: "Hases Bik",
    artist: "Zaid Khaled, Nasser",
    duration: "00:04:06",
    url: "public\\Songs\\Zaid Khaled, Nasser - Hasess Bik _ زيد خالد، ناصر - حاسس بيك.mp3",
  },
  {
    id: 6,
    title: "Mesh Benkhtar Had",
    artist: "Basiony, Zaid Khaled, Ahmed Diaa",
    duration: "00:04:10",
    url: "public\\Songs\\خدي هنا ــ بسيوني (أبو فريد ) x زيد خالد x أحمد ضياء Khody Hena – Basyoni x Zaid Khaled x Ahmed Diaa.mp3",
  },
  {
    id: 7,
    title: "Talab Be Re7alak (El Oyoon El Helwa)",
    artist: "Mohamed El Sherif",
    duration: "00:02:41",
    url: "public\\Songs\\طب ب بحبك ( العيون الحلوه دي - مش لاقي حاجه ف الوجود ) - حمو المرشدي - ريد بول صالونات [BiUGXFnDnXc].mp3",
  },
  {
    id: 8,
    title: "3ein Ser7eya",
    artist: "Lege-Cy",
    duration: "00:03:30",
    url: "public\\Songs\\ليجي-سي - أغنية عين سحرية رمضان ٢٠٢٦ (الاغنية الدعائية لمسلسل عين سحرية) _ Lege-Cy - 3ein Se7reya.mp3",
  },
];

const MusicContext = createContext();

export const MusicContextProvider = ({ children }) => {
  const [allSongs, setAllSongs] = useState(songs);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [songIndex, setSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const savedPlaylists = localStorage.getItem("musicPlayerPlaylists");
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    }
  }, []);

  useEffect(() => {
    if (playlists.length > 0) {
      localStorage.setItem("musicPlayerPlaylists", JSON.stringify(playlists));
    }
  }, [playlists]);

  const handlePlaySong = (song, index) => {
    setCurrentSong(song);
    setSongIndex(index);
    setIsPlaying(false);
  };
  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const nextSong = () => {
    setSongIndex((prev) => {
      const nextIndex = (prev + 1) % allSongs.length;
      setCurrentSong(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const prevSong = () => {
    setSongIndex((prev) => {
      const prevIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
      setCurrentSong(allSongs[prevIndex]);
      return prevIndex;
    });
    setIsPlaying(false);
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  const createPlaylist = (playlistName) => {
    const newPlaylist = {
      id: Date.now(),
      name: playlistName,
      songs: [],
    };
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
  };

  const addSongToPlaylist = (song, playlistId) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...playlist, songs: [...playlist.songs, song] };
        }
        return playlist;
      }),
    );
  };

  const deletePlaylist = (id) => {
    setPlaylists((prev) => prev.filter((playlist) => playlist.id !== id));
  };

  return (
    <MusicContext.Provider
      value={{
        allSongs,
        currentSong,
        songIndex,
        handlePlaySong,
        currentTime,
        setCurrentTime,
        formatTime,
        duration,
        setDuration,
        nextSong,
        prevSong,
        isPlaying,
        play,
        pause,
        volume,
        setVolume,
        createPlaylist,
        addSongToPlaylist,
        playlists,
        deletePlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const contextValue = useContext(MusicContext);
  if (!contextValue) {
    throw new Error("useMusic must be used within a MusicContextProvider");
  }
  return contextValue;
};
