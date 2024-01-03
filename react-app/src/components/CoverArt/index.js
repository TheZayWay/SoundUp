import { useState, useEffect } from "react";
import JSZip from 'jszip';
import './CoverArt.css';

function CoverArt () {
  const [imageSrcs, setImageSrcs] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch the ZIP file
        const response = await fetch('/api/images');
        const zipData = await response.blob();

        // Create a JSZip instance and load the ZIP file
        const zip = new JSZip();
        const zipContents = await zip.loadAsync(zipData);

        // Extract image data URLs from the ZIP file
        const urls = [];
        await Promise.all(Object.keys(zipContents.files).map(async (filename) => {
          const file = zipContents.files[filename];
          const blob = await file.async('blob');
          const dataUrl = URL.createObjectURL(blob);
          urls.push(dataUrl);
        }));

        // Set the image URLs in the component state
        setImageSrcs(urls);
      } catch (error) {
        console.error('Error fetching or processing ZIP file:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div id="cover-art-image-cont">
      {imageSrcs.map((url, index) => (
        <>
        <p></p>
        <img className="cover-art-image" key={index} src={url} alt={index + 1} />  
        </>
      ))}
    </div>
  );
}

export default CoverArt;