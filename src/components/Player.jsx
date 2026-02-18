import { PlayerControlButtonBar } from "@/components/PlayerControlButtonBar";
import { PlayerCurrentSong } from "@/components/PlayerCurrentSong"
import { PlayerSoundControl } from "@/components/PlayerSoundControl"
import { PlayerVolumeControl } from "@/components/PlayerVolumeControl"
import { useCurrentMusic } from "@/hooks/UseCurrentMusic";
import { useEffect, useRef, memo } from "react"
import { usePlayerStore } from "@/store/playerStore"
import { getGlobalAudio } from "@/lib/audioManager"


export const Player = memo(function Player() {
  const {currentMusic, isPlaying, volume, setCurrentMusic, setCurrentTime} = usePlayerStore(state => state);
  const audioRef = useRef();
  const {getNextSong} = useCurrentMusic(currentMusic)
  
  const currentSongIdRef = useRef(null); // ✅ Mantener la ref
  const shouldAutoPlayRef = useRef(false);
  const loadTimeoutRef = useRef(null);

  // Inicializar con audio global Y sincronizar ref con store
  useEffect(() => {
    audioRef.current = getGlobalAudio();
    
    //  Sincronizar currentSongIdRef con lastSongId del store al montar
    const { lastSongId } = usePlayerStore.getState();
    currentSongIdRef.current = lastSongId;
    
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume])

  
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [setCurrentTime])

  
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleEnded = () => {
      const nextSong = getNextSong();
      if (nextSong) {
        setCurrentMusic({...currentMusic, song: nextSong});
      }
    };

    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [currentMusic, getNextSong, setCurrentMusic])

  // Cambio de canción
  useEffect(() => {
    const {song, playlist} = currentMusic;
    
    if (!song || !playlist || !audioRef.current) {
      return;
    }

    const songId = `${playlist.albumId}-${song.id}`;

    
    if (currentSongIdRef.current === songId) {
      return;
    }

    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }

    loadTimeoutRef.current = setTimeout(() => {
      const audioElement = audioRef.current;
      if (!audioElement) return;

      currentSongIdRef.current = songId;

      const audioSrc = `/music/${playlist.albumId}/0${song.id}.mp3`;
      
      // Limpiar completamente
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.oncanplay = null;
      audioElement.onloadeddata = null;
      audioElement.onerror = null;
      audioElement.src = '';
      audioElement.load();
      
      // Cargar nueva canción
      audioElement.src = audioSrc;
      audioElement.load();

      shouldAutoPlayRef.current = isPlaying;

      audioElement.oncanplay = () => {
        audioElement.oncanplay = null;
        
        const { lastSongId, currentTime: storedTime } = usePlayerStore.getState();
        
        if (lastSongId === songId && storedTime > 0) {
          audioElement.currentTime = storedTime;
        }
        
        if (shouldAutoPlayRef.current && audioRef.current) {
          audioElement.play().catch(e => console.log('Error:', e));
        }
      };

      loadTimeoutRef.current = null;
    }, 100);

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
    };
    
  }, [currentMusic.song?.id, currentMusic.playlist?.albumId])

  // Play/Pause
  useEffect(() => {
    if (!audioRef.current || !currentMusic.song) {
      return;
    }

    const audioElement = audioRef.current;

    if (!audioElement.src || audioElement.src === window.location.href) {
      return;
    }

    shouldAutoPlayRef.current = isPlaying;

    if (audioElement.readyState >= 3) {
      if (isPlaying) {
        audioElement.play().catch(e => console.log('Error:', e));
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying])

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[200px]">
        <PlayerCurrentSong {...currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <PlayerControlButtonBar/>
          <PlayerSoundControl audio={audioRef} currentSong={currentMusic.song} />
        </div>
      </div>

      <div className="grid place-content-center">
        <PlayerVolumeControl/>
      </div>
    </div>
  )
})