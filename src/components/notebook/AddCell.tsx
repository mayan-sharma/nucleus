import './add-cell.css';
import { useActions } from '../../hooks/useActions';

interface AddCellProps {
    cellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ cellId }) => {
    
    const { insertCell } = useActions();

    return (
        <div className='add-cell'>
            <button onClick={() => insertCell(cellId, 'code')}>
                <span>
                    <i className='fa fa-plus'></i>
                    Code
                </span>
            </button>
            <button onClick={() => insertCell(cellId, 'markdown')}>
                <span>
                    <i className='fa fa-plus'></i>
                    Markdown
                </span>
            </button>
            <div className='divider'></div>
        </div>
    );
}

export default AddCell;