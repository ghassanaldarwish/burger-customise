import React from 'react'

import Aux from '../../hoc/Hux/Hux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import Ordersummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import  withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionType from '../../store/actions'
import { connect } from 'react-redux'




class BurgerBuilder extends React.Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        console.log(this.props)
        // axios.get('https://my-burger-c1179.firebaseio.com/ingredients.json')
        // .then(res =>{
        //    this.setState({ingredients: res.data})
        //    // make the button active in controls if the is ingredens comming from DB
        //    let sumIng=Object.values(res.data).reduce((sum,i)=>sum+i)
        //    console.log(sumIng)
        //    if(sumIng > 0){
        //        this.setState({purchaseable: true})
        //    }
            
        // })
        // .catch(err=>{
        //     this.setState({error: true})
        // })
    }
    //this function run just when we update (addIngredientHandler or removeIngredientHandler) never pass it to buildcontrolls jsst we pass purchaseable
   
    purchaseHandler = () => {

        this.setState({ purchasing: true })
    }

    purchaseCencelHandler =() => {
        this.setState({ purchasing: false})
    }

    purchasecontinueHandler= () =>{
  
        const queryParams=[]
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])) 
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString=queryParams.join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }


    render() {
        let purchaseable = Object.values(this.props.ings).reduce( ( sum, i ) => sum + i ) > 0
      
        // {salad: true, meat: false, ......}
        const disabledInfo = { ...this.props.ings }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        console.log(disabledInfo)

         let ordersummary=null
        let burger=this.state.error?<p>The page can't be loaded!</p> :<Spinner />

       if(this.props.ings) {
            burger=( 
            <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                ingredientAdded={this.props.addIngredientHandler}
                ingredientremoved={this.props.removeIngredientHandler}
                disabled={disabledInfo}
                purchaseable={purchaseable}
                price={this.props.price}
                ordered={this.purchaseHandler}
                     />
            </Aux>
           );
           ordersummary= <Ordersummary ingredients={this.props.ings}
           purchaseCanceled={this.purchaseCencelHandler}
           purchaseContinued={this.purchasecontinueHandler}
           price={this.props.price}
           />
    
           }
           if (this.state.loading){
            ordersummary= <Spinner />
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
    ings: state.ingredients ,
    price: state.totalPrice
}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingName) => dispatch({type:actionType.ADD_INGREDIENT, payload: ingName }),
        removeIngredientHandler: (ingName) => dispatch({type:actionType.REMOVE_INGREDIENT, payload: ingName })   
    }
}


export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder,axios))
