import { useCallback } from "react";
import "./HeroPost.css";

export default function HeroPost({ post, onReadMore }) {
  if (!post) return null;

  const handleClick = useCallback(() => {
    onReadMore(post.id);
  }, [onReadMore, post.id]);

  return (
    <section className="hero-post-container">
      <div className="hero-card">
        
        <div className="hero-card__graphic-side">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="hero-card__img"
            />
          ) : (
            <div className="hero-card__placeholder">
              <i className="fa-solid fa-layer-group graphic-icon"></i>
            </div>
          )}
        </div>

        <div className="hero-card__content-side">
          <span className="post-card__category">{post.category || "Featured"}</span>
          <h1 className="hero-card__title">{post.title}</h1>
          
          <div className="hero-card__meta">
            <span>{post.date}</span>
          </div>

          <p className="post-card__excerpt">{post.excerpt}</p>
          
          <button className="read-more-btn" onClick={handleClick}>
            Read Analysis →
          </button>
        </div>

      </div>
    </section>
  );
}