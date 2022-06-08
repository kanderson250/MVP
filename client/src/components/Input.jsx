import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Enter = styled.input`
  all: unset;
  border-bottom: 1px solid black;
  font-size: 1.2rem;
  width: 200px;
  font-weight: light;
  text-align: center;
`;

Input.propTypes = {
  submitWord: PropTypes.func,
};

Input.defaultProps = {
  submitWord: () => {},
};

function Input({ submitWord }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitWord(value);
    setValue('');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Enter type="text" placeholder="Your word here" value={value} onChange={handleChange} />
      </form>
    </div>
  );
}

export default Input;
