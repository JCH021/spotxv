import { create } from "zustand";
import { type Playlist, type Song} from "@/lib/data.ts";

export interface CurrentMusic {
  playlist: Playlist | null;
  song: Song | null;
  songs: Song[];
}

export interface PlayerStore {
  isPlaying: boolean;
  currentMusic: CurrentMusic;
  volume: number;
  currentTime: number;
  lastSongId: string | null; // ✅ NUEVO: guardar ID de última canción
  setVolume: (volume: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentMusic: (currentMusic: CurrentMusic) => void;
  setCurrentTime: (time: number) => void;
  setLastSongId: (id: string) => void; // ✅ NUEVO
}


export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 0.1,
  currentTime: 0,
  lastSongId: null, // ✅ NUEVO
  setVolume: (volume) => set({ volume }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMusic: (currentMusic) => {
    const songId = currentMusic.song && currentMusic.playlist 
      ? `${currentMusic.playlist.albumId}-${currentMusic.song.id}` 
      : null;
    
    set({
      currentMusic, 
      currentTime: 0, // Resetear si es canción nueva
      lastSongId: songId // Guardar ID
    });
  },
  setCurrentTime: (time) => set({ currentTime: time }),
  setLastSongId: (id) => set({ lastSongId: id }), // ✅ NUEVO
}));