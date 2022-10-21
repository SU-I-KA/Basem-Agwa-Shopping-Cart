import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { SectionContainer } from '../../context/context'

import DropDownMenu from '../DropDownMenu/DropDownMenu'
import CartOverlay from '../CartOverlay/CartOverlay'

import styles from './Navbar.module.css'

import logo from '../../assets/logo.svg'
import cart from '../../assets/cart.svg'

class Navbar extends Component {
   render() {
      const {
         categories,
         selectedCategory,
         changeCategory,
         cartQuantity,
         toggleMiniCart,
         cartOpen,
      } = this.props.context
      return (
         <>
            <header>
               <nav>
                  <ul>
                     {categories?.map((category) => {
                        return (
                           <li
                              key={category.name}
                              className={`${
                                 category.name === selectedCategory &&
                                 styles.active
                              }`}
                           >
                              <Link
                                 to={`/category/${category.name}`}
                                 onClick={(e) =>
                                    changeCategory(e.target.textContent)
                                 }
                              >
                                 {category.name}
                              </Link>
                           </li>
                        )
                     })}
                  </ul>
               </nav>
               <Link
                  to='/'
                  className={styles.logo}
                  onClick={() => changeCategory('all')}
               >
                  <img src={logo} alt='logo' />
               </Link>
               <div className={styles.rghtSection}>
                  <DropDownMenu />
                  <button className={styles.cartIcon} onClick={toggleMiniCart}>
                     <img src={cart} alt='cart-icon' />
                     {cartQuantity > 0 && (
                        <div className={styles.cartQuantity}>
                           {cartQuantity}
                        </div>
                     )}
                  </button>
               </div>
            </header>
            {cartOpen && <CartOverlay />}
         </>
      )
   }
}

export default SectionContainer(Navbar)
