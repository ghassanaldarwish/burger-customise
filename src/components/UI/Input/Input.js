import React, { Component } from 'react';
import classes from './Input.css'

class Input extends Component {


    render() {
        let inputElement=null
        const inputClasses =[classes.InputElement]

        if(this.props.invalid && this.props.shouldValidate && this.props.touched ){
            inputClasses.push(classes.invalid)
        }

        switch(this.props.elementType){
            case ('input'):
                inputElement = <input  className={inputClasses.join(' ')}
                        onChange={this.props.changed}
                     value={this.props.value}
                     {...this.props.elementConfig}/>;
                break
             case ('textarea'):
                inputElement = <textarea className={inputClasses.join(' ')}
                        onChange={this.props.changed}
                     value={this.props.value}
                     {...this.props.elementConfig}/>
                break
             case ('select'):
                inputElement = (
                     <select className={inputClasses.join(' ')}
                            onChange={this.props.changed}
                     value={this.props.value}
                     >
                     {this.props.elementConfig.options.map(option => (
                          <option
                          key={option.value}
                           value={option.value}>
                             {option.displayValue}
                          </option>
                     ))}
                        
                     </select>
                     )
                break
            default :
                inputElement = <input  className={inputClasses.join(' ')}
                     value={this.props.value}
                            onChange={this.props.changed}
                     {...this.props.elementConfig}/>
                break
        }
        return (
            <div className={classes.Input}>
              <label className={classes.Label}>{this.props.label}</label> 
              {inputElement}
            </div>
        );
    }
}

export default Input;
