import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'
// import Input from '../../components/UI/Input/Input'
//  import Button from '../../components/UI/Button/Button'

// import classes from './Auth.css'
import Spinner from '../../components/UI/Spinner/Spinner'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


class Auth extends Component {
    state = {
        controls: {
            email: {
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
            password: {
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

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
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

        this.setState({ controls: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)

    }


    switchToSignin = () => {
        this.setState({ isSignup: false })


    }

    switchToSignup = () => {
        this.setState({ isSignup: true })


    }


    render() {
        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let errorMessage = null
        if (this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>)
        }
        const { classes } = this.props;

        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">Sign in</Typography>
                        {this.props.isAuth ? <Redirect to={this.props.authRedirectPath} /> : null}

                        {this.props.loading ? <Spinner /> : <form className={classes.form} onSubmit={this.submitHandler}>
                            {errorMessage}
                            {formElementsArray.map(formElem => (



                                <FormControl key={formElem.id} margin="normal" required fullWidth>
                                    <InputLabel htmlFor={formElem.config.elementConfig.type}>{formElem.config.elementConfig.placeholder}</InputLabel>
                                    <Input   type={formElem.config.elementConfig.type} value={formElem.config.value} id={formElem.config.elementConfig.type} name={formElem.config.elementConfig.type} onChange={(event) => this.inputChangedHandler(event, formElem.id)} />
                                </FormControl>
                            ))}


                            <button  style={{ background: 'none', border: 'none',display: 'block', width: '100%' }}><Button fullWidth className={classes.submit} variant="contained" color="primary" onClick={this.switchToSignin} >Sign in</Button> </button>
                            <button style={{ background: 'none', border: 'none',display: 'block', width: '100%' }}><Button fullWidth className={classes.submit} variant="contained" color="secondary" onClick={this.switchToSignup}> Sign up</Button></button>
                        </form>}
                    </Paper>
                </div>
            </Fragment>
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


export default connect(mapStateToProps, actions)(withStyles(styles)(Auth))


// {/* <Input
// key={formElem.id}
// shouldValidate={formElem.config.validation}
// invalid={!formElem.config.valid}
// elementType={formElem.config.elementType}
// elementConfig={formElem.config.elementConfig}
// value={formElem.config.value}
// touched={formElem.config.touched}
// changed={(event) => this.inputChangedHandler(event, formElem.id)}

// /> */}



