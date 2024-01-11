import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getAllSongsThunk ,deleteSongThunk } from "../../store/song";
import './Delete.css';

function DeleteSong ({song}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  let songId = song.id
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteSongThunk(songId));
    setIsLoaded(true);
    closeModal();
  }
  
  useEffect(() => {
    dispatch(getAllSongsThunk())
    setIsLoaded(false);
  }, [dispatch, isLoaded])

  return (
    <form onSubmit={handleSubmit}>
      <h1>Are you sure?</h1>
      <button type="submit">Yes (Delete)</button>
      <button>No (Cancel)</button>
    </form>
  );
};

export default DeleteSong;