import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostPage.css';

export default function PostPage({ posts, onDelete }) {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundPost = posts.find((p) => String(p.id) === String(postId));

    if (foundPost) {
      setPost(foundPost);
      setLoading(false);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`) 
        .then((response) => {
          if (!response.ok) {
            throw new Error('Article not found');
          }
          return response.json();
        })
        .then((data) => {
          const idKey = String(postId);

          const customArticles = {
            "1": {
              title: "GPL Tactical Breakdown: Hearts of Oak Midfield Shape",
              excerpt: "Analyzing the double-pivot rotation used to bypass high presses.",
              content: "In this tactical breakdown, we isolate how Hearts of Oak utilized a fluid double-pivot to break central lines. By dropping a secondary midfielder deep during build-up phases, they successfully manipulated defensive triggers and created overlapping overloads out wide.",
              category: "Match Review",
              date: "Tactical Desk • Yesterday",
              readTime: "6 min"
            },
            "2": {
              title: "Asante Kotoko's Defensive Block Architecture",
              excerpt: "A deep dive into the low-block spacing and transition timing.",
              content: "Kotoko's recent defensive solidity relies heavily on horizontal compactness. This analysis tracks their shifting triggers from a mid-block to a deep 5-3-2 layout, isolating how the backline managed space between the lines to stifle transition threats.",
              category: "Defensive Blueprint",
              date: "Scouting Feed • 2 days ago",
              readTime: "4 min"
            }
          };

          const articleText = customArticles[idKey] || {
            title: data.title ? (data.title.charAt(0).toUpperCase() + data.title.slice(1)) : "Untitled Analysis",
            excerpt: "General tactical match analysis and performance metrics.",
            content: data.body || "No content available.",
            category: "Analysis",
            date: "Just now",
            readTime: "3 min"
          };

          const customizedPost = {
            id: data.id,
            title: articleText.title,
            excerpt: articleText.excerpt,
            content: articleText.content,
            category: articleText.category,
            date: articleText.date,
            readTime: articleText.readTime
          };

          setPost(customizedPost);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [postId, posts]);

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      onDelete(post.id);
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="post-error">
        <h2>Loading article content...</h2>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-error">
        <h2>Article not found</h2>
        <button onClick={() => navigate('/')}>Return to home</button>
      </div>
    );
  }

  return (
    <article className="post-page">
      <header className="post-page__header">
        <button className="post-page__back" onClick={() => navigate('/')}>
          ← Back to home
        </button>
        
        <div className="post-page__meta">
          <span>{post.date}</span>
          <span className="post-page__dot" />
          <span>{post.category}</span>
          <span className="post-page__dot" />
          <span>{post.readTime || '3 min'} read</span>
        </div>

        <h1 className="post-page__title">{post.title}</h1>
        
        <p className="post-page__excerpt">{post.excerpt}</p>
      </header>

      <section className="post-page__content">
        <p>{post.content}</p>
      </section>

      <footer className="post-page__footer">
        <button className="post-page__delete-trigger" onClick={handleDeleteClick} aria-label="Delete post">
          Remove Entry
        </button>
      </footer>
    </article>
  );
}