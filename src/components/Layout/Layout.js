import React from 'react'

import Aux from '../../hoc/Hux'

import Classes from './Layout.css'

class Layout extends React.Component{

    render(){
        return(
         <Aux>

            <div> toolbar , sideDrawer ,backdrop</div>

            <main className={Classes.Content}>
                {this.props.children}
            </main>

        </Aux>
        )
    }


}
export default Layout