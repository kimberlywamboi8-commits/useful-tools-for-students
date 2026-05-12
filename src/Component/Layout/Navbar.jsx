import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-center items-center py-8 border-b border-gray-50 mb-10 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <ul className="flex space-x-12">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-[10px] uppercase tracking-[0.3em] transition-all duration-300 ${isActive ? 'text-black font-bold border-b-2 border-purple-500 pb-1' : 'text-gray-400 hover:text-black'}`
            }
          >
            journal
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/create" 
            className={({ isActive }) => 
              `text-[10px] uppercase tracking-[0.3em] transition-all duration-300 ${isActive ? 'text-black font-bold border-b-2 border-purple-500 pb-1' : 'text-gray-400 hover:text-black'}`
            }
          >
            share look
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `text-[10px] uppercase tracking-[0.3em] transition-all duration-300 ${isActive ? 'text-black font-bold border-b-2 border-purple-500 pb-1' : 'text-gray-400 hover:text-black'}`
            }
          >
            philosophy
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;