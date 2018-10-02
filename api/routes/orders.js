const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handlng GET request to /orders'
    });
});


router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity:req.body.quantity
};
    res.status(200).json({
        message: 'Handling POST request to /orders',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id === 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
        });
    }
    else{
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});


router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Handling patch request to /orders'
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Handling delete request to /orders'
    });
});

module.exports = router;


