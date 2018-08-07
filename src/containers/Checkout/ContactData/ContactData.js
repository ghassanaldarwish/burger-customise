 import React, { Component } from 'react';
 import Button from '../../../components/UI/Button/Button'
 import classes from './ContactData.css'
 import axios from '../../../axios-orders'
 import Spinner from '../../../components/UI/Spinner/Spinner'
 import {withRouter} from 'react-router-dom'

class ContactData extends Component {
    state={
        name: '',
        email: '',
        adress:{
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler=(event)=>{
        event.preventDefault()
         this.setState({loading: true})
     const order={
         ingredients:this.props.ingredients,
         price:Number.parseFloat(this.props.price).toFixed(2),
         costomer:{
             name:'Ghassan',
             adress:{
                 street: 'Berliner str. 17',
                 city: 'Berlin'
             },
             email: 'ghassan@yahoo.com'
         },
         deliveryMethod: 'fastest'
     }
     axios.post('/orders.json',order)
     .then(res=>{
         this.setState({loading: false})
         this.props.history.push('/')
        })
     .catch(err=>{
          this.setState({loading: false})
     })

        console.log(this.props.ingredients)

    }

    render() {
        let form=(
            <form>
            <input type='text' name='name' placeholder='your name' />
            <input type='email' name='email' placeholder='your mail' />
            <input type='text' name='street' placeholder='street' />
            <input type='text' name='postal' placeholder='postal Code' />
            <Button
            clicked={this.orderHandler}
             btnType='Success'>ORDER</Button>
          </form>  
        )
        if(this.state.loading){
            form=<Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
               {form}
            </div>
        );
    }
}


export default withRouter(ContactData)

