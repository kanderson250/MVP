import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Enter = styled.input`
  all: unset;
  border-bottom: 1px solid black;
  font-size: 1.2rem;
  width: 200px;
  font-weight: light;
`;

function Input({submitWord}) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitWord(value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <Enter type="text" placeholder = 'YOUR WORD HERE' value={value} onChange={handleChange} />
      </form>
    </div>
  );
}

Input.propTypes = {
  submitWord: PropTypes.func
};

export default Input;
