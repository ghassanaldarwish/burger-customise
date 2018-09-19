import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import Spinner from '../../components/UI/Spinner/Spinner'



 class Auth extends Component {
    state= {
        controls: {
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
             },
             password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password',
                
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
             }
        },
        isSignup: true
    }

    componentDidMount () {
        if(!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.setRedirectPath('/')
        }
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

  
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidtion(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        this.setState({ controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)

    }


     switchToSignin = () => {
        this.setState({ isSignup: false})
       
        
        }

     switchToSignup = () => {
        this.setState({ isSignup: true})
        
        
    }


    render() {
        const formElementsArray = []
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let errorMessage = null
        if(this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>)
        }

        return (
            <div className={classes.Auth}>
             {this.props.isAuth ? <Redirect to={this.props.authRedirectPath} /> : null}

                { this.props.loading ? <Spinner /> : <form onSubmit={this.submitHandler}>
                    {errorMessage}
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
                 <Button btnType='Success' clicked={this.switchToSignin}>Sign in</Button>
                 <Button btnType='Danger' clicked={this.switchToSignup}> Sign up</Button>
                </form>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
        
       
    }
}


export default connect(mapStateToProps, actions)(Auth)
