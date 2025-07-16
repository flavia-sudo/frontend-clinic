import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";

function App() {
    return (
          <div className="w-full min-h-screen flex flex-col">
              <Header />
              <main className="w-full flex-grow">
                  <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/login" element={<Login />} />
                  </Routes>
              </main>
          </div>
    );
}

export default App;
