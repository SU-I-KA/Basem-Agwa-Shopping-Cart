import React, { Component } from 'react'
import parse from 'html-react-parser'

import styles from './ProductDetails.module.css'

import client from '../../Graphql/apolloClient'
import { getProductById } from '../../Graphql/queries'

import ProductViewer from '../../components/ProductViewer/ProductViewer'
import SingleProductLoading from '../../components/Loading/SingleProductLoading'

import { SectionContainer } from '../../context/context'

import { isAttributeActive } from '../../utils/isAttributeActive'
import { formatCurrency } from '../../utils/formatCurrency'

class ProductDetails extends Component {
   state = {
      product: {},
      loading: true,
      selectedAttributes: [],
   }

   getProduct = async () => {
      const {
         match: {
            params: { id },
         },
      } = this.props
      const { data, loading } = await client.query({
         query: getProductById,
         variables: {
            id: id,
         },
      })

      let selectedAttributes
      if (data?.product?.inStock) {
         selectedAttributes = this.props.context.createDefaultAttributes(
            data?.product?.attributes
         )
      }

      this.setState(
         { product: data.product, loading, selectedAttributes },
         () => console.log(this.state.product)
      )
   }

   selectAttribute = (item) => {
      let attr = [...this.state.selectedAttributes]
      const index = attr.findIndex((obj) => obj.name === item.name)

      if (index === -1) {
         attr.push(item)
      } else {
         attr[index] = item
      }
      this.setState({
         selectedAttributes: attr,
      })
   }

   componentDidMount() {
      this.getProduct()
   }

   render() {
      const { product, loading, selectedAttributes } = this.state
      const {
         selectedCurrency,
         increaseCartQuantity,
         getPriceIndex,
         cartOpen,
      } = this.props.context

      const priceIndex = getPriceIndex(product?.prices)

      return (
         <main className={`${styles.product} ${cartOpen && 'scrollLock'}`}>
            {loading ? (
               <SingleProductLoading />
            ) : (
               <>
                  <ProductViewer gallery={product && product.gallery} />
                  <section className={styles.details}>
                     <h4>{product?.brand}</h4>
                     <h6>{product?.name}</h6>
                     {product?.attributes?.length > 0 && (
                        <div className={styles.attributeSection}>
                           {product?.attributes?.map((attribute) => {
                              const { items, type, id, name } = attribute
                              return (
                                 <div
                                    className={styles.singleAttribute}
                                    key={id}
                                 >
                                    <h5 className={styles.attributeTitle}>
                                       {`${name}:`}
                                    </h5>
                                    <div className={styles.labelGroup}>
                                       {items?.map?.((item) => {
                                          const attributeToSelect = {
                                             name,
                                             type,
                                             value: item.value,
                                          }
                                          return (
                                             <button
                                                key={item.id}
                                                onClick={() =>
                                                   this.selectAttribute(
                                                      attributeToSelect
                                                   )
                                                }
                                                disabled={!product.inStock}
                                                className={`${
                                                   type === 'swatch'
                                                      ? styles.swatchBtn
                                                      : styles.txtBtn
                                                } ${
                                                   isAttributeActive(
                                                      attributeToSelect,
                                                      selectedAttributes
                                                   ) && styles.active
                                                }`}
                                             >
                                                {type === 'swatch' ? (
                                                   <i
                                                      style={{
                                                         background: item.value,
                                                         border:
                                                            item?.value ===
                                                            '#FFFFFF'
                                                               ? '0.5px solid #1d1f22'
                                                               : '',
                                                         width: '100%',
                                                         display: 'block',
                                                         height: '100%',
                                                      }}
                                                   ></i>
                                                ) : (
                                                   item.value
                                                )}
                                             </button>
                                          )
                                       })}
                                    </div>
                                 </div>
                              )
                           })}
                        </div>
                     )}

                     <div className={styles.priceSection}>
                        <h5 className={styles.attributeTitle}>price:</h5>
                        <h3 className={styles.attributeValue}>{`${
                           selectedCurrency?.symbol
                        } ${formatCurrency(
                           product?.prices?.[priceIndex]?.amount
                        )}`}</h3>
                     </div>
                     <button
                        className={styles.pdpAddToCart}
                        disabled={!product?.inStock}
                        onClick={() =>
                           increaseCartQuantity({
                              ...product,
                              selectedAttributes,
                           })
                        }
                     >
                        {product?.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                     </button>
                     <div className={styles.description}>
                        {parse(product?.description)}
                     </div>
                  </section>
               </>
            )}
         </main>
      )
   }
}

export default SectionContainer(ProductDetails)
