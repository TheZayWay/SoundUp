const GET_ALL_SONGS = "song/GET_ALL_SONGS";
const UPLOAD_SONG = "song/UPLOAD_SONG";
const UPDATE_SONG = "song/UPDATE_SONG";

const getAllSongs = (songs) => ({
  type: GET_ALL_SONGS,
  songs
})

// const uploadSong = (songData) => ({
//   type: UPLOAD_SONG,
//   songData
// })

export const getAllSongsThunk = () => async (dispatch) => {
  const response = await fetch("/api/songs/", {
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllSongs(data));
  }
}

export const uploadSongThunk = (songData) => async (dispatch) => {
  try {
    const formData = new FormData();
    Object.entries(songData).forEach(([key,val]) => {
      formData.append(key,val)
    });
    
    await fetch("/api/songs/upload", {
      method: 'POST',
      body: formData      
    });

  } catch (error) {
      console.error('Error uploading song:', error.message);
  }
}

export const updateSongThunk = (songData, songId) => async (dispatch) => {
  try {
    const formData = new FormData();
    Object.entries(songData).forEach(([key,val]) => {
      formData.append(key,val)
    });

    await fetch(`/api/songs/${songId}/update`, {
      method: 'PUT',
      body: formData      
    });

  } catch (error) {
      console.error('Error uploading song:', error.message);
  }
}

const initialState = {}

export default function song (state = initialState, action) {
  switch(action.type) {
    case GET_ALL_SONGS: {
      const newState = {allSongs: {}}
      newState['allSongs'] = action.songs
      return newState
    }
    case UPLOAD_SONG: {
      const newState = {...state}
      newState[action.song] = action.song
      return newState
    }
    case UPDATE_SONG: {
      const newState = {...state}
      newState[action.song] = action.song
      return newState
    }  
    default:
      return state;  
  }
}