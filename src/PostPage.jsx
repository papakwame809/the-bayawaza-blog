import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsData } from '../data/postsData';
import './PostPage.css';

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = postsData.find(p => p.id === postId);

  if (!post) {
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
          <span>{post.readTime} read</span>

        </div>

        <h1 className="post-page__title">{post.title}</h1>
        
        <p className="post-page__excerpt">{post.excerpt}</p>
      </header>

      {}
      <section className="post-page__content">
        <p>{post.content}</p>
        {}
      </section>
    </article>
  );
}