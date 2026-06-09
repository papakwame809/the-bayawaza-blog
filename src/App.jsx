import React, { useState, useEffect } from 'react'; 
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroPost from './components/HeroPost';
import PostList from './components/PostList';
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost'; 
import Opinions from './pages/Opinions'; 
import { postsData } from './data/postsData';
import './App.css';

export default function App() {
  const navigate = useNavigate();
  
  const [isAuthor, setIsAuthor] = useState(() => {
    return localStorage.getItem('bayawaza_author_mode') === 'true';
  });

  const [blogs, setBlogs] = useState(() => {
    const savedUserPosts = localStorage.getItem('bayawaza_custom_posts');
    const initialData = Array.isArray(postsData) ? postsData : [];
    
    if (savedUserPosts) {
      return [...JSON.parse(savedUserPosts), ...initialData];
    }
    return initialData;
  });
  
  useEffect(() => {
    async function fetchLiveUpdates() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
        const apiData = await response.json();

        const formattedApiPosts = apiData.map((item, index) => ({
          id: `api-${item.id}`,
          title: item.title,
          category: index % 2 === 0 ? 'Analysis' : 'Opinion',
          excerpt: item.body.substring(0, 80) + '...',
          content: item.body,
          date: '5 June 2026'
        }));

        setBlogs((currentBlogs) => {
          const localUserPosts = currentBlogs.filter(post => !String(post.id).startsWith('api-'));
          return [...localUserPosts, ...formattedApiPosts];
        });

      } catch (error) {
        console.error(error);
      }
    }

    fetchLiveUpdates();
  }, []);

  useEffect(() => {
    const customUserPostsOnly = blogs.filter(post => {
      const isApi = String(post.id).startsWith('api-');
      const isHardcoded = post.id === "1" || post.id === "2";
      return !isApi && !isHardcoded;
    });

    localStorage.setItem('bayawaza_custom_posts', JSON.stringify(customUserPostsOnly));
  }, [blogs]);

  const toggleAuthorMode = () => {
    setIsAuthor((prev) => {
      if (!prev) {
        const pin = prompt("Enter Author Authorization Passkey:");
        if (pin === "baya2026") {
          localStorage.setItem('bayawaza_author_mode', 'true');
          return true;
        } {
          alert("Invalid credentials. Access denied.");
          return false;
        }
      } else {
        localStorage.setItem('bayawaza_author_mode', 'false');
        return false;
      }
    });
  };

  const featuredPost = blogs[0] || null;
  const listPosts = blogs.slice(1);

  const handleReadMore = (id) => {
    navigate(`/post/${id}`);
  };

  const handlePublishPost = (newPost) => {
    setBlogs((prevBlogs) => [newPost, ...prevBlogs]);
  };

  const handleDeletePost = (idToDelete) => {
    setBlogs((prevBlogs) => prevBlogs.filter(post => post.id !== idToDelete));
  };

  return (
    <div className="app-container">
      <Navbar isAuthor={isAuthor} />
      
      <div className="main-content">
        {blogs.length === 0 ? (
          <div style={{ color: '#fff', padding: '4rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2>Data Loading Conflict</h2>
            <p>Check your data/postsData.js file format. The postsData array is reading as empty or undefined.</p>
          </div>
        ) : (
          <Routes>

            
            <Route 
              path="/" 
              element={
                <main>
                  <HeroPost post={featuredPost} onReadMore={handleReadMore} onDelete={isAuthor ? handleDeletePost : undefined} />
                  <PostList posts={listPosts} onReadMore={handleReadMore} onDelete={isAuthor ? handleDeletePost : undefined} />
                </main>
              } 
            />
            
            <Route path="/post/:postId" element={<PostPage posts={blogs} onDelete={isAuthor ? handleDeletePost : undefined} />} />
            
            <Route 
              path="/create" 
              element={isAuthor ? <CreatePost onPublish={handlePublishPost} /> : <Navigate to="/" replace />} 
            />
            
            <Route path="/opinions" element={<Opinions posts={blogs} />} />

            <Route 
              path="/journal" 
                element={
                  <div className="placeholder-view">
                    <div className="placeholder-view__content">
                      <div className="placeholder-view__badge">Dev Phase 01</div>
                      <h1 className="placeholder-view__title">This part is in progress ;)</h1>
                      <p className="placeholder-view__subtitle">
                        Section currently under development. Author-exclusive ideas, unfiltered opinions to come! Check back soon!
                      </p>
                    </div>
                  </div>
                } 
              />

<Route 
    path="/about" 
    element={
      <div className="about-view">
        <div className="about-view__container">
          <header className="about-view__header">
            <div className="about-view__badge">The Operator</div>
            <h1 className="about-view__title">Behind Bayawaza!</h1>
          </header>
          
                          <div className="about-view__grid">
                            <div className="about-view__column">
                              <p className="about-view__text-lead">
                                Hola! Papa Kwame here! I'm the one behind Bayawaza!
                              </p>
                              <p className="about-view__text">
                                I built this corner of the internet because I got tired of seeing overly complicated software setups, messy interfaces, and text walls of other blogs sites.
                              </p>
                              <p className="about-view__text">
                                This site is basically my personal digital workshop and scratchpad. I use it to break down tech architectures, test out minimal designs, and document things that actually work. Have fun browsing thru!
                              </p>
                            </div>
                            
                           
                          </div>
                        </div>
                      </div>
                    } 
                  />

          </Routes>
        )}
      </div>

      <button className="author-floating-btn" onClick={toggleAuthorMode}>

        {isAuthor ? "Exit Author Workspace" : "Author Access"}
      </button>

      <footer className="global-footer">
        <p className="global-footer__text">© 2026 Bayawaza! By Papa Kwame Adom-Oduro. All rights reserved</p>
        
        <div className="global-footer__social-section">

          <span className="social-heading">Reach my socials:</span>

          <div className="global-footer__socials">

            <a href="https://www.linkedin.com/in/papa-kwame-adom-oduro/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

            <a href="https://github.com/papakwame809" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
                <i className="fa-brands fa-github"></i>
            </a>

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-icon">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}