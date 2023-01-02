const Manufacturer = require("../models/manufacturer");

// Display list of all Manufacturers.
exports.manufacturer_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Manufacturer list");
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