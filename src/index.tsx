import ReactDOM from 'react-dom';

import Notebook from './components/markdown/MarkdownCell';

const App = () => {
    return (
        <Notebook />
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));