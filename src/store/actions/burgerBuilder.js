import * as actionType from  './actionTypes'
import axios from '../../axios-orders'


export const addIngredient = (ingName) =>{

return {
    type: actionType.ADD_INGREDIENT,
    payload: ingName
}

}


export const removeIngredient = (ingName) =>{
return { 
      type: actionType.REMOVE_INGREDIENT,
      payload: ingName
    
    }

}

export const setIngredient = (ingredients) => {

   
    return {
        type: actionType.INGREDIENT_FETCHED,
        ingredients: ingredients
    }
}

export const fetchIngredientFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
  
    }
}


export const ingredientFetched = () =>{
    return dispatch => { 
        
        axios.get('https://my-burger-c1179.firebaseio.com/ingredients.json')
        .then(res =>{
         dispatch(setIngredient(res.data))
     
        })
        .catch(err=>{
            dispatch(fetchIngredientFailed())
        })
            
        
        }
    
    }



