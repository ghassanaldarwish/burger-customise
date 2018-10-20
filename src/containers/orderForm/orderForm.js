   const orderForm={
             name:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                         label: 'Your Name',
                    
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                 },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Street',
                
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
                  },
           zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'ZIP Code',
                
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
                  },
           city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'City',
                    autoComplete:"off"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
                  },
           country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Country',
                    autoComplete:"off"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
                  },
         
          deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'standard', displayValue: 'Standard'},
                        {value: 'fastest', displayValue: 'Fastest'}
                                
                    ]
                },
                validation: {},
                valid: true,
                
                value: 'Standard'
            } 
}

export default orderForm
