import React, { useState } from 'react';
import styled from 'styled-components';

const CellWrapper = styled.button`
    height: 150px;
    width: 150px;
    border: white solid 3px;
`;

const Cell = ({ index, value, select }) => {
    const [val, setVal] = useState(value);
    let turn = false;

    return (
        <CellWrapper onClick={() => select ? select(index) : console.log("Game Over")} >
            <h1>{value}</h1>
        </CellWrapper>
    )
}

export default Cell;