import React from 'react'

import Burger from '../../Burger/Burger'

// import Button from '../../UI/Button/Button'

import classesStyle from './CheckoutSummury.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

const checkoutSummury= (props)=> {
    const { classes } = props;
    return (
        <div className={classesStyle.CheckoutSummury}>
            <h1>We hope it test well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
                <Button
                onClick={props.onCheckoutCancelled}
                color="secondary"
                variant="contained"
                className={classes.button}
                 >CANCEL</Button>
                <Button
                onClick={props.onCheckoutContinued}
                color="primary"
                variant="contained"
                className={classes.button}
                 >CONTINUE</Button>
        </div>
    )
}


export default withStyles(styles)(checkoutSummury)