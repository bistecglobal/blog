import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Routes from './Routes';

const root = createRoot(document.getElementById('root'));
root.render(<Routes />);
