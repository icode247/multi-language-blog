import { gql } from '@apollo/client';

const BLOGPOST_QUERY = gql`
query {
    blogPosts{
       data{
              attributes{
          title
          content
        }
      }
    }
  }
  
  query BlogPosts($language: String!) {
    blogPosts(where: { Language: $language }) {
      id
      title
      content
    }
  }
`;

export default BLOGPOST_QUERY;


