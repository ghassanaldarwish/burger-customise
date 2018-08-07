import React, { Component } from 'react'

import CheckoutSummury from '../../components/Order/CheckoutSummury/CheckoutSummury'
    
class Checkout extends Component{
    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            salami:1
        }
    }
    render(){
        return (
            <div>
                <CheckoutSummury ingredients={this.state.ingredients}/>
            </div>
        )
    }
}


export default Checkout