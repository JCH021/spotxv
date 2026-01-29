import { globby } from 'globby';
import { parseFile } from 'music-metadata';
import { writeFile, readFile } from 'fs/promises';
import { basename } from 'path';

async function generateMusicData() {
  console.log('🎵 Leyendo archivos MP3...');
  
  // Leer configuración manual
  let config = { playlists: {}, songs: {} };
  try {
    const configFile = await readFile('scripts/music-config.json', 'utf-8');
    config = JSON.parse(configFile);
    console.log('📋 Configuración manual cargada');
  } catch (error) {
    console.log('⚠️  No se encontró music-config.json');
  }
  
  // ✅ NUEVO: Leer data.ts existente para preservar cambios manuales
  let existingSongs = [];
  let existingPlaylists = [];
  try {
    const dataContent = await readFile('src/lib/data.ts', 'utf-8');
    
    // Extraer canciones existentes
    const songsMatch = dataContent.match(/export const songs: Song\[\] = (\[[\s\S]*?\]);/);
    if (songsMatch) {
      existingSongs = JSON.parse(songsMatch[1]);
      console.log(`📚 Encontradas ${existingSongs.length} canciones existentes en data.ts`);
    }
    
    // Extraer playlists existentes
    const playlistsMatch = dataContent.match(/export const playlists: Playlist\[\] = (\[[\s\S]*?\]);/);
    if (playlistsMatch) {
      const playlistsStr = playlistsMatch[1].replace(/colors\.(\w+)/g, '"colors.$1"');
      existingPlaylists = JSON.parse(playlistsStr);
      console.log(`📚 Encontradas ${existingPlaylists.length} playlists existentes en data.ts`);
    }
  } catch (error) {
    console.log('📝 No se encontró data.ts existente, creando nuevo');
  }
  
  const files = await globby('public/music/**/*.mp3');
  console.log(`📁 Encontrados ${files.length} archivos MP3`);
  
  const songs = [];
  const playlistsMap = new Map();
  const newSongsConfig = {};
  
  for (const file of files) {
    try {
      const metadata = await parseFile(file);
      
      const pathParts = file.split('/');
      const albumId = parseInt(pathParts[2]);
      const filename = basename(file, '.mp3');
      const songId = parseInt(filename.replace(/^0+/, '')) || 1;
      
      const duration = formatDuration(metadata.format.duration || 0);
      
      // ✅ Buscar si la canción ya existe en data.ts
      const existingSong = existingSongs.find(s => s.albumId === albumId && s.id === songId);
      
      let song;
      if (existingSong) {
        // ✅ Usar datos existentes (preservar cambios manuales)
        song = existingSong;
        console.log(`♻️  ${song.title} - ${song.artists.join(', ')} (preservado)`);
      } else {
        // ✅ Nueva canción - usar config o metadatos
        const manualSongConfig = config.songs[albumId]?.[songId];
        const manualPlaylistConfig = config.playlists[albumId];
        
        song = {
          id: songId,
          albumId: albumId,
          title: manualSongConfig?.title || metadata.common.title || `Track ${songId}`,
          image: manualPlaylistConfig?.cover || `https://misc.scdn.co/liked-songs/liked-songs-640.jpg`,
          artists: manualSongConfig?.artists || metadata.common.artists || (metadata.common.artist ? [metadata.common.artist] : ['Unknown Artist']),
          album: manualSongConfig?.album || metadata.common.album || manualPlaylistConfig?.title || 'Unknown Album',
          duration: duration
        };
        
        console.log(`✨ ${song.title} - ${song.artists.join(', ')} (NUEVO)`);
        
        // ✅ Guardar para actualizar music-config.json
        if (!newSongsConfig[albumId]) newSongsConfig[albumId] = {};
        newSongsConfig[albumId][songId] = {
          title: song.title,
          artists: song.artists,
          album: song.album
        };
      }
      
      songs.push(song);
      
      // ✅ Buscar playlist existente
      const existingPlaylist = existingPlaylists.find(p => p.albumId === albumId);
      
      if (!playlistsMap.has(albumId)) {
        if (existingPlaylist) {
          playlistsMap.set(albumId, existingPlaylist);
        } else {
          const manualPlaylistConfig = config.playlists[albumId];
          playlistsMap.set(albumId, {
            id: String(albumId),
            albumId: albumId,
            title: manualPlaylistConfig?.title || metadata.common.album || `Playlist ${albumId}`,
            color: getRandomColor(),
            cover: manualPlaylistConfig?.cover || song.image,
            artists: manualPlaylistConfig?.artists || song.artists
          });
        }
      }
      
    } catch (error) {
      console.error(`❌ Error procesando ${file}:`, error.message);
    }
  }
  
  songs.sort((a, b) => {
    if (a.albumId !== b.albumId) return a.albumId - b.albumId;
    return a.id - b.id;
  });
  
  const playlists = Array.from(playlistsMap.values()).sort((a, b) => a.albumId - b.albumId);
  
  // ✅ Actualizar music-config.json con nuevas canciones detectadas
  if (Object.keys(newSongsConfig).length > 0) {
    console.log('\n📝 Actualizando music-config.json con nuevas canciones...');
    
    const updatedConfig = { ...config };
    if (!updatedConfig.songs) updatedConfig.songs = {};
    
    for (const [albumId, songs] of Object.entries(newSongsConfig)) {
      if (!updatedConfig.songs[albumId]) updatedConfig.songs[albumId] = {};
      updatedConfig.songs[albumId] = { ...updatedConfig.songs[albumId], ...songs };
    }
    
    await writeFile('scripts/music-config.json', JSON.stringify(updatedConfig, null, 2));
    console.log('✅ music-config.json actualizado');
  }
  
  const output = `import { colors } from "./colors";

export interface Playlist {
  id: string;
  albumId: number;
  title: string;
  color: (typeof colors)[keyof typeof colors];
  cover: string;
  artists: string[];
}

export const playlists: Playlist[] = ${JSON.stringify(playlists, null, 2).replace(/"(colors\.\w+)"/g, '$1')};

export const morePlaylists = playlists.map((item) => ({
  ...item,
  id: item.id + "_more",
}))

export const sidebarPlaylists = playlists.map((item) => ({
  ...item,
  id: item.id + "_side",
}))

export const allPlaylists = [
  ...playlists,
  ...morePlaylists,
  ...sidebarPlaylists,
]

export interface Song {
  id: number;
  albumId: number;
  title: string;
  image: string;
  artists: string[];
  album: string;
  duration: string;
}

export const songs: Song[] = ${JSON.stringify(songs, null, 2)};
`;
  
  await writeFile('src/lib/data.ts', output);
  console.log('\n🎉 ¡data.ts generado con éxito!');
  console.log(`📊 Total: ${playlists.length} playlists, ${songs.length} canciones`);
  
  const newCount = songs.filter(s => !existingSongs.find(e => e.albumId === s.albumId && e.id === s.id)).length;
  if (newCount > 0) {
    console.log(`✨ ${newCount} canciones nuevas añadidas`);
  }
}

function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getRandomColor() {
  const colorOptions = ['blue', 'rose', 'purple', 'orange', 'red', 'green', 'yellow'];
  const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
  return `colors.${randomColor}`;
}

generateMusicData().catch(console.error);