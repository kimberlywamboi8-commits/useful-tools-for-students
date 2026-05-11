import { Outlet, Link, NavLink } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="app-container">
      <Header />
      
      {/* NAVIGATION BAR */}
      <nav className="main-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
          journal
        </NavLink>
        <NavLink to="/create" className={({ isActive }) => isActive ? 'active-link' : ''}>
          share look
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>
          philosophy
        </NavLink>
      </nav>

      <div className="main-layout">
        <main>
          {/* This is where Home.jsx or CreatePost.jsx will show up */}
          <Outlet />
        </main>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;