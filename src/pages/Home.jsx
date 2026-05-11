import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import CommunityPost from '../components/CommunityPost';
import LoadingSpinner from '../components/shared/LoadingSpinner';

function Home() {
    const [localPosts] = useLocalStorage('aura_posts', []);
    const { data: apiPosts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=3');

    return (
        <div className="home-feed">
            <h2 className="vogue-title">your journal</h2>
            {localPosts.map(post => <CommunityPost key={post.id} post={post} />)}

            <hr style={{ margin: '40px 0', border: '0.5px solid #eee' }} />

            <h2 className="vogue-title">global inspiration</h2>
            
            {loading && <LoadingSpinner />}
            {error && <p className="error-text">Unable to load trends: {error}</p>}
            
            <div className="api-trends">
                {apiPosts && apiPosts.map(item => (
                    <div key={item.id} className="trend-card" style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '15px' }}>
                        <h4 style={{ textTransform: 'uppercase', fontSize: '0.7rem', color: '#6c5ce7' }}>Trending Topic</h4>
                        <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem' }}>{item.title}</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>{item.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;