import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import CommunityPost from '../components/CommunityPost';
import LoadingSpinner from '../components/shared/LoadingSpinner';

function Home() {
  const [localPosts] = useLocalStorage('aura_posts', []);
  const { data: trends, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=3');

  return (
    <div className="home-container">
      <h2 className="vogue-title">editorial journal</h2>
      <div className="posts-grid">
        {localPosts.map(post => <CommunityPost key={post.id} post={post} />)}
      </div>

      <hr className="vogue-divider" />
      <h3 className="vogue-subtitle">global inspiration</h3>
      
      {loading && <LoadingSpinner />}
      {error && <p className="error-text">Trends unavailable: {error}</p>}
      
      <div className="trends-list">
        {trends && trends.map(item => (
          <div key={item.id} className="trend-item">
            <h4>{item.title}</h4>
            <p>{item.body.slice(0, 50)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
 