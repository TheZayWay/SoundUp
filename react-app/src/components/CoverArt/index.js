import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk } from '../../store/song';
import UpdateSong from '../Update';
import DeleteSong from '../Delete';
import OpenModalButton from '../OpenModalButton';
import './CoverArt.css';

function CoverArt () {
  const dispatch = useDispatch();
  const songsArr = useSelector((state) => state?.song?.allSongs);
  
  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])

  return (
    <>
      {songsArr ? songsArr.map((song,idx) => { 
        return (
          <div id="cover-art-image-cont">
            <img className='cover-art-image' key={idx} src={song.imagepath} alt=''></img>
            <div id="crud-modal-cont">
              <OpenModalButton 
                buttonText={"Update"}
                modalComponent={<UpdateSong song={song}/>}
              />
              <OpenModalButton 
                buttonText={"Delete"}
                modalComponent={<DeleteSong song={song}/>}
              />
            </div>
            
          </div>         
        )}) : ""}
    </>
  )
};

export default CoverArt;






// If something breaks with build for testing:

  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   fetch('/api/images')
  //   .then(response => response.json())
  //   .then((data) => setImages(data))    
  // }, [])


// {/* <div id='cover-art-image-cont'>
//         {images.map((image, idx) => <img className='cover-art-image' key={idx} src={image.imagepath} alt='Coverart'></img>)}
//       </div>    */}