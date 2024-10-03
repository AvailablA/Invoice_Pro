
import React from 'react';
import Home from './Home';
import InvoiceForm from './InvoiceForm';
import './invoiceForm.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/InvoiceForm' element={<InvoiceForm />} />
        <Route/>
      </Routes>
    </Router>
  );
}

export default App;


