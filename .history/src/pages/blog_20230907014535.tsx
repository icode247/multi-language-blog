import { useState } from "react";
import { useQuery } from "@apollo/client";
import BLOGPOST_QUERY from "../queries/blogPosts";
import { gql } from "@apollo/client";

function BlogList() {
  const [language, setLanguage] = useState(1);
  const { loading, error, data } = useQuery(
    gql`
  query {
    blogPost(id: ${language} ) {
      data {
        attributes {
          title
          content
        }
      }
    }
  }
`
  );

  console.log(data);

  const handleLanguageChange = (e: any) => {
    setLanguage(e.target.value);
  };

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="EN">English</option>
        <option value="FR">French</option>
        <option value="ES">Spanish</option>
      </select>

      {data.blogPosts?.map((post: any) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;


import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import BLOGPOST_QUERY from "../queries/blogPosts";
import { gql } from "@apollo/client";

function BlogList() {
    const [locale, setLocale] = useState('en'); // Default to English
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Fetch data when component mounts and whenever locale changes
      async function fetchPosts() {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:1337/api/blog-posts?locale=${locale}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
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

      {data.blogPosts?.map((post: any) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
