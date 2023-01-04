const Manufacturer = require("../models/manufacturer");
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
    console.log(sortedMans);
    res.render("manufacturer_list", {list_manufacturers: sortedMans})
  }
  )
};

// Display detail page for a specific Manufacturer.
exports.manufacturer_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Manufacturer detail: ${req.params.id}`);
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