import React from 'react'

import Burger from '../../Burger/Burger'

import Button from '../../UI/Button/Button'
import classes from './CheckoutSummury.css'

const checkoutSummury= (props)=> {
    return (
        <div className={classes.CheckoutSummury}>
            <h1>We hope it test well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
                <Button
                clicked={props.onCheckoutCancelled}
                 btnType='Danger'
                 >CANCEL</Button>
                <Button
                clicked={props.onCheckoutContinued}
                 btnType='Success'
                 >CONTINUE</Button>
        </div>
    )
}


export default checkoutSummury