import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormUserDataComponent } from './component/component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GridComponent } from './component/gridComponent';


function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<FormUserDataComponent />} />
          <Route path='/Grid' element={<GridComponent />} />
        </Routes>
      </BrowserRouter>
    
    </>
     
  );
}

export default App;
