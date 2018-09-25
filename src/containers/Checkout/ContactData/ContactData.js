import React, { Component } from 'react';
// import Button from '../../../components/UI/Button/Button'
import classesStyle from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { withRouter } from 'react-router-dom'
import Input from '../../../components/UI/Input/Input'
import orderForm from '../../orderForm/orderForm'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import PaypalExpressBtn from 'react-paypal-express-checkout';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


// to change button stayle fallow 
//https://developer.paypal.com/docs/checkout/how-to/customize-button/#customization-example

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class ContactData extends Component {
    state = {
        orderForm,
        formIsValid: false,
        saveData: false,
        cancelledPayment: false,
        errorPayment: false

    }

    orderHandler = (event) => {

        event.preventDefault()

        const formData = {}

        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: this.props.ings,
            price: Number.parseFloat(this.props.price).toFixed(2),
            orderData: formData,
            time: new Date().toLocaleTimeString('de-DE'),
            date: new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' }),
            userId: this.props.userId

        }


        this.props.onOrderBurger(order, this.props.token)
        this.setState({
            saveData: true
        })




    }

    checkValidtion(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    onSuccess = (payment) => {

        console.log("The payment was succeeded!", payment);
        if (payment) {
            this.props.shoppingSuccess()
            this.setState({ cancelledPayment: false, errorPayment: false })
        }

    }

    onCancel = (data) => {

        console.log('The payment was cancelled!', data);
        if (data) {
            this.setState({ cancelledPayment: true, errorPayment: false })
        }

    }

    onError = (err) => {

        console.log("Error!", err);

        if (err) {
            this.setState({ cancelledPayment: false, errorPayment: true })
        }

    }



    inputChangedHandler(event, inputIdentifier) {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidtion(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid })
        console.log(updatedOrderForm)

    }

    render() {

        const { classes } = this.props;

        let env = 'sandbox'; // you can set here to 'production' for production
        const client = {
            sandbox: 'Ac9IWWjP86I5jgeR_bG-Rc-RzOacoY0khJwRDREqzro1mdEgFwgGInof3t8FTIlWmo0a16-weBifOSM5',
            production: 'Ac9IWWjP86I5jgeR_bG-Rc-RzOacoY0khJwRDREqzro1mdEgFwgGInof3t8FTIlWmo0a16-weBifOSM5',
        }
        let style = {
            size: 'medium',
            color: 'blue',

            shape: 'pill',
            label: 'checkout',
            tagline: 'true'
        }

        const formElementsArray = []
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }



        let form = (
            <form onSubmit={this.props.success ? this.orderHandler : null} >

                {formElementsArray.map(formElem => (
                    <Input
                   
                   
                        key={formElem.id}
                        shouldValidate={formElem.config.validation}
                        invalid={!formElem.config.valid}
                        elementType={formElem.config.elementType}
                        elementConfig={formElem.config.elementConfig}
                        value={formElem.config.value}
                        touched={formElem.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElem.id)}
                    />
                ))}


                <button style={{ background: 'none', border: 'none' }}>
                    <Button
                        variant="outlined" color="primary" className={classes.button}
                        disabled={!this.props.success || !this.state.formIsValid}
                    >{this.props.success && this.state.formIsValid ? 'ORDER NOW' : this.state.formIsValid ? 'Checkout with PayPal First' : 'Your form is not Valid'}
                    </Button>
                </button>




            </form>
        )


        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classesStyle.ContactData}>
                <h4>Enter your Contact Data</h4>
                {this.state.cancelledPayment ? <h5>you cancelled the payment !! please checkout with paypal agine</h5> : null}
                {this.state.errorPayment ? <h5>we apologize there is somthing went wrong with payment  please try agine! or contact with us: phone:123456765 Email:burger-bulder@yahoo.com </h5> : null}
                {form}

                {this.props.success ? <p>YOUR PAYPAL PAYMENT SUCCESS</p>
                    : this.state.formIsValid ?
                        <PaypalExpressBtn
                            env={env}
                            client={client}
                            currency={'EUR'}
                            total={this.props.price}
                            onError={this.onError}
                            onSuccess={this.onSuccess}
                            onCancel={this.onCancel}
                            style={style}
                            locale={'de-DE'}
                        /> : <Button variant="outlined" className={classes.button} disabled >PayPal</Button>}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        success: state.orders.success
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
        shoppingSuccess: () => dispatch(actions.shoppingSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(withStyles(styles)(ContactData), axios)))


