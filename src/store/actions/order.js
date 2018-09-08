import * as actionType from  './actionTypes'
import axios from '../../axios-orders'


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }
}



export const purchaseBurgerFild = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = ( orderData ) => {
  return dispatch => {
      dispatch(purchaseBurgerStart())
// res.data the data from fb leter i need to get the order id from the res.data
    axios.post('/orders.json', orderData)
    .then(res => dispatch(purchaseBurgerSuccess( res.data.name, orderData )))
    .catch(error => dispatch(purchaseBurgerFild(error)) )

   }

}

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    }
}





