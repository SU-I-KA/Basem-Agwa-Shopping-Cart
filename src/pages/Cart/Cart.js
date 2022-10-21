import React, { Component } from 'react'
import styles from './Cart.module.css'

import CartItemGallery from '../../components/CartItemGallery/CartItemGallery'

import { SectionContainer } from '../../context/context'

import { formatCurrency } from '../../utils/formatCurrency'
import { isAttributeActive } from '../../utils/isAttributeActive'

class Cart extends Component {
   render() {
      const {
         cart,
         selectedCurrency,
         increaseCartQuantity,
         decreaseCartQuantity,
         getPriceIndex,
         cartQuantity,
         totalPrice,
         cartOpen,
      } = this.props.context

      return (
         <main className={`${styles.cartPage} ${cartOpen && 'scrollLock'}`}>
            <div className={styles.title}>Cart</div>
            {cart?.length > 0 ? (
               <>
                  {cart?.map?.((product) => {
                     const {
                        uniqueId,
                        name,
                        brand,
                        prices,
                        gallery,
                        attributes,
                        selectedAttributes,
                        quantity,
                     } = product

                     const priceIndex = getPriceIndex(prices)

                     return (
                        <section key={uniqueId} className={styles.cartItem}>
                           <div className={styles.productDetails}>
                              <h4>{brand}</h4>
                              <h6>{name}</h6>
                              <h3
                                 className={styles.price}
                              >{`${selectedCurrency.symbol} ${prices[priceIndex].amount}`}</h3>
                              {attributes.length > 0 && (
                                 <div className={styles.attributes}>
                                    {attributes?.map((attribute) => {
                                       const { items, type, id, name } =
                                          attribute
                                       return (
                                          <div
                                             className={styles.singleAttribute}
                                             key={id}
                                          >
                                             <h5
                                                className={
                                                   styles.attributeTitle
                                                }
                                             >
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
                                                      <div
                                                         key={item.id}
                                                         className={`${
                                                            type === 'swatch'
                                                               ? styles.swatchAttr
                                                               : styles.txtAttr
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
                                                                  background:
                                                                     item.value,
                                                                  border:
                                                                     item?.value ===
                                                                     '#FFFFFF'
                                                                        ? '0.5px solid #1d1f22'
                                                                        : '',
                                                                  width: '100%',
                                                                  display:
                                                                     'block',
                                                                  height:
                                                                     '100%',
                                                               }}
                                                            ></i>
                                                         ) : (
                                                            item.value
                                                         )}
                                                      </div>
                                                   )
                                                })}
                                             </div>
                                          </div>
                                       )
                                    })}
                                 </div>
                              )}
                           </div>
                           <div className={styles.gallerySection}>
                              <div className={styles.quantityBtns}>
                                 <button
                                    onClick={() =>
                                       increaseCartQuantity(product)
                                    }
                                 >
                                    +
                                 </button>
                                 <div className={styles.quantity}>
                                    {quantity}
                                 </div>
                                 <button
                                    onClick={() =>
                                       decreaseCartQuantity(uniqueId)
                                    }
                                    className={styles.minus}
                                 >
                                    _
                                 </button>
                              </div>
                              <CartItemGallery gallery={gallery} name={name} />
                           </div>
                        </section>
                     )
                  })}
                  <div className={styles.totalPriceSection}>
                     <div className={styles.titles}>
                        <p>Tax 21%:</p>
                        <p>Quantity:</p>
                        <p>Total:</p>
                     </div>
                     <div className={styles.quantities}>
                        <p>{` ${selectedCurrency.symbol} ${formatCurrency(
                           totalPrice * (21 / 100)
                        )}`}</p>
                        <p>{cartQuantity}</p>
                        <p>{` ${selectedCurrency.symbol} ${formatCurrency(
                           totalPrice
                        )}`}</p>
                     </div>
                  </div>
                  <button className={styles.orderBtn}>order</button>
               </>
            ) : (
               <h4>Nothing Here Now - Add Something</h4>
            )}
         </main>
      )
   }
}

export default SectionContainer(Cart)
