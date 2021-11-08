import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <div>
            <nav className='flex justify-center'>
                <a className='px-6'>
                    <Link to='/notebook'>Notebook</Link>
                </a>
                <Link to='/draw'>Draw</Link>
            </nav>
        </div>
    );
}

export default Navbar;