import React from 'react';
import PostCard from './PostCard'; 
import './PostList.css';

export default function PostList({ posts, onReadMore, onDelete }) {
  return (
    <section className="feed">
      <h2 className="feed__heading">Recent Updates</h2>
      
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          onReadMore={onReadMore}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}