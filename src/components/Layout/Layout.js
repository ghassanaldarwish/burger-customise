import React from 'react'

import Aux from '../../hoc/Hux'

import Classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

class Layout extends React.Component{

    render(){
        return(
         <Aux>

            <Toolbar />

            <main className={Classes.Content}>
                {this.props.children}
            </main>

        </Aux>
        )
    }


}
export default Layout