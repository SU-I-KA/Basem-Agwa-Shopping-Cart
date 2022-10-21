import { gql } from '@apollo/client'

export const getCategories = gql`
   query {
      categories {
         name
      }
   }
`

export const getCurrencies = gql`
   query {
      currencies {
         label
         symbol
      }
   }
`

export const getProductsByCategory = gql`
   query getProductsByCategory($title: String!) {
      category(input: { title: $title }) {
         products {
            id
            name
            gallery
            inStock
            description
            prices {
               currency {
                  label
                  symbol
               }
               amount
            }
            attributes {
               id
               name
               type
               items {
                  value
                  displayValue
                  id
               }
            }
            brand
         }
      }
   }
`

export const getProductById = gql`
   query getProductById($id: String!) {
      product(id: $id) {
         id
         name
         gallery
         inStock
         description
         category
         brand
         prices {
            currency {
               label
               symbol
            }
            amount
         }
         attributes {
            id
            name
            type
            items {
               value
               displayValue
               id
            }
         }
      }
   }
`
