const Manufacturer = require("../models/manufacturer");
const Item = require("../models/item");
const async = require("async");

// Display list of all Manufacturers.
exports.manufacturer_list = (req, res, next) => {
  async.parallel(
    {
      manufacturer_info(callback) {
        Manufacturer.find({}, callback).populate("name");
      },
  },
  (err, manufacturer_list) => {
    if (err) {
      return next(err);
    }
    let sortedMans = manufacturer_list.manufacturer_info;
    sortedMans.sort((a, b) => a.name.localeCompare(b.name))
    res.render("manufacturer_list", {list_manufacturers: sortedMans})
  }
  )
};

// List all items for a specific Manufacturer.
exports.manufacturer_detail = (req, res, next) => {
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
    let filteredItems = sortedItems.filter((item) => item.manufacturer.name.toLowerCase() === req.params.name)
    res.render("manufacturer_detail", {list_items: filteredItems, manufacturer: req.params.name})
  }
  )
};

// Display Manufacturer create form on GET.
exports.manufacturer_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Manufacturer create GET");
};

// Handle Manufacturer create on POST.
exports.manufacturer_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Manufacturer create POST");
};

// Display Manufacturer delete form on GET.
exports.manufacturer_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Manufacturer delete GET");
};

// Handle Manufacturer delete on POST.
exports.manufacturer_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Manufacturer delete POST");
};

// Display Manufacturer update form on GET.
exports.manufacturer_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Manufacturer update GET");
};

// Handle Manufacturer update on POST.
exports.manufacturer_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Manufacturer update POST");
};