import React from 'react';

import AddCell from "./AddCell";
import CellItem from "./CellItem";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Notebook: React.FC = () => {
    
    const cells = useTypedSelector(({ cells }) => cells?.order.map(id => cells?.data[id]));
    
    const showRenderedCells = () => cells?.map(cell => 
        <React.Fragment key={cell.id}>
            <AddCell cellId={cell.id} />
            <CellItem cell={cell} />
        </React.Fragment>
    );

    return (
        <div style={{ margin: '20px', marginBottom: '40vh' }}>
            {showRenderedCells()}
        </div>
    );
}

export default Notebook;