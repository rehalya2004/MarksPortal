import Login from "./components/Login"
import Home from "./components/Home"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './App.css';
import Add from "./components/Add";
import ProtectCreate from "./components/protected";
import Mark from "./components/Mark";
import Protect from "./components/studentProtected";
import Marksheet from "./components/Marksheet";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        
      <Route element={<ProtectCreate/>}>
      <Route path="/home" element ={<Home/>}/>
      </Route>

      <Route path="/" element = {<Login/>}/>

      <Route element={<ProtectCreate/>}>
      <Route path="/addStudent" element = {<Add/>}/>
      </Route>

      <Route element={<ProtectCreate/>}>
      <Route path="/addMark" element = {<Marksheet/>}/>
      </Route>

      <Route element={<Protect/>}>
      <Route path="/view" element = {<Mark/>}/>
      </Route>

      </Routes>
    </Router>
    
    </div>
  );
}

export default App;
