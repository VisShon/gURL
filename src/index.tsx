import React from 'react';
import ReactDOM from 'react-dom/client';
import { URLsProvider } from "@/context/URLContext"

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
	<URLsProvider>
		<App />
	</URLsProvider>
);
