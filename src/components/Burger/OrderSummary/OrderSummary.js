import React from 'react'

import Aux from '../../../hoc/Hux'

import Button from '../../UI/Button/Button'



const ordersummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((i) => {
            return (
                <li key={i}><span
                    style={{ textTransform: 'capitalize' }}
                >{i}</span>: {props.ingredients[i]}</li>)
        })



    console.log(props.ingredients)



    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>continue to checkout? </p>
            <Button btnType="Danger">CANCEL</Button>
            <Button btnType="Success">CONTINUE</Button>
        </Aux>
    )

}

export default ordersummary