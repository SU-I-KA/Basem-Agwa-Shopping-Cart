import React, { Component } from 'react'
import styles from './productViewer.module.css'

class ProductViewer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         imgIndx: 0,
      }
   }

   render() {
      const { imgIndx } = this.state
      const { gallery } = this.props
      return (
         <>
            <div className={styles.productViewerSection}>
               <div className={styles.row}>
                  <div
                     className={styles.columOne}
                     style={{
                        overflowY: 'auto',
                        maxHeight: '511px',
                     }}
                  >
                     {gallery?.map?.((image, index) => {
                        return (
                           <div
                              key={index}
                              onClick={() =>
                                 this.setState({
                                    imgIndx: index,
                                 })
                              }
                              className={styles.productRow}
                              style={{
                                 border:
                                    imgIndx === index
                                       ? '1px solid #1d1f22'
                                       : '0',
                              }}
                           >
                              <img src={image} alt='' />
                           </div>
                        )
                     })}
                  </div>
                  <div className={styles.columTwo}>
                     <div className={styles.displayProduct}>
                        <img
                           src={gallery?.[imgIndx]}
                           alt=''
                           className={styles.mainImg}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </>
      )
   }
}

export default ProductViewer
