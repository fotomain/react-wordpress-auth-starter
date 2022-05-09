import ReactDOM from 'react-dom';
// import { Form } from 'react-final-form';

// ionic build --prod; ionic cap sync --prod; ionic serve
// ionic build --prod; ionic cap sync --prod;
// ionic serve

import logo from './logo.svg';
import './App.css';
// https://capacitorjs.com/docs/apis/splash-screen
import { SplashScreen } from '@capacitor/splash-screen';

function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
             Edit 2 <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
