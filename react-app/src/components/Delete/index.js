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

  const handleCancel = () => {
    closeModal();
  }
  
  useEffect(() => {
    dispatch(getAllSongsThunk())
    setIsLoaded(false);
  }, [dispatch, isLoaded])

  return (
    <div id="delete-form-cont">
      <form id="delete-form" onSubmit={handleSubmit}>
        <h1 id="delete-title">Are you sure?</h1>
        <button className="delete-btn-y" type="submit">Yes (Delete)</button>
      </form>
      <button className="delete-btn-n" onClick={handleCancel}>No (Cancel)</button>
    </div>
    
  );
};

export default DeleteSong;