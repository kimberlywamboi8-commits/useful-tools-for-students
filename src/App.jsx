import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Outlet, useNavigate } from 'react-router-dom';

// --- 1. CUSTOM STORAGE HOOK ---
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

// --- 2. LAYOUT & NAVIGATION ---
const Layout = () => {
  const [advice, setAdvice] = useState("Loading inspiration...");

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => setAdvice(data.slip.advice))
      .catch(() => setAdvice("Style is a way to say who you are."));
  }, []);

  return (
    <div className="app-container">
      <header className="vogue-header">
        <h1>aura outfit</h1>
        <nav className="main-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Journal</NavLink>
          <NavLink to="/create" className={({ isActive }) => isActive ? 'active' : ''}>Share Look</NavLink>
          <NavLink to="/discovery" className={({ isActive }) => isActive ? 'active' : ''}>Discover</NavLink>
        </nav>
      </header>
      
      <main className="main-layout">
        <div className="content-area"><Outlet /></div>
        <aside className="sidebar">
          <h3>Editorial Advice</h3>
          <p className="advice-text">"{advice}"</p>
          <hr />
          <h3>Trends</h3>
          <p>Minimalism is key this season. Experiment with bold textures.</p>
        </aside>
      </main>
    </div>
  );
};

// --- 3. PAGE COMPONENTS ---

const Home = () => {
  const [posts] = useLocalStorage('aura_posts', []);
  return (
    <div className="posts-grid">
      {posts.length > 0 ? posts.map(post => (
        <div key={post.id} className="post-card">
          <img src={post.image || 'https://via.placeholder.com/300'} alt={post.title} />
          <h3>{post.title}</h3>
        </div>
      )) : <p className="hint-text">Your journal is empty. Add a look to start!</p>}
    </div>
  );
};

const CreatePost = () => {
  const [posts, setPosts] = useLocalStorage('aura_posts', []);
  const [formData, setFormData] = useState({ title: '', image: '', outfit: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Please add a title.");
    setPosts([{ ...formData, id: Date.now() }, ...posts]);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="vogue-form">
      <h2 className="vogue-title">new curation</h2>
      <input placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
      <input placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
      <textarea placeholder="Outfit Aesthetic" value={formData.outfit} onChange={e => setFormData({...formData, outfit: e.target.value})} />
      <button type="submit" className="publish-btn">Publish</button>
    </form>
  );
};

const Discovery = () => {
  const [posts] = useLocalStorage('aura_posts', []);
  const [randomPost, setRandomPost] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffle = () => {
    if (posts.length === 0) return;
    setIsShuffling(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * posts.length);
      setRandomPost(posts[randomIndex]);
      setIsShuffling(false);
    }, 800);
  };

  return (
    <section className="discovery-container">
      <h2 className="vogue-title">aesthetic roulette</h2>
      <button onClick={shuffle} className="shuffle-btn" disabled={isShuffling}>
        {isShuffling ? "Consulting Stars..." : "✨ Shuffle Aura ✨"}
      </button>
      <div className="discovery-display">
        {randomPost && !isShuffling && (
          <div className="discovery-card animate-pop">
            <img src={randomPost.image} alt={randomPost.title} />
            <h3>{randomPost.title}</h3>
            <p>{randomPost.outfit}</p>
          </div>
        )}
      </div>
    </section>
  );
};

// --- 4. MAIN APP COMPONENT ---
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="discovery" element={<Discovery />} />
      </Route>
    </Routes>
  );
}