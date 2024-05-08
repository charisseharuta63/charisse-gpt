import './App.css';
import { LetsEat } from './components/LetsEat';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to <code>Let's Eat</code> :)
          </p>
          <LetsEat/>
        </header>
      </div>
    </>
  );
}

export default App;
