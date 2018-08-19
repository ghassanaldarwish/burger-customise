import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummury from '../../components/Order/CheckoutSummury/CheckoutSummury'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
    
class Checkout extends Component{
  
    checkoutCancelledHandler=()=>{
        this.props.history.goBack()
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data')

    }

    render(){
        return (
            <div>
                <CheckoutSummury
                onCheckoutCancelled={this.checkoutCancelledHandler}
                onCheckoutContinued={this.checkoutContinuedHandler}
                 ingredients={this.props.ings}/>
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout)