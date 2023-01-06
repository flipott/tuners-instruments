const Category = require("../models/category");
const Item = require("../models/item");
const async = require("async");

// Display list of all Categories.
exports.category_list = (req, res, next) => {
  async.parallel(
    {
      category_info(callback) {
        Category.find({}, callback).populate("name");
      },
  },
  (err, category_list) => {
    if (err) {
      return next(err);
    }
    let sortedCats = category_list.category_info;
    sortedCats.sort((a, b) => a.name.localeCompare(b.name))
    res.render("category_list", {list_categories: sortedCats})
  }
  )
};

// List all items for a specific Category.
exports.category_detail = (req, res, next) => {
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
    let sortedItems = list_items.item_info;
    sortedItems.sort((a, b) => a.category.name.localeCompare(b.category.name))
    let filteredItems = sortedItems.filter((item) => item.category.name.toLowerCase() === req.params.name);
    res.render("category_detail", {list_items: filteredItems, category: req.params.name})
  }
  )
};

// Display Category create form on GET.
exports.category_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Category create GET");
};

// Handle Category create on POST.
exports.category_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Category create POST");
};

// Display Category delete form on GET.
exports.category_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Category delete GET");
};

// Handle Category delete on POST.
exports.category_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Category delete POST");
};

// Display Category update form on GET.
exports.category_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Category update GET");
};

// Handle Category update on POST.
exports.category_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Category update POST");
};