import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

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
        let summary = <Redirect to='/'/>
        
        if(this.props.ings) {
            const purchasedRedirect= this.props.purchased ? <Redirect to='/shopping-success'/> : null
            summary =  ( <div>
                {purchasedRedirect}
                <CheckoutSummury
                onCheckoutCancelled={this.checkoutCancelledHandler}
                onCheckoutContinued={this.checkoutContinuedHandler}
                ingredients={this.props.ings}/>
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>)
           
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    }
}


export default connect(mapStateToProps)(Checkout)