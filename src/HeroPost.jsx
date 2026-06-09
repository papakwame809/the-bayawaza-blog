import { useCallback } from "react";
import "./HeroPost.css";

export default function HeroPost({ post, onReadMore }) {

  
  const handleClick = useCallback(() => {
    onReadMore(post.id);
  }, [onReadMore, post.id]);

  return (
    <section className="hero">

      <span className="hero__tag">Featured</span>

      <h1 className="hero__title">
        {post.title}
      </h1>

      <div className="hero__meta">

        <span>{post.date}</span>
        <span className="hero__dot"/>
        <span>{post.category}</span>
        <span className="hero__dot"/>
        <span>{post.readTime} min read</span>
        
      </div>

      <p className="hero__excerpt">
        {post.excerpt}
      </p>

      <button className="hero__btn" onClick={handleClick}>
        Read post →
      </button>

    </section>
  );
}