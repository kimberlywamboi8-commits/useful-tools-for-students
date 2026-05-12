import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // We will create this next
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';

function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* 1. Permanent Header */}
      <Header />

      {/* 2. Permanent Navigation Menu */}
      <Navbar />

      {/* 3. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* THE DYNAMIC AREA: This changes when the URL changes */}
          <main className="flex-grow">
            <Outlet />
          </main>

          {/* 4. Permanent Sidebar */}
          <aside className="w-full md:w-80">
            <Sidebar />
          </aside>
          
        </div>
      </div>

      {/* 5. Permanent Footer */}
      <Footer />
    </div>
  );
}

export default Layout;