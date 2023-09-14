import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

function BlogList() {
  const [locale, setLocale] = useState("en"); // Default to English

  const BLOGPOST_QUERY = gql`
    query BlogPosts($locale: String!) {
      blogs(locale: "fr") {
        data {
          id
          attributes {
            title
            body
            locale
            date
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(BLOGPOST_QUERY, {
    variables: { locale }, // Pass the locale variable to the query
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleLanguageChange = (e: any) => {
    setLocale(e.target.value);
  };

  return (
    <div>
      <select value={locale} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
      </select>

      {data.blogs.data.map((post: any) => (
        <div key={post.id}>
          <h2>{post.attributes.title}</h2>
          <p>{post.attributes.body}</p> {/* Change 'content' to 'body' */}
        </div>
      ))}
    </div>
  );
}

export default BlogList;
