const express = require("express");
const router = express.Router();

// Require controller modules.
const item_controller = require("../controllers/itemController");
const category_controller = require("../controllers/categoryController");
const manufacturer_controller = require("../controllers/manufacturerController");

/// ITEM ROUTES ///

// GET catalog home page.
router.get("/", item_controller.index);

// GET request for creating a Item. NOTE This must come before routes that display Item (uses id).
router.get("/items/create", item_controller.item_create_get);

// POST request for creating Item.
router.post("/items/create", item_controller.item_create_post);

// GET request to delete Item.
router.get("/items/:id/delete", item_controller.item_delete_get);

// POST request to delete Item.
router.post("/items/:id/delete", item_controller.item_delete_post);

// GET request to update Item.
router.get("/items/:id/update", item_controller.item_update_get);

// POST request to update Item.
router.post("/items/:id/update", item_controller.item_update_post);

// GET request for one Item.
router.get("/items/:id", item_controller.item_detail);

// GET request for list of all Items.
router.get("/items", item_controller.item_list);

/// CATEGORY ROUTES ///

// GET request for creating a Category.
router.get("/category/create", category_controller.category_create_get);

// POST request for creating Category.
router.post("/category/create", category_controller.category_create_post);

// GET request to delete Category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request to delete Category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request to update Category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update Category.
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one Category.
router.get("/category/:name", category_controller.category_detail);

// GET request for list of all Categorys.
router.get("/categories", category_controller.category_list);

/// MANUFACTURER ROUTES ///

// GET request for creating a Manufacturer.
router.get("/manufacturer/create", manufacturer_controller.manufacturer_create_get);

// POST request for creating Manufacturer.
router.post("/manufacturer/create", manufacturer_controller.manufacturer_create_post);

// GET request to delete Manufacturer.
router.get("/manufacturer/:id/delete", manufacturer_controller.manufacturer_delete_get);

// POST request to delete Manufacturer.
router.post("/manufacturer/:id/delete", manufacturer_controller.manufacturer_delete_post);

// GET request to update Manufacturer.
router.get("/manufacturer/:id/update", manufacturer_controller.manufacturer_update_get);

// POST request to update Manufacturer.
router.post("/manufacturer/:id/update", manufacturer_controller.manufacturer_update_post);

// GET request for one Manufacturer.
router.get("/manufacturer/:name", manufacturer_controller.manufacturer_detail);

// POST request for one Manufacturer.
router.post("/manufacturer/:name", manufacturer_controller.manufacturer_detail_post);


// GET request for list of all Manufacturers.
router.get("/manufacturers", manufacturer_controller.manufacturer_list);

module.exports = router;