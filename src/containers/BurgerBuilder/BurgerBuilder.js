import React from 'react'

import Aux from '../../hoc/Hux'

import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends React.Component{
    
    state={
        ingredients:{
            salad:1,
            meat:2,
            cheese:2,
            bacon:3
        }
    }

    render(){
        return (
            <Aux>
                <Burger  ingredients={this.state.ingredients}/>
                <p>Burger Controls</p>
            </Aux>
        )
    }
}
// ingredients is not same the prop in state it sjus name for prop to pass it

export default BurgerBuilder
