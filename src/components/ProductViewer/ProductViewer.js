import React, { Component } from 'react'
import styles from './productViewer.module.css'

class ProductViewer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         imgIndx: 0,
      }
      this.smGalleriesRef = React.createRef()
      this.bgGalleryRef = React.createRef()
   }

   componentDidMount() {
      const height = `${
         this.bgGalleryRef?.current.getBoundingClientRect().height
      }px`
      this.smGalleriesRef.current.style.height = height
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
                     ref={this.smGalleriesRef}
                     style={{
                        overflowY: 'auto',
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
                  <div className={styles.columTwo} ref={this.bgGalleryRef}>
                     <div className={styles.displayProduct}>
                        <div>
                           <img src={gallery?.[imgIndx]} alt='' />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </>
      )
   }
}

export default ProductViewer
