import { gql } from '@apollo/client';

const BLOGPOST_QUERY = gql`
  
  query BlogPosts($language: String!) {
    blogPosts(where: { Language: $language }) {
        data{
            attributes{
        title
        content
      }
    }
    }
  }
`;

export default BLOGPOST_QUERY;


