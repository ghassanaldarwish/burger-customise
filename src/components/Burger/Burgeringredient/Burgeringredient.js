import React from 'react'

import PropTypes from 'prop-types' 
//roll validation

import classes from './Burgeringredient.css'

class Burgeringredient extends React.Component {

    render() {

        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (<div className={classes.BreadTop}>
                                  <div className={classes.Seeds1}></div>
                                  <div className={classes.Seeds2}></div>  
                              </div>);
                break;
            case ('meat'):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case ('salad'):
                ingredient = <div className={classes.Salad}></div>;
                break;
            case ('salami'):
                ingredient = <div className={classes.Salami}></div>;
                break;
            default:
            ingredient=null
            break;
        }
        return ingredient
    }
}

//make roll that type should be string and required
// to use this prop types validation we should useing classes
Burgeringredient.PropTypes={
   type: PropTypes.string.isRequired 
}


export default Burgeringredient