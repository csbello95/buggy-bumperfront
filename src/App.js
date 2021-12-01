import React, {useState} from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import Login from "./Components/Login";
import CarList from "./Components/CarList";
import Home from "./Components/Home/Home";
import './App.scss';

// import router from "../../../Back/routes/cars.route";

function App() {
  const authorized = localStorage.getItem('authorized');
  const [auth, setAuth ] = useState(!!authorized);
  const user = authorized || "";

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route
          exact
          path="/login"
          element={<Login auth={auth} setAuth={setAuth} />}
        />
        <Route exact path="/admin" element={<CarList authorized={auth} user={user} setAuth={setAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
