const express = require("express");
const router = express.Router();


const GroceryShop = require('../../models/GroceryShop');


// @route GET api/shop/
// @description Get all shops
// @access Public
router.get('/', (req, res) => {
    GroceryShop.find()
        .then(shops => res.json(shops))
        .catch(err => res.status(404).json({shopsfound: 'No shops found'}));
})

// @route POST api/shop/
// @description Add shop
// @access Public
router.post('/', (req, res) => {
    GroceryShop.create(req.body)
        .then(shop => res.json({msg: 'Shop added successfully'}))
        .catch(err => res.status(400).json({error: 'Unable to add this shop', err:err}))
});

// @route DELETE api/shops/:id
// @description Delete Item by id
// @access Public
router.delete('/:id', (req, res) => {
    GroceryShop.findByIdAndRemove(req.params.id, req.body)
        .then(shop => res.json({msg: "Shop entry deleted successfully"}))
        .catch(err => res.status(404).json({error: "No such shop found"}))
});


module.exports = router;