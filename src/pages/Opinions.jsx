import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Opinions.css';

export default function Opinions({ posts }) {
  const navigate = useNavigate();

  const opinionArticles = Array.isArray(posts) 
    ? posts.filter(post => post.category === 'Opinion') 
    : [];

  return (
    <main className="opinions-container">
      <header className="opinions-header">
        <div className="opinions-header__text">
          <span className="opinions-header__subtitle">Columnists & Insight</span>
          <h1 className="opinions-header__title">Tactical Opinions</h1>
        </div>
        
        <button 
          className="opinions-header__write-btn"
          onClick={() => navigate('/create')}
        >
          + Write Opinion
        </button>
      </header>

      <hr className="opinions-divider" />

      <section className="opinions-stack">
        {opinionArticles.length === 0 ? (
          <p className="opinions-empty">No opinion pieces have been drafted yet.</p>
        ) : (
          opinionArticles.map((post) => (
            <article key={post.id} className="opinions-item">
              <div className="opinions-item__meta">
                <span className="opinions-item__tag">{post.category}</span>
                <span className="opinions-item__dot" />
                <span className="opinions-item__date">{post.date || "Just now"}</span>
              </div>

              <h2 
                className="opinions-item__title" 
                onClick={() => navigate(`/post/${post.id}`)}
              >
                {post.title}
              </h2>

              <p className="opinions-item__excerpt">{post.excerpt}</p>

              <button 
                className="opinions-item__read-btn"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                Read post →
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}