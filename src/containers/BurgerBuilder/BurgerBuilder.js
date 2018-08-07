import React from 'react'

import Aux from '../../hoc/Hux/Hux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import Ordersummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import  withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    salami: 0.7
}

class BurgerBuilder extends React.Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable:false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('https://my-burger-c1179.firebaseio.com/ingredients.json')
        .then(res =>{
           this.setState({ingredients: res.data})
           // make the button active in controls if the is ingredens comming from DB
           let sumIng=Object.values(res.data).reduce((sum,i)=>sum+i)
           console.log(sumIng)
           if(sumIng > 0){
               this.setState({purchaseable: true})
           }
            
        })
        .catch(err=>{
            this.setState({error: true})
        })
    }
    //this function run just when we update (addIngredientHandler or removeIngredientHandler) never pass it to buildcontrolls jsst we pass purchaseable
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map((ingredientKey) => {
                return ingredients[ingredientKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({ purchaseable: sum > 0 })
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updateCount = oldCount + 1
        const updateIngredients = { ...this.state.ingredients }

        updateIngredients[type] = updateCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldprice = this.state.totalPrice
        const newPrice = oldprice + priceAddition
        this.setState({ totalPrice: newPrice, ingredients: updateIngredients })
        this.updatePurchaseState(updateIngredients)
    }


    removeIngredientHandler = (type) => {


        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1
        // ceate a copy from the orginal object this.state.ingredients 
        const updateIngredients = { ...this.state.ingredients }

        updateIngredients[type] = updateCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldprice = this.state.totalPrice
        const newPrice = oldprice - priceDeduction
        this.setState({ totalPrice: newPrice, ingredients: updateIngredients })
        this.updatePurchaseState(updateIngredients)

    }

    purchaseHandler = () => {

        this.setState({ purchasing: true })
    }

    purchaseCencelHandler =() => {
        this.setState({ purchasing: false})
    }

    purchasecontinueHandler= () =>{
     //   alert('we keep working on server side, will be a variable soon :)')
    //  this.setState({loading: true})
    //  const order={
    //      ingredients:this.state.ingredients,
    //      price:this.state.totalPrice,
    //      costomer:{
    //          name:'Ghassan',
    //          adress:{
    //              street: 'Berliner str. 17',
    //              city: 'Berlin'
    //          },
    //          email: 'ghassan@yahoo.com'
    //      },
    //      deliveryMethod: 'fastest'
    //  }
    //  axios.post('/orders.json',order)
    //  .then(res=>{
    //      this.setState({loading: false, purchasing: false})
    //     })
    //  .catch(err=>{
    //       this.setState({loading: false, purchasing: false})
    //  })
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
        // {salad: true, meat: false, ......}
        const disabledInfo = { ...this.state.ingredients }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        console.log(disabledInfo)

         let ordersummary=null
        let burger=this.state.error?<p>The page can't be loaded!</p> :<Spinner />

       if(this.state.ingredients) {
            burger=( 
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientremoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchaseable={this.state.purchaseable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler}
                     />
            </Aux>
           );
           ordersummary= <Ordersummary ingredients={this.state.ingredients}
           purchaseCanceled={this.purchaseCencelHandler}
           purchaseContinued={this.purchasecontinueHandler}
           price={this.state.totalPrice}
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

export default  withErrorHandler(BurgerBuilder,axios)
