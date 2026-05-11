import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* These pages render inside the Layout's Outlet */}
        <Route index element={<Home />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;