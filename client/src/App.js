import Navbar from "./Navbar";
import { Route, Routes } from 'react-router-dom'
import Services from "./Services";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/services" element = { <Services /> }/>
        <Route path="/Login" element = { <Login />} />
        <Route path='/Signup' element = {<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
