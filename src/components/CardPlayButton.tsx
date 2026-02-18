import { usePlayerStore } from '@/store/playerStore'
import { getPlayListInfoById } from "@/services/ApiService";
import { Pause, Play } from "@/icons/PlayerIcons"


interface Props {
  id: string | number;
  size?: 'small' | 'large';
}

export function CardPlayButton({id, size = 'small'}: Props) {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic
  } = usePlayerStore(state => state)

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.albumId === Number(id)
  const isThisPlaylistInStore = currentMusic?.playlist?.albumId === Number(id)

  const handleClick = async () => {
    if (isThisPlaylistInStore) {
      setIsPlaying(!isPlaying);
      return
    }

    const data = await getPlayListInfoById(Number(id));
    const {songs, playlist} = data;
    setCurrentMusic({songs: songs, playlist: playlist, song: songs[0]});
    setIsPlaying(true);
  }

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'


  return (
    <button onClick={handleClick}
            className="card-play-button rounded-full text-black bg-green-500 p-3 hover:scale-105 transition hover:bg-green-400">
      {isPlayingPlaylist ? <Pause className={iconClassName}/> : <Play className={iconClassName}/>}
    </button>
  )
}