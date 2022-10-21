import React, { Component } from 'react'

import styles from './CartItemGallery.module.css'

import { ReactComponent as IoIosArrowBack } from '../../assets/prevBtn.svg'
import { ReactComponent as IoIosArrowForward } from '../../assets/nextBtn.svg'

class CartItemGallery extends Component {
   constructor(props) {
      super(props)
      this.state = {
         imgIndx: 0,
      }
   }

   changeImg = (action) => {
      const { imgIndx } = this.state
      const { gallery } = this.props
      if (action === 'next') {
         if (imgIndx === gallery?.length - 1) {
            this.setState({
               imgIndx: 0,
            })
         } else {
            this.setState((prevState) => {
               return {
                  ...prevState,
                  imgIndx: prevState.imgIndx + 1,
               }
            })
         }
      }
      if (action === 'back') {
         if (imgIndx === 0) {
            this.setState({
               imgIndx: gallery.length - 1,
            })
         } else {
            this.setState((prevState) => {
               return {
                  ...prevState,
                  imgIndx: prevState.imgIndx - 1,
               }
            })
         }
      }
   }

   render() {
      const { imgIndx } = this.state
      const { gallery, name } = this.props
      return (
         <div className={styles.gallery}>
            <img src={gallery?.[imgIndx]} alt={name} />
            {gallery?.length > 1 && (
               <div className={styles.navigate}>
                  <button
                     className={styles.navigateBtn}
                     onClick={() => this.changeImg('back')}
                  >
                     <IoIosArrowBack />
                  </button>

                  <button
                     className={styles.navigateBtn}
                     onClick={() => this.changeImg('next')}
                  >
                     <IoIosArrowForward />
                  </button>
               </div>
            )}
         </div>
      )
   }
}

export default CartItemGallery
