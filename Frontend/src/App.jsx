import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path = "/signup" element = {<Signup />}></Route>
        <Route path = "/signin" element = {<Signin />}></Route>
        <Route path = "/dashboard" element = {<Dashboard />}></Route>
        <Route path = "/transfer" element = {<Transfer />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
