import React from 'react'

//we shold import the img to the js file then we can use it 
import burgerLogo from '../../assets/burger-logo.png'
import classes from './Logo.css'
const logo=(props)=>(
    <div className={classes.Logo}>
        <img  src={burgerLogo} alt="burger logo" />
    </div>
)

export default logo