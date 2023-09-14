import { useEffect, useState } from "react";
function BlogList() {
  const [locale, setLocale] = useState("en"); // Default to English
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:1337/api/blog-posts?locale=${locale}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { data } = await response.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [locale]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleLanguageChange = (e: any) => {
    setLocale(e.target.value);
  };
  return (
    <div>
      <select value={locale} onChange={handleLanguageChange}>
        <option value="EN">English</option>
        <option value="FR">French</option>
        <option value="ES">Spanish</option>
      </select>

      {posts.map((post: any) => (
        <div key={post.attributes.id}>
          <h2>{post.attributes.title}</h2>
          <p>{post.attributes.content}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
