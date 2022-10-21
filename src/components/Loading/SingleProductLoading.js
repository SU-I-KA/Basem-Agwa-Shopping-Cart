import React, { Component } from 'react'

import styles from './loading.module.css'

class SingleProductLoading extends Component {
   render() {
      const loop = Array.from(Array(3).keys())
      return (
         <>
            <div className={styles.productViewerSection}>
               <div className={styles.row}>
                  <div className={styles.columOne}>
                     {loop.map?.((item) => {
                        return (
                           <div key={item} className={styles.productRow}>
                              <div
                                 className={`${styles.img} loading-img`}
                              ></div>
                           </div>
                        )
                     })}
                  </div>
                  <div className={styles.columTwo}>
                     <div className={`${styles.bigImg} loading-img`}></div>
                  </div>
               </div>
            </div>

            <section className={styles.details}>
               <div className={`${styles.h4} text-line`}></div>
               <div className={`${styles.h6} text-line`}></div>

               <div className={styles.attributeSection}>
                  <div className={styles.singleAttribute}>
                     <div
                        className={`${styles.attributeTitle} text-line`}
                     ></div>
                     <div className={`${styles.labelGroup} text-line`}></div>
                  </div>
                  <div className={styles.singleAttribute}>
                     <div
                        className={`${styles.attributeTitle} text-line`}
                     ></div>
                     <div className={`${styles.labelGroup} text-line`}></div>
                  </div>
               </div>

               <div className={styles.description}>
                  <div className='text-line'></div>
                  <div className='text-line'></div>
                  <div className='text-line'></div>
                  <div className='text-line'></div>
                  <div className='text-line'></div>
                  <div className='text-line'></div>
                  <div className='text-line'></div>
                  <div className='text-line'></div>
                  <div className='text-line'></div>
                  <div className='text-line'></div>
                  <div className='text-line'></div>
                  <div className='text-line'></div>
               </div>
            </section>
         </>
      )
   }
}

export default SingleProductLoading
