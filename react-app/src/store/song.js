const GET_ALL_SONGS = "song/GET_ALL_SONGS";
const GET_ALL_USER_SONGS = "song/GET_ALL_USER_SONGS";
const UPLOAD_SONG = "song/UPLOAD_SONG";
const UPDATE_SONG = "song/UPDATE_SONG";
const DELETE_SONG ="song/DELETE_SONG";

const getAllSongs = (songs) => ({
  type: GET_ALL_SONGS,
  songs
});

const getAllUserSongs = (songs) => ({
  type: GET_ALL_USER_SONGS,
  songs
});

// const uploadSong = (songData) => ({
//   type: UPLOAD_SONG,
//   songData
// })

export const getAllSongsThunk = () => async (dispatch) => {
  const response = await fetch("/api/songs/ok", {
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllSongs(data));
  }
}

export const getAllUserSongsThunk = () => async (dispatch) => {
  const response = await fetch("/api/songs/current", {
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log(response, "THUNKKK")
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllUserSongs(data));
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
      console.log(key,"key", val, "val")
    });
    
    await fetch(`/api/songs/${songId}/update`, {
      method: 'PUT',
      body: formData      
    });

  } catch (error) {
      console.error('Error uploading song:', error.message);
  }
}

export const deleteSongThunk = (songId) => async (dispatch) => {
  await fetch(`api/songs/${songId}/delete`)
}

const initialState = {}

export default function song (state = initialState, action) {
  switch(action.type) {
    case GET_ALL_SONGS: {
      const newState = {allSongs: {}}
      newState['allSongs'] = action.songs
      return newState
    }
    case GET_ALL_USER_SONGS: {
      const newState = {userSongs: {}}
      newState['userSongs'] = action.songs
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
    case DELETE_SONG: {
      const newState = {...state}
      delete newState[action.song]
      return newState
    }
    default:
      return state;  
  }
}