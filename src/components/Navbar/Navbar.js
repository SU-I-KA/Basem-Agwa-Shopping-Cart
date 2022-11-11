import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { SectionContainer } from '../../context/context'

import DropDownMenu from '../DropDownMenu/DropDownMenu'
import CartOverlay from '../CartOverlay/CartOverlay'

import styles from './Navbar.module.css'

import logo from '../../assets/logo.svg'

class Navbar extends Component {
   render() {
      const { categories, selectedCategory, changeCategory } =
         this.props.context
      return (
         <>
            <header>
               <nav>
                  <ul className={styles.navList}>
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
                  <CartOverlay />
               </div>
            </header>
         </>
      )
   }
}

export default SectionContainer(Navbar)
