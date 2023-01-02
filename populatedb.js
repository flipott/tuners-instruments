#! /usr/bin/env node
// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async')
const Item = require('./models/item')
const Category = require('./models/category')
const Manufacturer = require('./models/manufacturer')

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let items = []
let categories = []
let manufacturers = []

function categoryCreate(name, cb) {
  let category = new Category({name: name});

  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  }  );
}

function manufacturerCreate(name, cb) {
    let manufacturer = new Manufacturer({name: name});
  
    manufacturer.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Manufacturer: ' + manufacturer);
      manufcaturers.push(manufacturer);
      cb(null, manufacturer);
    }  );
  }

function itemCreate(name, category, manufacturer, description, price, stock, cb) {
  let itemdetail = {
    name: name,
    category: category,
    manufacturer: manufacturer,
    description: description,
    price: price,
    stock: stock
  }

  let item = new Item(itemdetail);    

  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }  );
}

function createCategories(cb) {
    async.series([
        function(cb) {
            categoryCreate('Guitars', cb);
        },
        function(cb) {
            categoryCreate('Basses', cb);
        },
        function(cb) {
            categoryCreate('Percussion', cb);
        },
        function(cb) {
            categoryCreate('Keys', cb);
        },
        function(cb) {
            categoryCreate('Amps/FX', cb);
        },
        function(cb) {
            categoryCreate('Recording', cb);
        },
        function(cb) {
            categoryCreate('Accessories', cb);
        },
    ], cb);
}

function createManufacturers(cb) {
    async.series([
        function(cb) {
            manufacturerCreate('Fender', cb);
        },
        function(cb) {
            manufacturerCreate('Zildjian', cb);
        },
        function(cb) {
            manufacturerCreate('Ludwig', cb);
        },
        function(cb) {
            manufacturerCreate('Dunlop', cb);
        },
        function(cb) {
            manufacturerCreate('Shure', cb);
        },
        function(cb) {
            manufacturerCreate('Electro-Harmonix', cb);
        },
        function(cb) {
            manufacturerCreate('Korg', cb);
        }
    ], cb);
}

function createItems(cb) {
    async.parallel([
        function(callback) {
            itemCreate("Player Telecaster Blue", categories[0], manufacturers[0], "Tele tradition updated with contemporary feel.", 849.99, 2, cb);
        },
        function(callback) {
            itemCreate("K Custom Dark Crash Cymbal 19in", categories[2], manufacturers[1], "Produces warm, rich sound that cuts through and sings out.", 414.99, 5, cb);
        },
        function(callback) {
            itemCreate("Breakbeats 4-Piece Shell Pack Blue Sparkle", categories[2], manufacturers[2], "Signature shell pack of Roots drummer, Questlove.", 549.99, 6, cb);
        },
        function(callback) {
            itemCreate("Nylon Max Grip Guitar Picks 12pc", categories[6], manufacturers[3], "A durable nylon pick that features Dunlop's cutting-edge Max Grip technology.", 2.99, 20, cb);
        },
        function(callback) {
            itemCreate("SM57 Dynamic Instrument Microphone", categories[5], manufacturers[4], "An industry standard for performance and recording.", 89.99, 12, cb);
        },
        function(callback) {
            itemCreate("Holy Grail Nano Reverb Pedal", categories[4], manufacturers[5], "A true space-saver with classic Holy Grail sounds.", 129.99, 4, cb);
        },
        function(callback) {
            itemCreate("MS-20 Mini Analog Monophonic Synth", categories[3], manufacturers[6], "History repeats itself, and that's a good thing.", 499.99, 8, cb);
        }
        ], cb);
}

async.series([
    createCategories,
    createManufacturers,
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Items: '+ items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



