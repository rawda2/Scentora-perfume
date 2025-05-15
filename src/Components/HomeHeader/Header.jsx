import React, { useState } from 'react';
import { Box, IconButton, Paper, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import slide1 from './../../assets/h1.jpg'
import slide2 from './../../assets/h2.jpg'
import slide3 from './../../assets/h3.jpg'
import slide4 from './../../assets/h4.jpg'



const images = [
  slide1,
  slide2,
  slide3,
  slide4
];

export default function SimpleImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    
    <Box sx={{ position: 'relative', width: '1250px', height: 450 }}>
      <Paper
        component="img"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
           display: 'block', 
          
        }}
      />
      
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0,0,0,0.3)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0,0,0,0.3)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
}