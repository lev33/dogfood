import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="container py-5">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
