import React from 'react';
import './PostCard.css';

export default function PostCard({ post, onReadMore }) {
  const categoryClass = post.category?.toLowerCase() === 'opinion' 
    ? 'card__tag--opinion' 
    : 'card__tag--journal';

  return (
    <article className="card">
      <div className="card__left">
        <span className={`card__tag ${categoryClass}`}>{post.category}</span>
        
        <h3 className="card__title" onClick={() => onReadMore(post.id)}>
          {post.title}
        </h3>
        
        <button className="card__link" onClick={() => onReadMore(post.id)}>
          → Read
        </button>
      </div>
      
      <div className="card__right">
        <span className="card__date">{post.date}</span>
      </div>
      
    </article>
  );
}