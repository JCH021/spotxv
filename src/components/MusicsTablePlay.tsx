import { type Song } from "@/lib/data"
import { Play, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore, type CurrentMusic } from "@/store/playerStore.ts";
import { getPlayListInfoById } from "@/services/ApiService";

interface Props {
  song: Song
  isCurrentSong: boolean
}

const isNewSongOfAnotherPlaylist = (currentMusic: CurrentMusic, song: Song) => {
  return currentMusic.playlist?.albumId !== song.albumId
}


const setNewCurrentMusic = async (
  song: Song,
  setIsPlaying: (isPlaying: boolean) => void,
  setCurrentMusic: (currentMusic: CurrentMusic) => void): Promise<void> => {
  const data = await getPlayListInfoById(song.albumId)
  const {songs, playlist} = data
  setCurrentMusic({songs: songs, playlist: playlist, song: song})
  setIsPlaying(true)
}

export const MusicsTablePlay = ({song, isCurrentSong}: Props) => {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic
  } = usePlayerStore(state => state)

  const isCurrentSongRunning = (song: Song) => {
    return (currentMusic.song?.id == song.id)
      && (currentMusic.playlist?.albumId == song.albumId)
      && isPlaying
  }


  const handleClick = async (song: Song) => {
  if (isCurrentSongRunning(song)) {
    setIsPlaying(false)
    return
  }

  if (isNewSongOfAnotherPlaylist(currentMusic, song)) {
    await setNewCurrentMusic(song, setIsPlaying, setCurrentMusic)
    return
  }

  if (currentMusic.song?.id !== song.id) {
    setCurrentMusic({songs: currentMusic.songs, playlist: currentMusic.playlist, song: song})
  }
  setIsPlaying(true)
}


  const className = "hover:scale-125"
  return (
    <button className="text-white" onClick={() => handleClick(song)}>
      {isCurrentSongRunning(song) ? <Pause className={className}/> : <Play className={className}/>}
    </button>
  )
}
