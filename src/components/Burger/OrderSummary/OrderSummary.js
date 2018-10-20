import React from 'react'

import Aux from '../../../hoc/Hux/Hux'

// import Button from '../../UI/Button/Button'
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

    const { classes } = this.props;

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)} €</strong></p>
            <p>continue to checkout? </p>
            <Button variant="contained" className={classes.button} color="secondary" onClick={this.props.purchaseCanceled}>CANCEL</Button>
            <Button variant="contained" className={classes.button} color="primary" onClick={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )

}

}

export default withStyles(styles)(Ordersummary)