import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import OrderPage from './pages/order-page/OrderPage'
import EmptyPage from './pages/empty-page/EmptyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/empty-page" element={<EmptyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
