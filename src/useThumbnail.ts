import { useState, useEffect } from 'react';

function usePeriodicImage(url:string, interval = 3000) {
  const [currentImage, setCurrentImage] = useState(url);
  const [newImage, setNewImage] = useState(url);

  useEffect(() => {
    const fetchImage = () => {
      const img = new Image();
      img.src = `${url}?timestamp=${Date.now()}`;
      img.onload = () => {
        setNewImage(img.src); // Set the new image URL when loaded
      };
    };

    fetchImage(); // Fetch the image immediately
    const intervalId = setInterval(fetchImage, interval);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [url, interval]);

  useEffect(() => {
    if (newImage !== currentImage) {
      setCurrentImage(newImage); // Update current image when new image is ready
    }
  }, [newImage, currentImage]);

  return currentImage;
}

export default usePeriodicImage;
