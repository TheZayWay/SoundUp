import { useEffect, useState } from 'react';
import './CoverArt.css';

function CoverArt () {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/images')
    .then(response => response.json())
    .then((data) => setImages(data))    
  }, [])

  return (
    <>
      <div id='cover-art-image-cont'>
        {images.map((image, idx) => <img className='cover-art-image' key={idx} src={image.imagepath} alt='Coverart'></img>)}
      </div>    
    </>
  )
};

export default CoverArt;