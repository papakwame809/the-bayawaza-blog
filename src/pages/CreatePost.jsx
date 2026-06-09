import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

export default function CreatePost({ onPublish }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Analysis',
    readTime: '5 min',
    excerpt: '',
    content: '',
    image: 'https://picsum.photos/id/102/1200/600' // Default high-quality placeholder
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert('Title and Content are required!');
    
    const newPost = {
      ...formData,
      id: String(Date.now()), // Unique safe timestamp ID
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };

    onPublish(newPost);
    navigate('/'); 
  };

  return (
    <main className="create-page">
      <div className="create-container">
        <button className="create__back-btn" onClick={() => navigate('/')}>
          ← Cancel & Return Home
        </button>
        
        <h1 className="create__heading">Draft a New Tactical Breakdown</h1>
        
        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label htmlFor="title">Article Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Tactical Analysis: Hearts of Oak Midfield Shape"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category Tag</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange}>
                <option value="Analysis">Analysis</option>
                <option value="Opinion">Opinion</option>
                <option value="Scouting Report">Scouting Report</option>
                <option value="Match Review">Match Review</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="readTime">Estimated Read Time</label>
              <input
                type="text"
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="e.g., 6 min"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Featured Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image link or leave default"
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Short Excerpt</label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="A one-sentence hook displaying on the feed summary cards..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Full Article Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="12"
              placeholder="Dive deep into the spacing, passing chains, and positional play metrics..."
              required
            ></textarea>
          </div>

          <button type="submit" className="create__submit-btn">
            Publish Post to Feed
          </button>
        </form>
      </div>
    </main>
  );
}