import { colors } from "./colors";

export interface Playlist {
  id: string;
  albumId: number;
  title: string;
  color: (typeof colors)[keyof typeof colors];
  cover: string;
  artists: string[];
}

export const playlists: Playlist[] = [
  {
    "id": "1",
    "albumId": 1,
    "title": "LieblingsSongs",
    "color": colors.purple,
    "cover": "https://misc.scdn.co/liked-songs/liked-songs-640.jpg",
    "artists": [
      "Stevanz"
    ]
  },
  {
    "id": "2",
    "albumId": 2,
    "title": "Dzieciństwo",
    "color": colors.orange,
    "cover": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cb3c9936c8d5a2f7085b015cd",
    "artists": [
      "Vic🎀⛸️"
    ]
  },
  {
    "id": "3",
    "albumId": 3,
    "title": "YHLQMDLG",
    "color": colors.rose,
    "cover": "https://i.scdn.co/image/ab67616d0000b273548f7ec52da7313de0c5e4a0",
    "artists": [
      "Bad Bunny"
    ]
  },
  {
    "id": "4",
    "albumId": 4,
    "title": "2k25",
    "color": colors.orange,
    "cover": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cc9717db1439e0e9cfd169c57",
    "artists": [
      "Stevanz"
    ]
  },
  {
    "id": "5",
    "albumId": 5,
    "title": "Bad Bunny",
    "color": colors.blue,
    "cover": "https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13",
    "artists": [
      "Bad Bunny"
    ]
  },
  {
    "id": "6",
    "albumId": 6,
    "title": "Homerun",
    "color": colors.yellow,
    "cover": "https://i.scdn.co/image/ab67616d0000b273cf7e54f668d6a31dd6566f24",
    "artists": [
      "Paulo Londra"
    ]
  },
  {
    "id": "7",
    "albumId": 7,
    "title": "Twenty One Pilots",
    "color": colors.green,
    "cover": "https://i.scdn.co/image/ab6761610000e5eb61a7ea26d33ded218cd1e59d",
    "artists": [
      "Twenty One Pilots"
    ]
  },
  {
    "id": "8",
    "albumId": 8,
    "title": "Hip Hop 2000s Musik",
    "color": colors.purple,
    "cover": "https://i.scdn.co/image/df73c0cebe56cafe705ffdba5085ccbd5680bd16",
    "artists": [
      "50 Cent"
    ]
  },
  {
    "id": "9",
    "albumId": 9,
    "title": "Chill R&B Mix ",
    "color": colors.orange,
    "cover": "https://i.scdn.co/image/ab67616d0000b27320a56d172e4ec4037af4af5c",
    "artists": [
      "The Weekend"
    ]
  },
  {
    "id": "10",
    "albumId": 10,
    "title": "Pop Mix",
    "color": colors.rose,
    "cover": "https://i.scdn.co/image/ab67616d0000b2731c5eacf6965d328c2c795cef",
    "artists": [
      "Rihana",
      "Katy Perry"
    ]
  },
  {
    "id": "11",
    "albumId": 11,
    "title": "Latin Mix",
    "color": colors.green,
    "cover": "https://i.scdn.co/image/ab67616d00001e02cb83041c80b5b3047679a43b",
    "artists": [
      "Bad Bunny",
      "Rauw alejandro",
      "Shakira",
      "Karol G",
      "Feid"
    ]
  },
  {
    "id": "12",
    "albumId": 12,
    "title": "Mega Hit Mix",
    "color": colors.rose,
    "cover": "https://i.scdn.co/image/ab67616d00001e02bb1e7090e662ce98b0e1b4c0",
    "artists": [
      "Dua lipa",
      "Artemas",
      "Olivia Rodrigo",
      "Harry Styles"
    ]
  },
  {
    "id": "13",
    "albumId": 13,
    "title": "Rock Mix",
    "color": colors.red,
    "cover": "https://i.scdn.co/image/ab67616d00001e0294d08ab63e57b0cae74e8595",
    "artists": [
      "Red Hot Chilli Pepers",
      "Twenty One Pilots",
      "Green Day"
    ]
  }
];

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

