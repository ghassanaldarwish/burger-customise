import React from 'react'

import Aux from '../../hoc/Hux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7 
}

class BurgerBuilder extends React.Component{
    
    state={
        ingredients:{
            salad:0,
            meat:0,
            cheese:0,
            bacon:0
        },
        totalPrice: 4
    }

    addIngredientHandler=(type)=>{
         const oldCount=this.state.ingredients[type]  
         const updateCount=oldCount + 1
         const updateIngredients={...this.state.ingredients}

         updateIngredients[type] = updateCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldprice=this.state.totalPrice
        const newPrice = oldprice + priceAddition
        this.setState({totalPrice: newPrice,ingredients: updateIngredients})

    }


    removeIngredientHandler=(type)=>{
        
    }


    render(){
        return (
            <Aux>
                <Burger  ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                />
            </Aux>
        )
    }
}
// ingredients is not same the prop in state it sjus name for prop to pass it

export default BurgerBuilder
