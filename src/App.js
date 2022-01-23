import React, {useEffect, useRef} from 'react';
import './App.css';

function App() {

  const paypal = useRef()

  useEffect(()=>{
      window.paypal.Buttons({

        // Sets up the transaction when a payment button is clicked
        createOrder: function(data, actions) {
          return actions.order.create({
            intent:"CAPTURE",
            purchase_units: [{
              description: "Buy Sysenso Products",
              amount: {
                currency_code: "USD",
                value: '77.44' 
              }
            }],
            items: [
              {
                "name": "First Product Name", /* Shows within upper-right dropdown during payment approval */
                "description": "Optional descriptive text..", /* Item details will also be in the completed paypal.com transaction view */
                "unit_amount": {
                  "currency_code": "USD",
                  "value": "50"
                },
                "quantity": "2"
              },
            ]
          });
        },
    
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(orderData) {
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                var transaction = orderData.purchase_units[0].payments.captures[0];
                alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
  
          });
        
        },
        OnError: function(err){
          console.log(err);
        }
      }).render(paypal.current);
  });

  return (
    <div className="App">
      <div className="PaymentOption" ref={paypal}></div>  
    </div>
  );
}

export default App;
