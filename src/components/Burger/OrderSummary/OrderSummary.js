import React from 'react'

import Aux from '../../../hoc/Hux'



const ordersummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map((i) => {
        return (
        <li key={i}><span
         style={{textTransform: 'capitalize'}}
         >{i}</span>: {props.ingredients[i]}</li>)
    })

    

    console.log(props.ingredients)
    


    return(
        <Aux>
        <h3>You Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>
           {ingredientSummary}
        </ul>
        <p>continue to checkout? </p>
    </Aux>
    )
    
}

export default ordersummary