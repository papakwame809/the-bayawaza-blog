import React from 'react';
import './PostCard.css';

export default function PostCard({ post, onReadMore, onDelete }) {
  const categoryClass = post.category?.toLowerCase() === 'opinion' 
    ? 'card__tag--opinion' 
    : 'card__tag--journal';

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      onDelete(post.id);
    }
  };

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
  
  <button className="card__delete-trigger" onClick={handleDeleteClick} aria-label="Delete post">
    Remove
  </button>
</div>
    </article>
  );
}