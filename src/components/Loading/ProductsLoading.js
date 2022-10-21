import React, { Component } from 'react'

import styles from './loading.module.css'

class ProductsLoading extends Component {
   render() {
      const loop = Array.from(Array(3).keys())
      return (
         <>
            {loop?.map((item) => {
               return (
                  <article key={item}>
                     <div
                        className={`${styles.imgContainer} loading-img`}
                     ></div>
                     <div
                        className={`${styles.brand} text-line`}
                        style={{
                           maxWidth: '300px',
                           height: '15px',
                        }}
                     ></div>
                     <div
                        className={`${styles.name} text-line`}
                        style={{
                           maxWidth: '185px',
                        }}
                     ></div>
                  </article>
               )
            })}
         </>
      )
   }
}

export default ProductsLoading
