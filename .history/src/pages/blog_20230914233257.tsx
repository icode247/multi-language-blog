import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

function BlogList() {
  const [locale, setLocale] = useState("en"); // Default to English

  const BLOGPOST_QUERY = gql`
  query BlogPosts($language: String!) {
      blogs(locale:"fr"){
         data{
          id
          attributes{
            title
            body
            locale
            date
          }
        }
      }
    }
  }
`;
  const { loading, error, data } = useQuery(BLOGPOST_QUERY);

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

      {data.posts.map((post: any) => (
        <div key={post.id}>
          <h2>{post.attributes.title}</h2>
          <p>{post.attributes.content}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
