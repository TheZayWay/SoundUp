import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk } from '../../store/song';
import './CoverArt.css';

function CoverArt () {
  const dispatch = useDispatch();
  const songsArr = useSelector((state) => state?.song?.allSongs);
  console.log(songsArr)
  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])

  return (
    <>
      
      {songsArr ? songsArr.map((song,idx) => { return <img key={idx} src={song.imagepath} alt='CoverArt'></img>}) : ""}
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