import './App.css';
import { LetsEat } from './components/LetsEat';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to <code>Let's Eat</code> :)
          </p>
          <LetsEat/>
        </header>
      </div>
    </Provider>
  );
}

export default App;
