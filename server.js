const express = require('express');

const paypal = require('paypal-rest-sdk');

const ejs = require('ejs');

const axios =require ('axios')




const app = express();


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Ac9IWWjP86I5jgeR_bG-Rc-RzOacoY0khJwRDREqzro1mdEgFwgGInof3t8FTIlWmo0a16-weBifOSM5',
  'client_secret': 'EMyhEh-qXv8nk1Q5WWkjg1VcKTgeBpRZf2TneHB9pXcXqoeSI6GqUInIQXykxw0ajyPtfZDBRjgG95dM'
});

app.set('view engine', 'ejs')

// app.get('/res', (req, res) => {
//     axios.get('http://localhost:5000/p')
//     .then(resp=>res.json(resp.data))
   
// })


app.post('/api', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:5000/return",
        "cancel_url": "http://localhost:5000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "burger",
                "sku": "item",
                "price": "6.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "6.00"
        },
        "description": "This is the payment for burger."
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment.links[1].href);
        res.redirect(payment.links[1].href)
    }
    app.get('/return', (req, res) => {
        res.redirect('http://localhost:3000/')
    })
  });

});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);





