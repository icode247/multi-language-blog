import { useState } from 'react';
import { useQuery } from '@apollo/client';
import BLOGPOST_QUERY from './queries/blogPosts';

function BlogList() {
  const [language, setLanguage] = useState("EN");
  const { loading, error, data } = useQuery(BLOGPOST_QUERY, {
    variables: { language: language }
  });

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="EN">English</option>
        <option value="FR">French</option>
        <option value="ES">Spanish</option>
      </select>

      {data.blogPosts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
