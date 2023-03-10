const Manufacturer = require("../models/manufacturer");
const Item = require("../models/item");
const async = require("async");
const {body, validationResult} = require("express-validator");

function formatStr(str) {

  let newStr = str;

  if (newStr.includes(`'`)) {
    newStr = newStr.replace(`'`, "");
  }

  if (!newStr.includes(" ") && !newStr.includes("-") && !newStr.includes("/")) {
    return newStr.charAt(0).toUpperCase() + newStr.slice(1).toLowerCase();
  } else if (newStr.includes(" ")) {
    const strArr = newStr.split(" ");
    let emptyArr = [];
    strArr.forEach((item) => emptyArr.push(item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()));
    return emptyArr.join(" ");
  } else if (newStr.includes("-")) {
    const strArr = newStr.split("-");
    let emptyArr = [];
    strArr.forEach((item) => emptyArr.push(item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()));
    return emptyArr.join("-");
  } else if (newStr.includes("/")) {
    const strArr = newStr.split("/");
    let emptyArr = [];
    strArr.forEach((item) => emptyArr.push(item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()));
    return emptyArr.join("/");
  }

  return str;
}

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
    let sortedItems = list_items.item_info;
    sortedItems.sort((a, b) => a.category.name.localeCompare(b.category.name))
    let filteredItems = sortedItems.filter((item) => item.manufacturer.name.toLowerCase() === req.params.name)
    res.render("manufacturer_detail", {list_items: filteredItems, manufacturer: req.params.name})
  }
  )
};

// Delete Manufacturer on POST.
exports.manufacturer_detail_post = (req, res, next) => {
  Manufacturer.findOneAndDelete({name: formatStr(req.params.name)}, (err, deleted) => {
    if (err) {
      return next(err);
    }
    res.redirect("/inventory");
  });
}

// Display Manufacturer create form on GET.
exports.manufacturer_create_get = (req, res) => {
  res.render("manufacturer_form");
};

// Handle Manufacturer create on POST.
exports.manufacturer_create_post = [
  body("name", "Manufacturer name required").trim().toLowerCase().isLength({ min: 2 }),
  (req, res, next) => {
    const errors = validationResult(req);
    const formattedName = formatStr(req.body.name);
    const manufacturer = new Manufacturer({ name: formattedName });
    if (!errors.isEmpty()) {
      res.render("manufacturer_form", {
        manufacturer,
        errors: errors.array(),
      });
      return;
    } else {
      Manufacturer.findOne({name: formattedName}).exec((err, found) => {
        if (err) {
          return next(err);
        }
        if (found) {
          res.redirect(found.url);
        } else {
          manufacturer.save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect(manufacturer.url);
          });
        }
      });
    }
  }
];

// Display Manufacturer update form on GET.
exports.manufacturer_update_get = (req, res) => {
  res.render("manufacturer_update", {manufacturer: req.params.name});
};

// Handle Manufacturer update on POST.
exports.manufacturer_update_post = (req, res, next) => {
  Manufacturer.findOne({name: formatStr(req.body.name)}).exec((err, found) => {
    if (err) {
      return next(err);
    }
    if (found) {
      res.redirect(found.url);
    } else {
      Manufacturer.updateMany({name: formatStr(req.params.name)}, {name: formatStr(req.body.name)}).exec((err, found) => {
      res.redirect(`/inventory/manufacturers`)
      })
    }
  })
}