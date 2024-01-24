import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<App />}
      />
      <Route
        path="*"
        element={<App />}
      />
    </Routes>
  </BrowserRouter>,
);