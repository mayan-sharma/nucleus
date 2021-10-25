import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './state';
import Notebook from './components/markdown/MarkdownCell';

const App = () => {
    return (
        <Provider store={store}>
            <Notebook />
        </Provider>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));