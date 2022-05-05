import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledHintTable = styled.div`
  display: grid;
  grid-auto-columns: 40px;
  grid-auto-rows: 40px;
`;

const StyledEntry = styled.div`
  grid-column: ${(props) => (props.col)} / span 1;
  grid-row: ${(props) => (props.row)} / span 1;
`;

function HintTable({hintMatrix, bank}){
  const sorted = [...bank].sort();
  let numbers = Array(hintMatrix[0]?.length).fill(4).map((item, i) => item + i);
  numbers.push('Total');
  let totals = hintMatrix.map(row => row.reduce((value, prev) => value + prev));
  const n = hintMatrix[0].length + 2;
  return (
    <Div>
      <h3> Word Starts {'&'} Lengths </h3>
      <StyledHintTable>
      { sorted.map((char, i) => <StyledEntry col='1' row={i+2}><b>{char.toUpperCase()}</b></StyledEntry>)}
      { numbers.map((item, j) => <StyledEntry col = {j+2} row = '1'><b>{item}</b></StyledEntry>)}
      { totals.map((total, i) => <StyledEntry col = {n} row = {i+2}><b>{total}</b></StyledEntry>)}
      { hintMatrix.map((row, i) => {
          return row.map((value,j) => <StyledEntry key = {`${i+2, j+2}`} row = {i + 2} col = {j + 2}>{value}</StyledEntry>);
      })
      }
      </StyledHintTable>
    </Div>
  );
}


export default HintTable;