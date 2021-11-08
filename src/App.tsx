import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Notebook from './components/notebook/Notebook';
import Draw from './components/draw/Draw';

const App: React.FC = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route 
                    path='/notebook' 
                    element={<Notebook />} 
                />
                <Route 
                    path='/draw' 
                    element={<Draw />} 
                />
            </Routes>
        </>
    );
}

export default App;