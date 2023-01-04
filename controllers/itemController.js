const Item = require("../models/item");
const Category = require("../models/category")
const async = require("async");
const {  Schema } = require("mongoose");

// Main inventory page
exports.index = (req, res) => {
    async.parallel(
      {
         guitar_count(callback) {
          Item.find({category: '63b34d3766a73e71c8cf1c68'}, callback);
        },
        bass_count(callback) {
          Item.find({category: '63b34d3766a73e71c8cf1c6b'}, callback);
        },
        percussion_count(callback) {
          Item.find({category: '63b34d3866a73e71c8cf1c6d'}, callback);
        },
        keys_count(callback) {
          Item.find({category: '63b34d3866a73e71c8cf1c6f'}, callback);
        },
        ampsfx_count(callback) {
          Item.find({category: '63b34d3866a73e71c8cf1c71'}, callback);
        },
        recording_count(callback) {
          Item.find({category: '63b34d3866a73e71c8cf1c73'}, callback);
        },
        accessories_count(callback) {
          Item.find({category: '63b34d3866a73e71c8cf1c75'}, callback);
        },
      },
      (err, results) => {
        let guitar_count = 0;
        results.guitar_count.forEach((obj) => guitar_count += obj.stock);

        let bass_count = 0;
        results.bass_count.forEach((obj) => bass_count += obj.stock);

        let percussion_count = 0;
        results.percussion_count.forEach((obj) => percussion_count += obj.stock);

        let keys_count = 0;
        results.keys_count.forEach((obj) => keys_count += obj.stock);

        let ampsfx_count = 0;
        results.ampsfx_count.forEach((obj) => ampsfx_count += obj.stock);

        let recording_count = 0;
        results.recording_count.forEach((obj) => recording_count += obj.stock);

        let accessories_count = 0;
        results.accessories_count.forEach((obj) => accessories_count += obj.stock);

        const stockObj = {guitar: guitar_count, 
                          bass: bass_count,
                          percussion: percussion_count,
                          keys: keys_count,
                          ampsfx: ampsfx_count,
                          recording: recording_count,
                          accessories: accessories_count}
                          
        res.render("inventory", {stock: stockObj});
      }
    )
  };

// Display list of all Items.
exports.item_list = (req, res, next) => {
  // Item.find({});
  async.parallel(
    {
      item_info(callback) {
        Item.find({}, callback).populate("category manufacturer");
      },
  },
  (err, list_items) => {
    if (err) {
      return next(err);
    }
    console.log(list_items);
    let sortedItems = list_items.item_info;
    sortedItems.sort((a, b) => a.category.name.localeCompare(b.category.name))
    res.render("item_list", {list_items: sortedItems})
  }
  )
};

// Display detail page for a specific Item.
exports.item_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Item detail: ${req.params.id}`);
};

// Display Item create form on GET.
exports.item_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item create GET");
};

// Handle Item create on POST.
exports.item_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item create POST");
};

// Display Item delete form on GET.
exports.item_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
};

// Handle Item delete on POST.
exports.item_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
};

// Display Item update form on GET.
exports.item_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item update GET");
};

// Handle Item update on POST.
exports.item_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item update POST");
};