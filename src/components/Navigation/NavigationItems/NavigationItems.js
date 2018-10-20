import React from 'react'


import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems =(props)=>(
<ul className={classes.NavigationItems}>
   <NavigationItem link="/" active exact>Burger Builder</NavigationItem >

  {props.isAuth ? <NavigationItem  link="/orders">Orders</NavigationItem > : null}
   { !props.isAuth ? 
   <NavigationItem  link="/auth">Authntcation</NavigationItem >
    : <NavigationItem  link="/logout">Logout</NavigationItem >}
</ul>
)

export default navigationItems