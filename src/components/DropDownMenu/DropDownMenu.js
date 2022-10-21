import React, { Component } from 'react'
import styles from './DropDownMenu.module.css'

import { SectionContainer } from '../../context/context'

class DropDownMenu extends Component {
   constructor(props) {
      super(props)
      this.state = {
         currency: this.props.context.selectedCurrency,
         open: false,
      }
      this.wrapperRef = React.createRef()
   }

   handleToggle = () => {
      this.setState({
         open: !this.state.open,
      })
   }

   handleChange = (e) => {
      const symbol = e.target.value
      const label = e.target.name
      const currency = {
         label,
         symbol,
      }
      this.setState(
         {
            currency,
            open: false,
         },
         () => this.props.context.changeCurrency(currency)
      )
   }

   handleClickOutside = (event) => {
      if (
         this.wrapperRef &&
         !this.wrapperRef.current.contains(event.target) &&
         this.state.open
      ) {
         this.setState({
            open: false,
         })
      }
   }

   componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside)
   }

   componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside)
   }

   render() {
      const { currency } = this.state
      const { currencies } = this.props.context

      return (
         <div
            ref={this.wrapperRef}
            className={`${styles.selectWrap} ${
               this.state.open ? styles.active : null
            }`}
         >
            <ul className={styles.defaultOption} onClick={this.handleToggle}>
               <li>
                  <div className={styles.option}>
                     <input type='radio' name='currency' />
                     <span>{currency && currency.symbol}</span>
                  </div>
               </li>
            </ul>

            <ul className={styles.selectUl}>
               {currencies?.map?.((item) => {
                  const { label, symbol } = item
                  return (
                     <li key={label}>
                        <label className={styles.option}>
                           <input
                              type='radio'
                              name={label}
                              value={symbol}
                              onClick={(e) => this.handleChange(e)}
                           />
                           <span>{`${symbol} ${label}`}</span>
                        </label>
                     </li>
                  )
               })}
            </ul>
         </div>
      )
   }
}

export default SectionContainer(DropDownMenu)
