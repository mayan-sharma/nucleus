import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { store } from './state';
import Notebook from './components/notebook/Notebook';

const App = () => {
    return (
        <Provider store={store}>
            <Notebook />
        </Provider>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));