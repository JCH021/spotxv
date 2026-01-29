export const PlayerCurrentSong = ({image, title, artists}) => {
  return (
    <div className="flex items-center gap-3 w-full overflow-hidden">
      {image && (
        <picture className="w-14 h-14 flex-shrink-0 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </picture>
      )}
      
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <h3 className="font-semibold text-sm truncate">
          {title}
        </h3>
        <span className="text-xs opacity-80 truncate">
          {artists?.join(', ')}
        </span>
      </div>
    </div>
  )
}