export const songs: Song[] = [
  {
    "id": 1,
    "albumId": 1,
    "title": "Airbag",
    "image": "https://misc.scdn.co/liked-songs/liked-songs-640.jpg",
    "artists": [
      "EasyKid"
    ],
    "album": "Airbag",
    "duration": "2:52"
  },
  {
    "id": 2,
    "albumId": 1,
    "title": "dirty little secret",
    "image": "https://misc.scdn.co/liked-songs/liked-songs-640.jpg",
    "artists": [
      "Artemas"
    ],
    "album": "Artemas",
    "duration": "3:01"
  },
  {
    "id": 3,
    "albumId": 1,
    "title": "Cross my heart",
    "image": "https://misc.scdn.co/liked-songs/liked-songs-640.jpg",
    "artists": [
      "Artemas"
    ],
    "album": "Artemas",
    "duration": "2:26"
  },
  {
    "id": 4,
    "albumId": 1,
    "title": "wet dreams",
    "image": "https://misc.scdn.co/liked-songs/liked-songs-640.jpg",
    "artists": [
      "Artemas"
    ],
    "album": "Artemas",
    "duration": "1:39"
  },
  {
    "id": 5,
    "albumId": 1,
    "title": "eyes don't lie",
    "image": "https://misc.scdn.co/liked-songs/liked-songs-640.jpg",
    "artists": [
      "isabel laRosa"
    ],
    "album": "isabel laRosa",
    "duration": "2:32"
  },
  {
    "id": 6,
    "albumId": 1,
    "title": "R.K.M, Ken-Y - Down (Audio)",
    "image": "https://misc.scdn.co/liked-songs/liked-songs-640.jpg",
    "artists": [
      "Luis Fernando flores"
    ],
    "album": "R.K.M, Ken-Y - Down (Audio)",
    "duration": "3:50"
  },
  {
    "id": 1,
    "albumId": 2,
    "title": "Lili",
    "image": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cb3c9936c8d5a2f7085b015cd",
    "artists": [
      "Enej"
    ],
    "album": "Folkhorod",
    "duration": "3:27"
  },
  {
    "id": 2,
    "albumId": 2,
    "title": "Tak Smakuje Życie",
    "image": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cb3c9936c8d5a2f7085b015cd",
    "artists": [
      "Enej"
    ],
    "album": "Folkhorod",
    "duration": "3:38"
  },
  {
    "id": 3,
    "albumId": 2,
    "title": "Symetryczno Liryczna",
    "image": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cb3c9936c8d5a2f7085b015cd",
    "artists": [
      "Enej"
    ],
    "album": "Folkhorod",
    "duration": "3:13"
  },
  {
    "id": 4,
    "albumId": 2,
    "title": "Skrzydlate Ręce",
    "image": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cb3c9936c8d5a2f7085b015cd",
    "artists": [
      "Enej"
    ],
    "album": "Folkhorod",
    "duration": "2:53"
  },
  {
    "id": 5,
    "albumId": 2,
    "title": "Zbudujemy Dom",
    "image": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cb3c9936c8d5a2f7085b015cd",
    "artists": [
      "Enej"
    ],
    "album": "Folkhorod",
    "duration": "3:03"
  },
  {
    "id": 1,
    "albumId": 3,
    "title": "Si Veo A Tu Mama",
    "image": "https://i.scdn.co/image/ab67616d0000b273548f7ec52da7313de0c5e4a0",
    "artists": [
      "Bad Bunny"
    ],
    "album": "YHLQMDLG",
    "duration": "2:50"
  },
  {
    "id": 2,
    "albumId": 3,
    "title": "La Dificil",
    "image": "https://i.scdn.co/image/ab67616d0000b273548f7ec52da7313de0c5e4a0",
    "artists": [
      "Bad Bunny"
    ],
    "album": "YHLQMDLG",
    "duration": "2:42"
  },
  {
    "id": 3,
    "albumId": 3,
    "title": "Pero Ya No",
    "image": "https://i.scdn.co/image/ab67616d0000b273548f7ec52da7313de0c5e4a0",
    "artists": [
      "Bad Bunny"
    ],
    "album": "YHLQMDLG",
    "duration": "2:51"
  },
  {
    "id": 4,
    "albumId": 3,
    "title": "La Santa",
    "image": "https://i.scdn.co/image/ab67616d0000b273548f7ec52da7313de0c5e4a0",
    "artists": [
      "Bad Bunny"
    ],
    "album": "YHLQMDLG",
    "duration": "3:30"
  },
  {
    "id": 5,
    "albumId": 3,
    "title": "Yo Perreo Sola",
    "image": "https://i.scdn.co/image/ab67616d0000b273548f7ec52da7313de0c5e4a0",
    "artists": [
      "Bad Bunny"
    ],
    "album": "YHLQMDLG",
    "duration": "3:02"
  },
  {
    "id": 1,
    "albumId": 4,
    "title": "Track 1",
    "image": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cc9717db1439e0e9cfd169c57",
    "artists": [
      "Unknown Artist"
    ],
    "album": "2k25",
    "duration": "2:59"
  },
  {
    "id": 2,
    "albumId": 4,
    "title": "Track 2",
    "image": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cc9717db1439e0e9cfd169c57",
    "artists": [
      "Unknown Artist"
    ],
    "album": "2k25",
    "duration": "2:12"
  },
  {
    "id": 3,
    "albumId": 4,
    "title": "Track 3",
    "image": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cc9717db1439e0e9cfd169c57",
    "artists": [
      "Unknown Artist"
    ],
    "album": "2k25",
    "duration": "3:02"
  },
  {
    "id": 4,
    "albumId": 4,
    "title": "Track 4",
    "image": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cc9717db1439e0e9cfd169c57",
    "artists": [
      "Unknown Artist"
    ],
    "album": "2k25",
    "duration": "2:29"
  },
  {
    "id": 5,
    "albumId": 4,
    "title": "Track 5",
    "image": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cc9717db1439e0e9cfd169c57",
    "artists": [
      "Unknown Artist"
    ],
    "album": "2k25",
    "duration": "2:29"
  },
  {
    "id": 1,
    "albumId": 5,
    "title": "Track 1",
    "image": "https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13",
    "artists": [
      "Unknown Artist"
    ],
    "album": "Bad Bunny",
    "duration": "3:49"
  },
  {
    "id": 2,
    "albumId": 5,
    "title": "Track 2",
    "image": "https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13",
    "artists": [
      "Unknown Artist"
    ],
    "album": "Bad Bunny",
    "duration": "1:52"
  },
  {
    "id": 3,
    "albumId": 5,
    "title": "Track 3",
    "image": "https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13",
    "artists": [
      "Unknown Artist"
    ],
    "album": "Bad Bunny",
    "duration": "2:15"
  },
  {
    "id": 4,
    "albumId": 5,
    "title": "Track 4",
    "image": "https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13",
    "artists": [
      "Unknown Artist"
    ],
    "album": "Bad Bunny",
    "duration": "4:06"
  },
  {
    "id": 5,
    "albumId": 5,
    "title": "Track 5",
    "image": "https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13",
    "artists": [
      "Unknown Artist"
    ],
    "album": "Bad Bunny",
    "duration": "2:54"
  },
  {
    "id": 1,
    "albumId": 6,
    "title": "Track 1",
    "image": "https://i.scdn.co/image/ab67616d0000b273cf7e54f668d6a31dd6566f24",
    "artists": [
      "Unknown Artist"
    ],
    "album": "Homerun",
    "duration": "1:57"
  },
  {
    "id": 2,
    "albumId": 6,
    "title": "Track 2",
    "image": "https://i.scdn.co/image/ab67616d0000b273cf7e54f668d6a31dd6566f24",
    "artists": [
      "Unknown Artist"
    ],
    "album": "Homerun",
    "duration": "1:49"
  },
  {
    "id": 3,
    "albumId": 6,
    "title": "Track 3",
    "image": "https://i.scdn.co/image/ab67616d0000b273cf7e54f668d6a31dd6566f24",
    "artists": [
      "Unknown Artist"
    ],
    "album": "Homerun",
    "duration": "2:35"
  },
  {
    "id": 4,
    "albumId": 6,
    "title": "Track 4",
    "image": "https://i.scdn.co/image/ab67616d0000b273cf7e54f668d6a31dd6566f24",
    "artists": [
      "Unknown Artist"
    ],
    "album": "Homerun",
    "duration": "2:49"
  },
  {
    "id": 5,
    "albumId": 6,
    "title": "Track 5",
    "image": "https://i.scdn.co/image/ab67616d0000b273cf7e54f668d6a31dd6566f24",
    "artists": [
      "Unknown Artist"
    ],
    "album": "Homerun",
    "duration": "2:29"
  },
  {
    "id": 1,
    "albumId": 7,
    "title": "Igual Que Ayer",
    "image": "https://i.scdn.co/image/ab6761610000e5eb61a7ea26d33ded218cd1e59d",
    "artists": [
      "R.K.M & Ken-Y - Topic"
    ],
    "album": "Igual Que Ayer",
    "duration": "3:52"
  },
  {
    "id": 2,
    "albumId": 7,
    "title": "Rihanna - Don’t Stop the Music (Lyrics)",
    "image": "https://i.scdn.co/image/ab6761610000e5eb61a7ea26d33ded218cd1e59d",
    "artists": [
      "Watermelon Music"
    ],
    "album": "Rihanna - Don’t Stop the Music (Lyrics)",
    "duration": "4:31"
  },
  {
    "id": 1,
    "albumId": 8,
    "title": "The Game Hate it or Love it feat 50 Cent",
    "image": "https://i.scdn.co/image/ab67616d00004851b1d860ab1ba847e778b2796d",
    "artists": [
      "50 Cent"
    ],
    "album": "The Game Hate it or Love it feat 50 Cent",
    "duration": "3:26"
  },
  {
    "id": 2,
    "albumId": 8,
    "title": "Eminem Feat Dido - Stan",
    "image": "https://i.scdn.co/image/ab67616d0000485176ac6f4b5e6cda3c7f888ec0",
    "artists": [
      "Eminem, Dido"
    ],
    "album": "Eminem Feat Dido - Stan",
    "duration": "6:44"
  },
  {
    "id": 1,
    "albumId": 9,
    "title": "Is There Someone Else?",
    "image": "https://i.scdn.co/image/ab67616d00004851e3aacadc8280d50d5dbd5b37",
    "artists": [
      "TheWeeknd"
    ],
    "album": "TheWeeknd",
    "duration": "3:19"
  },
  {
    "id": 1,
    "albumId": 10,
    "title": "Bruno Mars Locked Out Of Heaven",
    "image": "https://i.scdn.co/image/ab67616d00004851926f43e7cce571e62720fd46",
    "artists": [
      "Bruno Mars"
    ],
    "album": "thegreatestsong Discography",
    "duration": "3:54"
  },
  {
    "id": 1,
    "albumId": 11,
    "title": "Debí Tirar Más Fotos DtMF",
    "image": "https://i.scdn.co/image/ab67616d00004851bbd45c8d36e0e045ef640411",
    "artists": [
      "Bad Bunny"
    ],
    "album": "Debí Tirar Más Fotos",
    "duration": "4:00"
  },
  {
    "id": 1,
    "albumId": 12,
    "title":"Levitating",
    "image": "https://i.scdn.co/image/ab67616d00004851bb1e7090e662ce98b0e1b4c0",
    "artists": [
      "Dua Lipa"
    ],
    "album": " Levitating",
    "duration": "3:23"
  },
  {
    "id": 1,
    "albumId": 13,
    "title": "Red Hot Chili Peppers",
    "image": "https://i.scdn.co/image/ab67616d0000485108a1b1e0674086d3f1995e1b",
    "artists": [
      "Red Hot Chili Peppers"
    ],
    "album": "Red Hot Chili Peppers",
    "duration": "4:29"
  }
];
