import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

library.add( faTrashCan );



ReactDOM.render(<App />, document.getElementById('root'));
