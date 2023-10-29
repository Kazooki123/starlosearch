paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '20.07'
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Payment completed successfully!');
        });
    },
    onError: function(err) {
        console.error('An error occured', err);
    }
}).render('#paypal-button-container');