import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { ApolloProvider } from '@apollo/client'
import client from './Graphql/apolloClient'

import { ProductProvider } from './context/context'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <ProductProvider>
      <BrowserRouter>
         <ApolloProvider client={client}>
            <React.StrictMode>
               <App />
            </React.StrictMode>
         </ApolloProvider>
      </BrowserRouter>
   </ProductProvider>
)
