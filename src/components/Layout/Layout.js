import React from 'react'

import Aux from '../../hoc/Hux'


class Layout extends React.Component{

    render(){
        return(
         <Aux>

            <div> toolbar , sideDrawer ,backdrop</div>

            <main>
                {this.props.children}
            </main>

        </Aux>
        )
    }


}
export default Layout