import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';

<BrowserRouter>
  <Routes>
    <Route path="/notes" element={<Notes />} />
  </Routes>
</BrowserRouter>
