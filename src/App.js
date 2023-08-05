import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Render from "./Render";
import Forms from './components/Forms'
import {ToastContainer} from 'react-toastify'

function App() {
  
  return (
    <div className="App">
      <Router>
        <ToastContainer/>
        <Navbar key={new Date()} />
        <Routes>
        <Route path="/" element={<Forms />} />
          <Route path="/build" element={<Home/>} />
          
         <Route path="/render/:id" element={<Render/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
