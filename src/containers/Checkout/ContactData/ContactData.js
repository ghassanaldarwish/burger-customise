 import React, { Component } from 'react';
 import Button from '../../../components/UI/Button/Button'
 import classes from './ContactData.css'
 import axios from '../../../axios-orders'
 import Spinner from '../../../components/UI/Spinner/Spinner'
 import {withRouter} from 'react-router-dom'
 import Input from '../../../components/UI/Input/Input'
 import orderForm from '../../orderForm/orderForm'

class ContactData extends Component {
    state={
        orderForm,
        formIsValid: false,
        loading: false
    }

    orderHandler=( event ) => {
        event.preventDefault()
         this.setState({loading: true})
        const formData = {}

        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
        }

         const order={
         ingredients:this.props.ingredients,
         price:Number.parseFloat(this.props.price).toFixed(2),
         orderData: formData,
         time: new Date().toLocaleTimeString(),
         date: new Date().toLocaleDateString()

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

    checkValidtion(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }


        return isValid
    }

    inputChangedHandler(event, inputIdentifier){
      const  updatedOrderForm= {
          ...this.state.orderForm
      }
       const updatedFormElement   = {...updatedOrderForm[inputIdentifier]}
       updatedFormElement.value = event.target.value
       updatedFormElement.valid = this.checkValidtion(updatedFormElement.value,updatedFormElement.validation)
       updatedFormElement.touched = true
       updatedOrderForm[inputIdentifier] = updatedFormElement

      let formIsValid = true
      for(let inputIdentifier in updatedOrderForm){
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
      }

       this.setState({orderForm: updatedOrderForm, formIsValid})
       console.log(updatedOrderForm)

    }

    render() {
        const formElementsArray = []
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form=(
            <form onSubmit={this.orderHandler}>
           
            {formElementsArray.map(formElem=>(
               <Input 
                     key={formElem.id}
                     shouldValidate={formElem.config.validation}
                      invalid={!formElem.config.valid}
                      elementType={formElem.config.elementType}
                      elementConfig={formElem.config.elementConfig}
                      value={formElem.config.value} 
                      touched={formElem.config.touched}
                      changed={(event)=>this.inputChangedHandler(event, formElem.id)}
                      /> 
            ))}
            <Button
                disabled={!this.state.formIsValid}
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

