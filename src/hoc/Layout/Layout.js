import React from 'react'
import { connect } from 'react-redux'

import Aux from '../Hux/Hux'

import Classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component{
    state = {
        showSideDrawer : false
    }
    
    sideDrawerClosedHandler=()=>{
     this.setState({showSideDrawer: false})  

    }

    sideDrawerToggleHandler=()=>{
     //if we use state inside setstate we should put every thing inside function and passing (this.state) like argement
     //and this the clean way to passing state depents on old state
     //this setstate call in sideDrawerClosedHandler also so we can toggle it   
        this.setState((prevState)=>{
         return   {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render(){
        return(
         <Aux>

            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuth}
            />
            <SideDrawer open={this.state.showSideDrawer} 
            isAuth={this.props.isAuth}
            closed={this.sideDrawerClosedHandler} />
            <main className={Classes.Content}>
                {this.props.children}
            </main>

        </Aux>
        )
    }


}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
       
    }
}



export default connect(mapStateToProps)(Layout);
