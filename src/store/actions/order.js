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

export const purchaseBurger = ( orderData, token ) => {
  return dispatch => {
      dispatch(purchaseBurgerStart())
// res.data the data from fb leter i need to get the order id from the res.data
    axios.post('/orders.json?auth=' + token, orderData)
    .then(res => dispatch(purchaseBurgerSuccess( res.data.name, orderData )))
    .catch(error => dispatch(purchaseBurgerFild(error)) )

   }

}

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    }
}





export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders
    }
}



export const fetchOrdersFild = (error) => {
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionType.FETCH_ORDERS_START
    }
}

export const fetchOrders =  (token , userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"')
        .then(res=>{
            const fetchOrders = []
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                }) 
            }
           dispatch(fetchOrdersSuccess(fetchOrders))
            
        })
        .catch(err=>{
            dispatch(fetchOrdersFild(err)) 
        })
    }
}

