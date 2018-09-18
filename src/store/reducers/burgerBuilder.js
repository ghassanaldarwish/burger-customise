import * as actionType from '../actions/actionTypes'

const initState ={
    ingredients:null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    salami: 0.7
}


const reducer = (state = initState, action) => {

    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                building: true,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload] 

            }

         case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                building: true,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload] 

            }

        case actionType.INGREDIENT_FETCHED:
        // re orgnize the ingredients
           return {
                ...state,
                building: false,
                ingredients:{
                    salad: action.ingredients.salad,
                    salami: action.ingredients.salami,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.salad

                    
                    },
                error: false,
                totalPrice: 4

            }

         case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                 ...state,
                    error: true 
             }

         default:
            return state

    }

    // return state

}


export default reducer