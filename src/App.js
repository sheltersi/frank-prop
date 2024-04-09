import './App.css';

import ValidationComponent from './components/ValidationComponent';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Phone Number Validator</h1>
       <ValidationComponent />
      </header>
      {/* <ValidationComponent /> */}
    </div>
  );
}

export default App;
