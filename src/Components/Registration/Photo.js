import React, { useState, useRef } from 'react';
import { useImageContext } from './MyContext';


function Photo() {

  const { setImageBlobData } = useImageContext();
  const imageRef = useRef();
  const [selectedImage, setSelectedImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK5ExGDpzIAgeAUjTPl0y9S2oikbz7beDeZp4Ev_n1-w&s');


  const handleImageClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageBlobData(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageBlobData(file);
    }
  };

  return (
    <div onClick={handleImageClick} onDragOver={handleDragOver} onDrop={handleDrop} style={{ cursor: 'pointer' }} className='photo-div'>
      <img
        src={selectedImage}
        alt='Selected'
        ref={imageRef}
        className='photos'
        width={'300px'}
        height={'300px'}
      />
      <input
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleImageChange}
        ref={imageRef}
      />
    </div>
  );
}

export default Photo;
