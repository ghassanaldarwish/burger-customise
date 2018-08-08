import React, { Component } from 'react';
import calsses from './Order.css'


class Order extends Component {
   
    render() {

        console.log(this.props.ingredients)
        let ingredients=[]
        for(let key in this.props.ingredients){
            ingredients.push({
                name: key,
                amount: this.props.ingredients[key]
            })     
        }

        let ingredientsOutput=ingredients.map(ig=>{
         return  <span
         style={{
                textTransform: 'capitalize', 
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
          key={ig.name}> {ig.name} ({ig.amount}) </span>
        })


        return (
            <div className={calsses.Order}>
                <p style={{textAlign: 'center'}}><strong>{this.props.date}</strong></p>
                 <p style={{textAlign: 'center'}}>Locale Time:<strong>{this.props.time}</strong></p>
            
                 <p><strong>{this.props.orderData.name}</strong></p>
                 <p><strong>{this.props.orderData.street}</strong></p>
                 <p><strong>{this.props.orderData.zipCode} {this.props.orderData.city}</strong></p>
                 <p><strong>{this.props.orderData.country}</strong></p>
                
                 <p>Delivery Method: <strong>{this.props.deliveryMethod}</strong></p>
                 <p>Ingredients: {ingredientsOutput}</p>
                 <p>Price: <strong>EUR {this.props.price}</strong></p>
                
          </div>
        );
    }
}

export default Order;
