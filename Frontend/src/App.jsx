import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";

function App() {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="text-2xl font-semibold text-gray-800 bg-white px-6 py-4 rounded-xl shadow-md">
    //     👋 Hi there, welcome to your app!
    //   </div>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path = "/signup" element = {<Signup />}></Route>
        <Route path = "/signin" element = {<Signin />}></Route>
        <Route path = "/dashboard" element = {<Dashboard />}></Route>
        <Route path = "/transfer" element = {<Transfer />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
