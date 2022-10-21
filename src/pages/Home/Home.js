import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './Home.module.css'

import client from '../../Graphql/apolloClient'
import { getProductsByCategory } from '../../Graphql/queries'

import { SectionContainer } from '../../context/context'

import cartIcon from '../../assets/whiteCart.svg'
import ProductsLoading from '../../components/Loading/ProductsLoading'

class Home extends Component {
   state = {
      products: [],
      loading: true,
   }

   fetchProductsByCategory = async (category) => {
      const { loading, data } = await client.query({
         notifyOnNetworkStatusChange: true,
         fetchPolicy: 'network-only',
         query: getProductsByCategory,
         variables: {
            title: category,
         },
      })
      this.setState({ products: data.category.products, loading })
   }

   componentDidUpdate(prevProps) {
      if (
         this.props.context.selectedCategory !==
         prevProps.context.selectedCategory
      ) {
         this.fetchProductsByCategory(this.props.context.selectedCategory)
      }
   }

   componentDidMount() {
      const category = this.props.match.params.category || 'all'
      this.props.context.changeCategory(category)
      this.fetchProductsByCategory(category)
   }

   render() {
      const { loading, products } = this.state
      const {
         selectedCurrency,
         selectedCategory,
         increaseCartQuantity,
         getPriceIndex,
         cartOpen,
      } = this.props.context

      return (
         <main className={`${cartOpen && 'scrollLock'}`}>
            <div className={styles.title}>{selectedCategory}</div>
            <section className={styles.products}>
               {!loading ? (
                  products?.map((product) => {
                     const { id, name, brand, gallery, prices } = product

                     const priceIndex = getPriceIndex(prices)

                     return (
                        <article key={id} className={styles.oneProduct}>
                           <button
                              className={styles.addToCart}
                              disabled={!product.inStock}
                              onClick={() => increaseCartQuantity(product)}
                           >
                              <img src={cartIcon} alt='add-to-cart' />
                           </button>
                           <Link
                              to={`/product/${id}`}
                              className={styles.imgContainer}
                           >
                              <img src={gallery[0]} alt={name} />
                              {!product.inStock && (
                                 <div className={styles.outtaStock}>
                                    <span>OUT OF STOCK</span>
                                 </div>
                              )}
                           </Link>
                           <Link
                              to={`/product/${id}`}
                              className={styles.productTitle}
                           >{`${brand} ${name}`}</Link>
                           <h5>{`${selectedCurrency.symbol} ${prices[priceIndex].amount}`}</h5>
                        </article>
                     )
                  })
               ) : (
                  <ProductsLoading />
               )}
            </section>
         </main>
      )
   }
}

export default SectionContainer(Home)
