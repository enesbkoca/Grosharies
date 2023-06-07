const express = require("express");
const router = express.Router();

// Load Grocery Item model

const GroceryItem = require('../../models/GroceryItem');

// @route GET api/items/test
// @description tests Item route
// @access Public
router.get('/test', (req, res) => res.send("book route testing"));

// @route GET api/items
// @description Get all Items
// @access Public
router.get('/', (req, res) => {
    GroceryItem.find()
        .then(items => res.json(items))
        .catch(err => res.status(404).json({itemsfound: 'No items found'}));
})

// @route GET api/items/:id
// @description Get single item by ID
// @access Public
router.get("/:id", (req, res) => {
    GroceryItem.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(404).json({itemfound: 'No item found'}));
})

// @route POST api/items
// @description add/save Item
// @access Public
router.post('/', (req, res) => {
    req.body.added_date = new Date();
    console.log(req.body)
    GroceryItem.create(req.body)
        .then(item => res.json({msg: 'Item added successfully'}))
        .catch(err => res.status(400).json({error: 'Unable to add this item', err:err}))
});

// @route PUT api/items/:id
// @description Update Item
// @access Public
router.put('/:id', (req, res) => {
    GroceryItem.findByIdAndUpdate(req.params.id, req.body)
        .then(item => res.json({msg: 'Item updated successfully'}))
        .catch(err => res.status(400).json({error: "Unable to update the item"}))
});

// @route DELETE api/items/:id
// @description Delete Item by id
// @access Public
router.delete('/:id', (req, res) => {
    GroceryItem.findByIdAndRemove(req.params.id, req.body)
        .then(book => res.json({msg: "Book entry deleted successfully"}))
        .catch(err => res.status(404).json({error: "No such book found"}))
});

module.exports = router;