import { graphql } from "gql.tada";

export const addBookDetailsMutation = graphql(`
mutation addBookDetails(
  $name: String!, 
  $description: String!, 
  $publishingRights: Boolean!, 
  $categories: [String]!,
  $language: String!,
  $previousPublishingData: String,
  $edition: Int!,
  $isbn: String,
  $price: Float
  ) {
  addBookDetails(
      name: $name, 
      description: $description, 
      publishingRights: $publishingRights, 
      categories: $categories, 
      language: $language,
      previousPublishingData: $previousPublishingData,
      edition: $edition,
      isbn: $isbn,
      price: $price
    ) {
    _id
  }
}`);

export const publishBookMutation = graphql(`
  mutation publishBook($bookId: String!){
    publishBook(bookId: $bookId) {
      message,
    }
  }
`);

export const editBookMutation = graphql(`
  mutation editBookDetails(  
    $name: String!, 
    $description: String!, 
    $publishingRights: Boolean!, 
    $categories: [String]!,
    $language: String!, 
    $isbn: String,
    $price: Float,
    $edition: Int,
    $bookId: String!
  ) {
    editBookDetails(  
      bookId: $bookId  
      name: $name, 
      description: $description, 
      publishingRights: $publishingRights, 
      categories: $categories, 
      language: $language,
      isbn: $isbn,
      price: $price,
      edition: $edition,
    ) {
      _id
      name
    }
  }
`);

export const moveBookToRecycleBinMutation = graphql(`
  mutation moveBookToRecycleBin($bookId: String!) {
    moveBookToRecycleBin(bookId: $bookId) {
      deleted_id
      message
      success
    }
  }
`);

export const moveBookFromRecycleBinMutation = graphql(`
  mutation moveBookFromRecycleBin($bookId: String!) {
    moveBookFromRecycleBin(bookId: $bookId) {
      success
      message
    }
  }
`);

export const addBookSampleMutation = graphql(`
  mutation addBookSample($bookId: String!, $sample: [String]!) {
    addBookSample(bookId: $bookId, sample: $sample) {
      message
    }
  }
`);
