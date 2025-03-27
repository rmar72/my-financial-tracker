import React from 'react';
import { BrowserRouter, Routes } from 'react-router';
import appRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {...appRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
