import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FormPais from './components/FormPais';
import axios from 'axios';
import CardsPaises from './components/CardsPaises';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar/pais" element={<FormPais />} />
        <Route path="/listar/pais" element={<CardsPaises />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
