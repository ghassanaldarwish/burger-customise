import React from 'react'


import classes from './BuildControls.css'

import BuildControl from './BuildControl/BuildControl'


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Salami', type: 'salami' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

class BuildControls  extends React.Component {
   

    render() {
        return (
            <div className={classes.BuildControls}>
         
                <p>Current Price: <strong>{this.props.price.toFixed(2)} €</strong></p>
                {controls.map((i) => (
                    <BuildControl key={i.label}
                        label={i.label}
                        added={() => this.props.ingredientAdded(i.type)}
                        removed={() => this.props.ingredientremoved(i.type)}
                        disabled={this.props.disabled[i.type]} />
                ))}
                <button className={classes.OrderButton}
                    disabled={!this.props.purchaseable}
                    onClick={this.props.ordered} 
                    >{this.props.isAuth ?'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        
                
        
        
            </div>
        )
    }
}

 

export default BuildControls