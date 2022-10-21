import React, { Component } from 'react'

import client from '../Graphql/apolloClient'
import { getCategories, getCurrencies } from '../Graphql/queries'

import { getLocalStorage } from '../utils/getLocalStorage'

const ProductContext = React.createContext()

class ProductProvider extends Component {
   state = {
      currencies: [],
      categories: [],
      selectedCurrency: {
         label: 'USD',
         symbol: '$',
      },
      selectedCategory: 'all',
      cart: getLocalStorage('cartItems', []),
      cartOpen: false,
   }

   componentDidMount() {
      this.getInitialData()
   }

   componentDidUpdate(prevState) {
      if (prevState.cart !== this.state.cart) {
         localStorage.setItem('cartItems', JSON.stringify(this.state.cart))
      }
   }

   toggleMiniCart = () => {
      this.setState({
         cartOpen: !this.state.cartOpen,
      })
   }

   getInitialData = async () => {
      const fetchCurrencies = await client.query({
         query: getCurrencies,
      })
      const fetchCategories = await client.query({
         query: getCategories,
      })

      this.setState(
         {
            currencies: fetchCurrencies.data.currencies,
            categories: fetchCategories.data.categories,
         },
         () => console.log(this.state.categories, this.state.currencies)
      )
   }

   changeCurrency = (currency) => {
      this.setState({
         selectedCurrency: currency,
      })
   }

   changeCategory = (category) => {
      this.setState(
         {
            selectedCategory: category,
         },
         () => console.log(this.state.selectedCategory)
      )
   }

   increaseCartQuantity = (product) => {
      const { id, attributes } = product
      let selectedAttributes = product?.selectedAttributes || null
      let uniqueId
      if (product?.selectedAttributes) {
         uniqueId = this.createUniqueId({
            id,
            selectedAttributes,
         })
      } else {
         selectedAttributes = this.createDefaultAttributes(attributes)
         uniqueId = this.createUniqueId({ id, selectedAttributes })
      }

      this.setState(
         (state) => {
            if (
               state.cart?.find((item) => item.uniqueId === uniqueId) == null
            ) {
               return (state.cart = [
                  ...state.cart,
                  { ...product, uniqueId, selectedAttributes, quantity: 1 },
               ])
            } else {
               return (state.cart = state.cart?.map((item) => {
                  if (item.uniqueId === uniqueId) {
                     return { ...item, quantity: item.quantity + 1 }
                  } else {
                     return item
                  }
               }))
            }
         },
         () => console.log(this.state.cart)
      )

      // const { cart } = this.state

      // if (cart?.find((item) => item.uniqueId === uniqueId) == null) {
      //    this.setState(
      //       {
      //          cart: [
      //             ...cart,
      //             { ...product, uniqueId, selectedAttributes, quantity: 1 },
      //          ],
      //       },
      //       () => console.log(this.state.cart)
      //    )
      // } else {
      //    this.setState(
      //       {
      //          cart: cart?.map((item) => {
      //             if (item.uniqueId === uniqueId) {
      //                return { ...item, quantity: item.quantity + 1 }
      //             } else {
      //                return item
      //             }
      //          }),
      //       },
      //       () => console.log(this.state.cart)
      //    )
      // }
   }

   decreaseCartQuantity = (id) => {
      this.setState((state) => {
         let { cart } = state
         if (cart.find((item) => item.uniqueId === id)?.quantity === 1) {
            return (state.cart = cart.filter((item) => item.uniqueId !== id))
         } else {
            return (state.cart = cart.map((item) => {
               if (item.uniqueId === id) {
                  return { ...item, quantity: item.quantity - 1 }
               } else {
                  return item
               }
            }))
         }
      })
   }

   getPriceIndex = (prices) => {
      return prices?.findIndex((x) => {
         return x.currency.label === this.state?.selectedCurrency?.label
      })
   }

   // utils functions

   createDefaultAttributes = (attributes) => {
      let defaultAttr = attributes?.map((attr) => {
         const { name, type, items } = attr
         return {
            name,
            type,
            value: items?.[0]?.value,
         }
      })
      return defaultAttr
   }

   createUniqueId = (product) => {
      let uniqueId = product?.id
      product?.selectedAttributes?.forEach?.((attr) => {
         const { name, type, value } = attr
         uniqueId += `-name-${name}-type-${type}-value-${value}`
      })
      return uniqueId
   }

   render() {
      const cartQuantity = this.state.cart?.reduce(
         (quantity, item) => item.quantity + quantity,
         0
      )

      const totalPrice = this.state.cart?.reduce((total, product) => {
         const priceIndex = product?.prices?.findIndex((x) => {
            return x.currency.label === this.state.selectedCurrency?.label
         })
         return total + product?.prices[priceIndex].amount * product.quantity
      }, 0)

      return (
         <ProductContext.Provider
            value={{
               ...this.state,
               changeCurrency: this.changeCurrency,
               changeCategory: this.changeCategory,
               createDefaultAttributes: this.createDefaultAttributes,
               increaseCartQuantity: this.increaseCartQuantity,
               decreaseCartQuantity: this.decreaseCartQuantity,
               toggleMiniCart: this.toggleMiniCart,
               getPriceIndex: this.getPriceIndex,
               cartQuantity,
               totalPrice,
            }}
         >
            {this.props.children}
         </ProductContext.Provider>
      )
   }
}

const ProductConsumer = ProductContext.Consumer

// Higher Order Component
export function SectionContainer(Component) {
   return function ConsumerWrapper(props) {
      return (
         <ProductConsumer>
            {(value) => <Component {...props} context={value} />}
         </ProductConsumer>
      )
   }
}

export { ProductProvider, ProductConsumer, ProductContext }
