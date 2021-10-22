import ReactDOM from 'react-dom';

import Code from './components/code/Code';

const App = () => {
    return (
        <Code />
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));