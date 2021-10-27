import { Cell } from '../../state';
import CodeCell from '../code/CodeCell';
import MarkdownCell from '../markdown/MarkdownCell';
import ActionBar from './ActionBar';

interface CellItemProps {
    cell: Cell
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
    return (
        <div style={{ position: 'relative' }}>
            { cell.type === 'code' ? (
                <>
                    <div style={{ height: '30px', width: '100%', backgroundColor: '#eee' }}>
                        <ActionBar id={cell.id} />
                    </div>
                    <CodeCell cell={cell} />
                </>
            ) : (
                <>
                    <ActionBar id={cell.id} />
                    <MarkdownCell cell={cell} /> 
                </>

            )}
        </div>
    ); 
}

export default CellItem;