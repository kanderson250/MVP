import React from 'react';
import styled from 'styled-components';

const Div = styled.div`

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
  return (
    <Div>
      <h3> Word Length Distribution</h3>
      <StyledHintTable>
      { sorted.map((char, i) => <StyledEntry col='1' row={i+2}><b>{char.toUpperCase()}</b></StyledEntry>)}
      { numbers.map((item, j) => <StyledEntry col = {j+2} row = '1'><b>{item}</b></StyledEntry>)}
      { hintMatrix.map((row, i) => {
          return row.map((value,j) => <StyledEntry row = {i + 2} col = {j + 2}>{value}</StyledEntry>);
      })
      }
      </StyledHintTable>
    </Div>
  );
}


export default HintTable;