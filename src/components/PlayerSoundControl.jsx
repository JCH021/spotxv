import {useEffect, useState, useRef} from "react";
import {Slider} from "@/components/Slider";

export const PlayerSoundControl = ({ audio, currentSong }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const isSeeking = useRef(false)
  const animationFrameRef = useRef(null) // ✅ NUEVO

  // ✅ Usar requestAnimationFrame para 60fps
  useEffect(() => {
    const updateTime = () => {
      if (audio.current && !isSeeking.current) {
        setCurrentTime(audio.current.currentTime || 0)
        setDuration(audio.current.duration || 0)
      }
      animationFrameRef.current = requestAnimationFrame(updateTime)
    }

    animationFrameRef.current = requestAnimationFrame(updateTime)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [audio])

  const formatTime = time => {
    if (time == null || isNaN(time)) return `0:00`

    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex gap-x-3 text-xs pt-2">
      <span className="opacity-50 w-12 text-right">{formatTime(currentTime)}</span>

      <Slider
        value={[currentTime]}
        max={duration || 0}
        min={0}
        className="w-[400px]"
        onValueChange={(value) => {
          const [newCurrentTime] = value
          isSeeking.current = true
          setCurrentTime(newCurrentTime)
        }}
        onValueCommit={(value) => {
          const [newCurrentTime] = value
          if (audio.current) {
            audio.current.currentTime = newCurrentTime
          }
          isSeeking.current = false
        }}
      />

      <span className="opacity-50 w-12">
        {duration ? formatTime(duration) : '0:00'}
      </span>
    </div>
  )
}