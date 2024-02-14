import logo from './logo.svg';
import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login"
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        
        <Login />
      </BrowserRouter> 
    </div>
  );
}

export default App;
