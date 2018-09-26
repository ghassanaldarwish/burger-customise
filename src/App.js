import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { spring, AnimatedSwitch } from 'react-router-transition'
import { connect } from 'react-redux'

import * as actions from './store/actions/index'
import Layout from './hoc/Layout/Layout'
import classes from './App.css'

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import ShoppingSuccess from './components/ShoppingSucces/ShoppingSucces'

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
   
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

class App extends Component {
 
  componentDidMount() {
    this.props.authCheckState()
  }

  render() {

    let routes = (
      <AnimatedSwitch
      atEnter={bounceTransition.atEnter}
      atLeave={bounceTransition.atLeave}
      atActive={bounceTransition.atActive}
      mapStyles={mapStyles}
      className={classes.switchWrapper}
    >
              <Route path='/auth' component={Auth}/>
              <Route path='/' exact component={BurgerBuilder}/>
              <Redirect to='/' />
        </AnimatedSwitch>
      
    )

    if (this.props.isAuth)
    {
      routes = (
        <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className={classes.switchWrapper}
      >
                <Route path='/checkout' component={Checkout}/>
                <Route path='/orders' component={Orders}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/auth' component={Auth}/>
                
                <Route path='/' exact component={BurgerBuilder}/>
                {this.props.success ? <Route path='/shopping-success' component={ShoppingSuccess}/> : null}
                {this.props.success ? <Redirect to='/shopping-success' /> : <Redirect to='/' />}
                
                </AnimatedSwitch>
        
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
