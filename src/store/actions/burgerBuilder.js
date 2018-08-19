import * as actionType from  './actionTypes'


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