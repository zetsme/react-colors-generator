import React, { useState, useEffect } from 'react';
import { FaEyeDropper } from 'react-icons/fa';
import Values from 'values.js';
import Color from './Color';

const App = () => {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [values, setValues] = useState(new Values('#00ffff').all());
  const submitHandle = (e) => {
    e.preventDefault();
    try {
      const colors = new Values(color).all();
      setValues(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
      return () => clearTimeout(timer);
    }, 5000);
  }, [error]);
  return (
    <>
      <section className='form-section'>
        <h1>Colors Generator</h1>
        <form onSubmit={submitHandle} className='form'>
          <div className='form__control'>
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type='text'
              className={`form__input ${error && 'error'}`}
              placeholder='#00ffff'
            />
            {error && <span className='form__error'>Enter valid color</span>}
          </div>
          <button type='submit' className='form__btn'>
            Generate
            <FaEyeDropper />
          </button>
        </form>
      </section>
      <section className='colors-section'>
        {values.map((color, indx) => (
          <Color key={indx} {...color} hexColor={color.hex} />
        ))}
      </section>
    </>
  );
};

export default App;
