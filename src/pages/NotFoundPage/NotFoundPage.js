import React, { Component } from 'react'

import styles from './NotFoundPage.module.css'

import { Link } from 'react-router-dom'

class NotFoundPage extends Component {
   render() {
      return (
         <main>
            <section className={styles.errorPage}>
               <div className={styles.pageCenter}>
                  <span>404</span>
                  <h3>Sorry, the page you tried cannot be found.</h3>
                  <Link to='/' className={styles.errBtn}>
                     back home
                  </Link>
               </div>
            </section>
         </main>
      )
   }
}

export default NotFoundPage
