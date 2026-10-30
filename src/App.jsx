import { MusicPlayer } from "./components/MusicPlayer";
import { AllSongs } from "./components/AllSongs";
import { Playlists } from "./components/Playlists";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { MusicContextProvider } from "./contexts/MusicContext";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <MusicContextProvider>
        <div className="app">
          <Navbar />
          <main className="app-main">
            <div className="music-player">
              <MusicPlayer />
            </div>
            <div className="content-section">
              <Routes>
                <Route path="/" element={<AllSongs />} />
                <Route path="/playlists" element={<Playlists />} />
              </Routes>
            </div>
          </main>
        </div>
      </MusicContextProvider>
    </Router>
  );
};

export default App;
