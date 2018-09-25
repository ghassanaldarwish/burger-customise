import React, { Component } from 'react';
import classesStyle from './Input.css'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
   
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      margin: {
        margin: theme.spacing.unit,
      },
      withoutLabel: {
        marginTop: theme.spacing.unit * 3,
      }
     
  });

class input extends Component {




    render() {
        const { classes } = this.props;
        let inputElement=null
        const inputClasses =[classesStyle.InputElement]
        // let err = null

        // if(this.props.invalid && this.props.shouldValidate && this.props.touched ){
        //     // inputClasses.push(classesStyle.invalid)
        //     err = error
        // }

        switch(this.props.elementType){
            case ('input'):
                inputElement = 
                <FormControl fullWidth className={classes.margin}>
                <InputLabel >{this.props.elementConfig.label}</InputLabel>
                <Input
                  error={this.props.invalid && this.props.shouldValidate && this.props.touched}
                   
                    onChange={this.props.changed}
                    value={this.props.value}
                    {...this.props.elementConfig}
                    
                    />
                </FormControl>
                
                break
             case ('textarea'):
                inputElement = <textarea className={inputClasses.join(' ')}
                        onChange={this.props.changed}
                     value={this.props.value}
                     {...this.props.elementConfig}/>
                break
             case ('select'):
                inputElement = (

                    <FormControl fullWidth className={classes.margin}>
                    <TextField
                    select
                    label="deliveryMethod"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.props.value}
                    onChange={this.props.changed}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Method</InputAdornment>,
                    }}
                  >
                    {this.props.elementConfig.options.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                       {option.displayValue}
                      </MenuItem>
                    ))}

                  </TextField>
                  </FormControl>

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
            <div className={classesStyle.Input}>
              
              {inputElement}
            </div>
        );
    }
}

export default withStyles(styles)(input);


