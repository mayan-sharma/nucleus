import ReactDOM from 'react-dom';

import Draw from './components/Draw';

const App = () => {
    return (
        <Draw />
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));