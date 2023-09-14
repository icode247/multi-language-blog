import { gql } from '@apollo/client';

const BLOGPOST_QUERY = gql`
  query BlogPosts($language: String!) {
    blogPosts(where: { Language: $language }) {
      id
      title
      content
    }
  }
`;

export default BLOGPOST_QUERY;


