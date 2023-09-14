import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

interface Blog {
  id: string;
  attributes: {
    title: string;
    body: string;
    locale: string;
    date: string;
  };
}

interface BlogListProps {
  locale: string;
}

const BLOGPOST_QUERY = gql`
  query BlogPosts($locale: I18NLocaleCode!) {
    blogs(locale: $locale) {
      data {
        id
        attributes {
          title
          body
          date
        }
      }
    }
  }
`;

function BlogList({ locale }: BlogListProps) {
  const [selectedLocale, setSelectedLocale] = useState("en");

  const { loading, error, data } = useQuery(BLOGPOST_QUERY, {
    variables: { locale: selectedLocale },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocale(e.target.value);
  };

  return (
    <Container>
      <Select value={selectedLocale} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
      </Select>

      {data.blogs.data.map((post: Blog) => (
        <BlogPost key={post.id}>
          <BlogTitle>{post.attributes.title}</BlogTitle>
          <BlogContent
            dangerouslySetInnerHTML={{ __html: post.attributes.body }} // Render Markdown content
          ></BlogContent>
        </BlogPost>
      ))}
    </Container>
  );
}

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 20px;
`;

const BlogPost = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BlogTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const BlogContent = styled.div`
  font-size: 16px;
  color: #333;
`;

export default BlogList;


// import { useState } from "react";
// import { gql, useQuery } from "@apollo/client";
// import styled from "styled-components";

// function BlogList() {
//   const [locale, setLocale] = useState("en"); // Default to English

//   const BLOGPOST_QUERY = gql`
//     query BlogPosts($locale: I18NLocaleCode!) {
//       blogs(locale: $locale) {
//         data {
//           id
//           attributes {
//             title
//             body
//             locale
//             date
//           }
//         }
//       }
//     }
//   `;

//   const { loading, error, data } = useQuery(BLOGPOST_QUERY, {
//     variables: { locale }, // Pass the locale variable to the query
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const handleLanguageChange = (e: any) => {
//     setLocale(e.target.value);
//   };

//   return (
//     <Container>
//       <Select value={locale} onChange={handleLanguageChange}>
//         <option value="en">English</option>
//         <option value="fr">French</option>
//         <option value="es">Spanish</option>
//       </Select>

//       {data.blogs.data.map((post: any) => (
//         <BlogPost key={post.id}>
//           <BlogTitle>{post.attributes.title}</BlogTitle>
//           <BlogContent dangerouslySetInnerHTML={post.attributes.body}></BlogContent> 
//         </BlogPost>
//       ))}
//     </Container>
//   );
// }

// const Container = styled.div`
//   font-family: Arial, sans-serif;
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 20px;
//   border: 1px solid #e0e0e0;
//   background-color: #f9f9f9;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   border-radius: 5px;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   background-color: #fff;
//   margin-bottom: 20px;
// `;

// const BlogPost = styled.div`
//   margin-bottom: 20px;
//   padding: 10px;
//   background-color: #fff;
//   border: 1px solid #e0e0e0;
//   border-radius: 5px;
// `;

// const BlogTitle = styled.h2`
//   font-size: 24px;
//   margin-bottom: 10px;
// `;

// const BlogContent = styled.p`
//   font-size: 16px;
//   color: #333;
// `;

// export default BlogList;
