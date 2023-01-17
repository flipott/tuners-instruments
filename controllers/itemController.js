const Item = require("../models/item");
const Manufacturer = require("../models/manufacturer");
const Category = require("../models/category")
const async = require("async");
const {  Schema } = require("mongoose");
const category = require("../models/category");
const manufacturer = require("../models/manufacturer");
const { render } = require("ejs");

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
// Main inventory page
exports.index = (req, res) => {
    async.parallel(
      {
         guitar_count(callback) {
          Item.find({category: '63c5fb7afd9d1b401351ed3e'}, callback);
        },
        bass_count(callback) {
          Item.find({category: '63c5fb7bfd9d1b401351ed41'}, callback);
        },
        percussion_count(callback) {
          Item.find({category: '63c5fb7bfd9d1b401351ed43'}, callback);
        },
        keys_count(callback) {
          Item.find({category: '63c5fb7bfd9d1b401351ed45'}, callback);
        },
        ampsfx_count(callback) {
          Item.find({category: '63c5fb7bfd9d1b401351ed47'}, callback);
        },
        recording_count(callback) {
          Item.find({category: '63c5fb7bfd9d1b401351ed49'}, callback);
        },
        accessories_count(callback) {
          Item.find({category: '63c5fb7bfd9d1b401351ed4b'}, callback);
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
    res.render("item_list", {list_items: sortedItems})
  }
  )
};

// Display detail page for a specific Item.
exports.item_detail = (req, res, next) => {
  async.parallel(
    {
      item_info(callback) {
        Item.find({_id: req.params.id}, callback).populate("category manufacturer");
      },
  },
  (err, item_details) => {
    console.log(item_details);
    if (err) {
      return next(err);
    }
    res.render("item_detail", {item_details: item_details.item_info[0]})
  }
  )
};

// Display Item create form on GET.
exports.item_create_get = (req, res) => {
  async.parallel(
    {
       categories(callback) {
        Category.find({}, callback).sort({name: 1});
      },
       manufacturers(callback) {
        Manufacturer.find({}, callback).sort({name: 1});
      },
    },
    (err, results) => {

      res.render("item_create", {manufacturers: results.manufacturers, categories: results.categories});
    }
  )
};

// Handle Item create on POST.
exports.item_create_post = (req, res, next) => {

// Check for new Manufacturer
  let formManufacturer = ""
  let formResultsId = null;

  if (req.body.manufacturer[1]) {
    const formattedName = formatStr(req.body.manufacturer[1]);
    const manufacturer = new Manufacturer({ name: formattedName });

    Manufacturer.findOne({name: formattedName}).exec((err, found) => {
      if (err) {
        return next(err);
      }
      if (found) {
        formManufacturer = found.name;
        formResultsId = found._id;
      } else {
        manufacturer.save((err, results) => {
          if (err) {
            return next(err);
          }
          formResultsId = results._id;
          formManufacturer = formattedName;
        })
      }
    })
  } else {
    formManufacturer = req.body.manufacturer[0];
  }

  async.series(
    {
      items(callback) {
        Item.find({}, callback);
      },
      category(callback) {
        Category.find({name: req.body.category}, callback);
      },
      manufacturer(callback) {
        req.body.manufacturer[0] && Manufacturer.find({name: formManufacturer}, callback);
        req.body.manufacturer[1] && Manufacturer.findOne({}, callback);
      },
    }, (err, results) => {

      if (err) {
        return next(err);
      }

      let manuRef = null;
      let itemExists = [false, ""];
      req.body.manufacturer[0] ? manuRef = results.manufacturer[0]._id : manuRef = formResultsId;

      results.items.forEach((item) => {
        if (item.name.toLowerCase() === req.body.name.toLowerCase()
            && JSON.stringify(item.category._id) === JSON.stringify(results.category[0]._id)
            && JSON.stringify(item.manufacturer._id) === JSON.stringify(manuRef)) {
            itemExists = [true, item.url];
        }
      })

      if (itemExists[0]) {
        res.redirect(itemExists[1]);
      } else {
        let itemdetail = {
          name: req.body.name,
          category: results.category[0]._id,
          manufacturer: manuRef,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock
        }
  
        let item = new Item(itemdetail);
      
        item.save(function (err, callback) {
          if (err) {
            return next(err);
          }
          console.log(callback);
          res.redirect(item.url);
        });
      }
    }
  )
};

// Display Item delete form on GET.
exports.item_delete_get = (req, res, next) => {
  async.parallel(
    {
      item(callback) {
        Item.findOne({_id: req.params.id}, callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("item_delete", {name: results.item.name});
    }
  );
};

// Handle Item delete on POST.
exports.item_delete_post = (req, res, next) => {
  Item.findOneAndDelete({_id: req.params.id}, (err, deleted) => {
    if (err) {
      return next(err);
    }
    res.redirect("/inventory/items");
  });
}

// Display Item update form on GET.
exports.item_update_get = (req, res, next) => {
  async.parallel(
    {
       categories(callback) {
        Category.find({}, callback).sort({name: 1});
      },
       manufacturers(callback) {
        Manufacturer.find({}, callback).sort({name: 1});
      },
       previousItem(callback) {
        Item.findOne({_id: req.params.id}, callback).populate("category manufacturer");
       }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("item_update", {previousItem: results.previousItem, categories: results.categories, manufacturers: results.manufacturers});
    }
  )
};

// Handle Item update on POST.
exports.item_update_post = (req, res, next) => {
 async.parallel(
  {
    category(callback) {
      Category.find({name: req.body.category}, callback);
    },
    manufacturer(callback) {
      Manufacturer.find({name: req.body.manufacturer}, callback);
    },
  },
  (err, results) => {
    if (err) {
      return next(err);
    }
    console.log(req.body.name);
    Item.findOneAndUpdate({_id: req.params.id}, {
      name: req.body.name,
      category: results.category[0]._id,
      manufacturer: results.manufacturer[0]._id,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock
     }, (err, result) => {
      if (err) {
        return next(err);
      };
      res.redirect(`/inventory/items/${req.params.id}`);
     });
  }
 );
}

exports.item_update_post = (req, res, next) => {

  // Check for new Manufacturer
    let formManufacturer = ""
    let formResultsId = null;
  
    if (req.body.manufacturer[1]) {
      const formattedName = formatStr(req.body.manufacturer[1]);
      const manufacturer = new Manufacturer({ name: formattedName });
  
      Manufacturer.findOne({name: formattedName}).exec((err, found) => {
        if (err) {
          return next(err);
        }
        if (found) {
          formManufacturer = found.name;
          formResultsId = found._id;
        } else {
          manufacturer.save((err, results) => {
            if (err) {
              return next(err);
            }
            formResultsId = results._id;
            formManufacturer = formattedName;
          })
        }
      })
    } else {
      formManufacturer = req.body.manufacturer[0];
    }
  
    async.series(
      {
        items(callback) {
          Item.find({}, callback);
        },
        category(callback) {
          Category.find({name: req.body.category}, callback);
        },
        manufacturer(callback) {
          req.body.manufacturer[0] && Manufacturer.find({name: formManufacturer}, callback);
          req.body.manufacturer[1] && Manufacturer.findOne({}, callback);
        },
      }, (err, results) => {
  
        if (err) {
          return next(err);
        }
  
        let manuRef = null;
        let itemExists = [false, ""];
        req.body.manufacturer[0] ? manuRef = results.manufacturer[0]._id : manuRef = formResultsId;
  
        results.items.forEach((item) => {
          if (item.name.toLowerCase() === req.body.name.toLowerCase()
              && JSON.stringify(item.category._id) === JSON.stringify(results.category[0]._id)
              && JSON.stringify(item.manufacturer._id) === JSON.stringify(manuRef)) {
              itemExists = [true, item.url];
          }
        })
  
        if (itemExists[0]) {
          res.redirect(itemExists[1]);
        } else {
          Item.findOneAndUpdate({_id: req.params.id}, {
            name: req.body.name,
            category: results.category[0]._id,
            manufacturer: manuRef,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock
           }, (err, result) => {
            if (err) {
              return next(err);
            };
            res.redirect(`/inventory/items/${req.params.id}`);
           });
        }
      }
    )
  };