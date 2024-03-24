
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Component/Auth.js'
import Need from './Component/Need'
import Deatils from './Component/Deatails'
import Home from './Component/Home'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/need" element={<Need/>}/>
        <Route path="/details" element={<Deatils/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
