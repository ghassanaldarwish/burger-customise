import * as actionTypes from '../actions/actionTypes'

const initState = {
    orders: [],
    loading: false,
    purchased: false

}

  const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
             return {
                    ...state,
                    purchased: false
                    
                }
        case actionTypes.PURCHASE_BURGER_START:
             return {
                    ...state,
                    loading: true,
                    
                }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrders = {
                ...action.orderData,
                 id: action.orderId
                
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrders),
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
                
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
                
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                
            }

        default:
            return state
    }
}

export default reducer

