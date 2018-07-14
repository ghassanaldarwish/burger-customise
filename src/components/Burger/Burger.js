import React from 'react'

import calsses from './Burger.css'

import Burgeringredient from './Burgeringredient/Burgeringredient'

class Burger extends React.Component{
    
    render(){

        const transformedIngredients= Object.keys(this.props.ingredients)
            .map((ingredientKey) => {
            return [...Array(this.props.ingredients[ingredientKey])]
            .map((_,index)=>{
              return  <Burgeringredient key={ingredientKey + index}
                      type={ingredientKey} /> 
            })
            })
        console.log(transformedIngredients);
        
        return (
           <div className={calsses.Burger}>
                <Burgeringredient type="bread-top" />
                {transformedIngredients}
                <Burgeringredient type="bread-bottom" />
           </div> 
        )
    }
}



export default Burger