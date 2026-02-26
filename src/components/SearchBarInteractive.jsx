import React, { useState } from "react";
import { usePlayerStore } from "@/store/playerStore";
import { getPlayListInfoById } from "@/services/ApiService";
import Lupe from "@/icons/Lupe";
import Explore from "@/icons/Explore";
import { playlists, songs } from "@/lib/data";

export default function SearchBarInteractive() {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { setCurrentMusic, setIsPlaying } = usePlayerStore(state => state);

  const filteredPlaylists = playlists
    .filter((p) => p.title.toLowerCase().includes(searchValue.toLowerCase()))
    .slice(0, 3);

  const filteredSongs = songs
    .filter((s) => s.title.toLowerCase().includes(searchValue.toLowerCase()))
    .slice(0, 5);

  const filteredArtists = playlists
    .filter((p) => p.artists.some(a => a.toLowerCase().includes(searchValue.toLowerCase())))
    .slice(0, 3);

  const handleSelectSong = async (song) => {
  const data = await getPlayListInfoById(song.albumId);
  const { songs: playlistSongs, playlist } = data;
  setCurrentMusic({ songs: playlistSongs, playlist, song });
  setIsPlaying(true);
  setSearchValue("");
  setIsFocused(false);
  window.location.href = `/playlist/${playlist.id}`;
};

  return (
    <div className="relative flex-grow">
      {/* Barra de búsqueda */}
      <div className="flex items-center gap-2 bg-zinc-800 text-zinc-400 rounded-full px-3 py-2 md:px-6 md:py-3 hover:text-zinc-100 transition-colors">
        <Lupe className="text-zinc-400" />
        <input
          type="text"
          
          placeholder="Was möchtest du wiedergeben?"
          className="bg-transparent focus:outline-none text-base w-full placeholder-zinc-500 text-zinc-400"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        <Explore className="text-zinc-400" />
      </div>

      {/* Resultados */}
      {isFocused && searchValue.trim() !== "" && (
        <div className="absolute left-0 right-0 mt-2 bg-zinc-800 rounded-2xl overflow-hidden z-50 shadow-2xl max-h-72 md:max-h-96 overflow-y-auto">
          {/* Playlists */}
          {filteredPlaylists.length > 0 && (
            <div>
              <div className="px-6 py-3 bg-zinc-900 border-b border-zinc-700">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  Playlists
                </h3>
              </div>
              {filteredPlaylists.map((p) => (
                <a
                  key={p.id}
                  href={`/playlist/${p.id}`}
                  className="block px-6 py-3 hover:bg-zinc-700 cursor-pointer transition-colors border-b border-zinc-700"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.cover} alt={p.title} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <p className="text-white font-medium">{p.title}</p>
                      <p className="text-zinc-400 text-sm">{p.artists.join(", ")}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
          {filteredArtists.length > 0 && (
              <div>
                <div className="px-6 py-3 bg-zinc-900 border-b border-zinc-700">
                  <h3 className="text-white font-semibold text-sm">Artists</h3>
                </div>
                {filteredArtists.map((p) => (
                  <a
                    key={p.id}
                    href={`/playlist/${p.id}`}
                    className="block px-6 py-3 hover:bg-zinc-700 cursor-pointer transition-colors border-b border-zinc-700"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.cover} alt={p.title} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="text-white font-medium">{p.artists.join(", ")}</p>
                        <p className="text-zinc-400 text-sm">Artist</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
)}

          {/* Canciones */}
          {filteredSongs.length > 0 && (
            <div>
              <div className="px-6 py-3 bg-zinc-900 border-b border-zinc-700">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">Songs</h3>
              </div>
              {filteredSongs.map((s) => (
                <div
                  key={s.id}
                  className="px-6 py-3 hover:bg-zinc-700 cursor-pointer transition-colors border-b border-zinc-700 last:border-b-0"
                  onClick={() => handleSelectSong(s)}
                >
                  <div className="flex items-center gap-3">
                    <img src={s.image} alt={s.title} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <p className="text-white font-medium">{s.title}</p>
                      <p className="text-zinc-400 text-sm">{s.artists.join(", ")} • {s.album}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          

          {/* Sin resultados */}
          {filteredPlaylists.length === 0 && filteredSongs.length === 0 && (
            <div className="p-6">
              <p className="text-zinc-400 text-center">Keine Ergebnisse für "{searchValue}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

