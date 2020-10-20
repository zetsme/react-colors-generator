import React, { useState, useEffect, useRef } from 'react';
import { FaBrush } from 'react-icons/fa';

const Color = ({ hexColor, weight, type }) => {
  const [showCopy, setShowCopy] = useState(false);
  const colorRef = useRef(null);
  const hex = '#' + hexColor;
  const copyToClippboard = () => {
    setShowCopy(true);
    navigator.clipboard.writeText(hex);
  };
  useEffect(() => {
    colorRef.current.style.setProperty('--color', hex);
  }, [hex]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCopy(false);
    }, 3000);
    return () => clearTimeout(timer);
  });
  return (
    <article ref={colorRef} className='color' onClick={copyToClippboard}>
      <p className='color__weight'>{weight}%</p>
      <p className='color__hex'>{hex}</p>
      {showCopy && (
        <p className='color__copy'>
          Coppied <FaBrush />
        </p>
      )}
    </article>
  );
};

export default Color;
