import React from 'react'

import Aux from '../../../hoc/Hux/Hux'

import Button from '../../UI/Button/Button'



class Ordersummary extends React.Component {
    render(){

   
    const ingredientSummary = Object.keys(this.props.ingredients)
        .map((i) => {
            return (
                <li key={i}><span
                    style={{ textTransform: 'capitalize' }}
                >{i}</span>: {this.props.ingredients[i]}</li>)
        })



    console.log(this.props.ingredients)



    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)} €</strong></p>
            <p>continue to checkout? </p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )

}

}

export default Ordersummary