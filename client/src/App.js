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
        <Route path="/signup" element = { <Login />} />
      </Routes>
    </div>
  );
}

export default App;
