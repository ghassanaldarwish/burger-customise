import React from 'react'

import Aux from '../../hoc/Hux/Hux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import Ordersummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import  withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'




class BurgerBuilder extends React.Component {

    state = {
        purchaseable: false
     
    }

    componentDidMount(){
        console.log(this.props)
        this.props.onFetchIngredient()
     
    }
    //this function run just when we update (addIngredientHandler or removeIngredientHandler) never pass it to buildcontrolls jsst we pass purchaseable
   
    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true })
        } else {
            this.props.setRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    purchaseCencelHandler =() => {
        this.setState({ purchasing: false})
    }

    purchasecontinueHandler= () =>{
        this.props.onPurchaseInit()
        this.props.history.push('/checkout')
    }

    purchaseableHandler= () =>{
      return  Object.values(this.props.ings).reduce( ( sum, i ) => sum + i ) > 0
    }


    render() {
      //  let purchaseable = Object.values(this.props.ings).reduce( ( sum, i ) => sum + i ) > 0
      
        // {salad: true, meat: false, ......}
        const disabledInfo = { ...this.props.ings }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        console.log(disabledInfo)

         let ordersummary=null
        let burger=this.props.error?<p>The page can't be loaded!</p> :<Spinner />

       if(this.props.ings) {
            burger=( 
            <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                ingredientAdded={this.props.addIngredientHandler}
                ingredientremoved={this.props.removeIngredientHandler}
                disabled={disabledInfo}
                purchaseable={this.purchaseableHandler()}
                price={this.props.price}
                ordered={this.purchaseHandler}
                isAuth={this.props.isAuth}
                     />
            </Aux>
           );
           ordersummary= <Ordersummary ingredients={this.props.ings}
           purchaseCanceled={this.purchaseCencelHandler}
           purchaseContinued={this.purchasecontinueHandler}
           price={this.props.price}
           />
    
           }
      
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCencelHandler}>
                    {ordersummary}
                </Modal>
               {burger}
            </Aux>
        )
    }
}
// ingredients is not same the prop in state it just name for prop to pass it

const mapStateToProps =(state) => {
   return {
    ings: state.burgerBuilder.ingredients ,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingName) => dispatch(actions.addIngredient(ingName)),
        removeIngredientHandler: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onFetchIngredient: () => dispatch(actions.ingredientFetched()),
        onPurchaseInit:() => dispatch(actions.purchaseInit()),  
        setRedirectPath:(path) => dispatch(actions.setRedirectPath(path)) 


    }
}


export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder,axios))
