import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Outlet, useNavigate } from 'react-router-dom';

// --- 1. CUSTOM HOOK (Task 18.1) ---
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// --- 2. SHARED LAYOUT (Task 18.3) ---
const Layout = () => (
  <div className="app-container">
    <header className="vogue-header">
      <h1>Aura Outfit</h1>
      <nav className="main-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Journal</NavLink>
        <NavLink to="/create" className={({ isActive }) => isActive ? 'active' : ''}>Share Look</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>Philosophy</NavLink>
      </nav>
    </header>
    
    <main className="main-layout">
      <div className="content-area">
        <Outlet /> {/* This is where Home/Create pages render */}
      </div>
      <aside className="sidebar">
        <h3>Trends</h3>
        <p>Minimalism is the new luxury.</p>
      </aside>
    </main>
    
    <footer>© 2026 Aura Outfit Editorial</footer>
  </div>
);

// --- 3. PAGES (Task 17.3) ---

const Home = () => {
  const [posts] = useLocalStorage('aura_posts', []);
  return (
    <section>
      <h2 className="vogue-title">editorial feed</h2>
      <div className="posts-grid">
        {posts.length > 0 ? posts.map(post => (
          <article key={post.id} className="post-card">
            <img src={post.image || 'https://via.placeholder.com/300'} alt={post.title} />
            <h3>{post.title}</h3>
            <p>{post.outfit}</p>
          </article>
        )) : <p>Your journal is empty. Share a look to begin.</p>}
      </div>
    </section>
  );
};

const CreatePost = () => {
  const [posts, setPosts] = useLocalStorage('aura_posts', []);
  const [formData, setFormData] = useState({ title: '', image: '', outfit: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { ...formData, id: Date.now() };
    setPosts([newPost, ...posts]);
    navigate('/'); // Task 17.3: Programmatic navigation
  };

  return (
    <section className="create-post">
      <h2 className="vogue-title">new curation</h2>
      <form onSubmit={handleSubmit} className="vogue-form">
        <input placeholder="Title" onChange={e => setFormData({...formData, title: e.target.value})} />
        <input placeholder="Image URL" onChange={e => setFormData({...formData, image: e.target.value})} />
        <textarea placeholder="Description" onChange={e => setFormData({...formData, outfit: e.target.value})} />
        <button type="submit" className="publish-btn">Publish</button>
      </form>
    </section>
  );
};

const About = () => (
  <section>
    <h2 className="vogue-title">philosophy</h2>
    <p>Aura Outfit is a digital space for curated minimalist aesthetics.</p>
  </section>
);

// --- 4. MAIN APP COMPONENT ---
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}