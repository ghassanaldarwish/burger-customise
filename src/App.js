import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from './store/actions/index'
import Layout from './hoc/Layout/Layout'

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import ShoppingSuccess from './components/ShoppingSucces/ShoppingSucces'


class App extends Component {
 
  componentDidMount() {
    this.props.authCheckState()
  }

  render() {

    let routes = (
             <Switch>
              <Route path='/auth' component={Auth}/>
              <Route path='/' exact component={BurgerBuilder}/>
              <Redirect to='/' />
            </Switch>
      
    )

    if (this.props.isAuth)
    {
      routes = (
            <Switch>
                <Route path='/checkout' component={Checkout}/>
                <Route path='/orders' component={Orders}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/auth' component={Auth}/>
                
                <Route path='/' exact component={BurgerBuilder}/>
                {this.props.success ? <Route path='/shopping-success' component={ShoppingSuccess}/> : null}
                {this.props.success ? <Redirect to='/shopping-success' /> : <Redirect to='/' />}
                
              </Switch>
        
      )
    }

    return (
      <div>
         <Layout>
           
              {routes}
            
            
           
         
         
         </Layout>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
      isAuth: state.auth.token !== null,
      success: state.orders.success,
      purchased: state.orders.purchased
      
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));
