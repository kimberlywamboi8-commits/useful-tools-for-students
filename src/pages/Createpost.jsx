import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [outfit, setOutfit] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useLocalStorage('aura_posts', []);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !outfit) return;

    const newPost = {
      id: Date.now(),
      title,
      outfit,
      image,
      author: "aura_user",
      loves: 0
    };

    // Save to localStorage list
    setPosts([newPost, ...posts]);
    
    // Redirect back to Home feed
    navigate("/");
  };

  return (
    <section className="create-post-page">
      <form onSubmit={handleSubmit} className="post-card">
        <h2 className="vogue-title">share your look</h2>
        <input 
          placeholder="Collection Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          placeholder="Paste Image URL" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
        />
        <textarea 
          placeholder="Describe the aesthetic..." 
          value={outfit} 
          onChange={(e) => setOutfit(e.target.value)} 
          rows="5"
        />
        <button type="submit" className="publish-btn">Publish to Journal</button>
      </form>
    </section>
  );
}

export default CreatePost;