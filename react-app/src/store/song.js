const GET_ALL_SONGS = "song/GET_ALL_SONGS";

const getAllSongs = (songs) => ({
  type: GET_ALL_SONGS,
  songs
})


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

const initialState = {}

export default function song (state = initialState, action) {
  switch(action.type) {
    case GET_ALL_SONGS:
      const newState = {allSongs: {}}
      newState['allSongs'] = action.songs
      return newState
    default:
      return state;  
  }
}