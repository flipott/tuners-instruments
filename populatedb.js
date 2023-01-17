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


const populateManus = [
   "Gibson",   "Fender",   "Gretsch",   "Martin",   "Taylor",   "Yamaha",   "Squier",   "Schecter",   "Ibanez",   "Epiphone",   "Spector",   "Ernie Ball",   "Ludwig",   "DW",   "Alesis",   "Roland",   "PDP",   "Zildjian",   "Evans",   "Paiste",   "Meinl",   "Sabian ",   "Rhythm Tech",   "Latin Percussion",   "Remo",   "Nord",   "Arturia",   "Behringer",   "Korg",   "Moog",   "Akai",   "Novation",   "Boss",   "Marshall",   "Orange",   "TC Helicon",   "Warm Audio",   "Strymon",   "Keeley",   "Rode",   "Audio-Technica",   "AKG",   "Shure",   "Sennheiser",   "Audix",   "Mackie",   "JBL",   "DAddario",   "Pro Co",   "CMC",   "George LS",   "Apogee",   "SanDisk",   "Hosa",   "TC Electronic",   "Peterson",   "Dunlop",   "On-Stage"
]

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
      manufacturers.push(manufacturer);
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
            categoryCreate('Amps-FX', cb);
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
            manufacturerCreate('Gibson', cb);
        },
        function(cb) {
            manufacturerCreate('Fender', cb);
        },
        function(cb) {
            manufacturerCreate('Gretsch', cb);
        },
        function(cb) {
            manufacturerCreate('Martin', cb);
        },
        function(cb) {
            manufacturerCreate('Taylor', cb);
        },
        function(cb) {
            manufacturerCreate('Yamaha', cb);
        },
        function(cb) {
            manufacturerCreate('Squier', cb);
        },
        function(cb) {
            manufacturerCreate('Schecter', cb);
        },
        function(cb) {
            manufacturerCreate('Ibanez', cb);
        },
        function(cb) {
            manufacturerCreate('Epiphone', cb);
        },
        function(cb) {
            manufacturerCreate('Spector', cb);
        },
        function(cb) {
            manufacturerCreate('Ernie Ball', cb);
        },
        function(cb) {
            manufacturerCreate('Ludwig', cb);
        },
        function(cb) {
            manufacturerCreate('DW', cb);
        },
        function(cb) {
            manufacturerCreate('Alesis', cb);
        },
        function(cb) {
            manufacturerCreate('Roland', cb);
        },
        function(cb) {
            manufacturerCreate('PDP', cb);
        },
        function(cb) {
            manufacturerCreate('Zildjian', cb);
        },
        function(cb) {
            manufacturerCreate('Evans', cb);
        },
        function(cb) {
            manufacturerCreate('Paiste', cb);
        },
        function(cb) {
            manufacturerCreate('Meinl', cb);
        },
        function(cb) {
            manufacturerCreate('Sabian', cb);
        },
        function(cb) {
            manufacturerCreate('Rhythm Tech', cb);
        },
        function(cb) {
            manufacturerCreate('Latin Percussion', cb);
        },
        function(cb) {
            manufacturerCreate('Remo', cb);
        },
        function(cb) {
            manufacturerCreate('Nord', cb);
        },
        function(cb) {
            manufacturerCreate('Arturia', cb);
        },
        function(cb) {
            manufacturerCreate('Behringer', cb);
        },
        function(cb) {
            manufacturerCreate('Korg', cb);
        },
        function(cb) {
            manufacturerCreate('Moog', cb);
        },
        function(cb) {
            manufacturerCreate('Akai', cb);
        },
        function(cb) {
            manufacturerCreate('Novation', cb);
        },
        function(cb) {
            manufacturerCreate('Boss', cb);
        },
        function(cb) {
            manufacturerCreate('Marshall', cb);
        },
        function(cb) {
            manufacturerCreate('Orange', cb);
        },
        function(cb) {
            manufacturerCreate('TC Helicon', cb);
        },
        function(cb) {
            manufacturerCreate('Warm Audio', cb);
        },
        function(cb) {
            manufacturerCreate('Strymon', cb);
        },
        function(cb) {
            manufacturerCreate('Keeley', cb);
        },
        function(cb) {
            manufacturerCreate('Rode', cb);
        },
        function(cb) {
            manufacturerCreate('Audio-Technica', cb);
        },
        function(cb) {
            manufacturerCreate('AKG', cb);
        },
        function(cb) {
            manufacturerCreate('Shure', cb);
        },
        function(cb) {
            manufacturerCreate('Sennheiser', cb);
        },
        function(cb) {
            manufacturerCreate('Audix', cb);
        },
        function(cb) {
            manufacturerCreate('Mackie', cb);
        },
        function(cb) {
            manufacturerCreate('JBL', cb);
        },
        function(cb) {
            manufacturerCreate('Daddario', cb);
        },
        function(cb) {
            manufacturerCreate('Pro Co', cb);
        },
        function(cb) {
            manufacturerCreate('CMC', cb);
        },
        function(cb) {
            manufacturerCreate('George LS', cb);
        },
        function(cb) {
            manufacturerCreate('Apogee', cb);
        },
        function(cb) {
            manufacturerCreate('SanDisk', cb);
        },
        function(cb) {
            manufacturerCreate('Hosa', cb);
        },
        function(cb) {
            manufacturerCreate('TC Electronic', cb);
        },
        function(cb) {
            manufacturerCreate('Peterson', cb);
        },
        function(cb) {
            manufacturerCreate('Dunlop', cb);
        },
        function(cb) {
            manufacturerCreate('On-Stage', cb);
        },
    ], cb);

};

function createItems(cb) {
    async.series([
        function(cb) {
            itemCreate("Les Paul Standard 60s - Bourbon Burst", categories[0], manufacturers[0], "Solidbody Electric Guitar with Mahogany Body, Maple Top, Mahogany Neck, Rosewood Fingerboard, and 2 Humbucking Pickups - Bourbon Burst", 2799.99, 3, cb);
        },
        function(cb) {
            itemCreate("SG Standard 61 - Vintage Cherry", categories[0], manufacturers[0], "Solidbody Electric Guitar with Mahogany Body and Neck, Plek'd Rosewood Fretboard, and 2 Humbucking Pickups - Vintage Cherry", 849.99, 2, cb);
        },
        function(cb) {
            itemCreate("Breakbeats 4-Piece Shell Pack Blue Sparkle", categories[2], manufacturers[2], "Signature shell pack of Roots drummer, Questlove.", 549.99, 6, cb);
        },
        function(cb) {
            itemCreate("Player Stratocaster - Seafoam Green", categories[0], manufacturers[1], "Solidbody Electric Guitar with Alder Body, Roasted Maple Neck/Fingerboard, and 3 Single-coil Pickups - Seafoam Green", 849.99, 3, cb);
        },
        function(cb) {
            itemCreate("Kurt Cobain Jaguar - 3-Tone Sunburst", categories[0], manufacturers[1], "Solidbody Electric Guitar with Alder Body, Maple Neck, Bound Rosewood Fingerboard, 2 DiMarzio Humbucking Pickups, and Vintage Tremolo - 3-tone Sunburst", 1599.99, 1, cb);
        },
        function(cb) {
            itemCreate("Vintera 60s Jazzmaster Modified - 3-color Sunburst", categories[0], manufacturers[1], "Solidbody Electric Guitar with Alder Body, Maple Neck, Pau Ferro Fretboard, 2 Single-coil Pickups, and Tremolo - 3-color Sunburst", 1299.99, 5, cb);
        },
        function(cb) {
            itemCreate("G5222 Electromatic Double Jet BT - Ocean Turquoise", categories[0], manufacturers[2], "Solidbody Electric Guitar with Mahogany Body, Maple Top, Mahogany Neck, Laurel Fingerboard, and 2 Humbucking Pickups - Ocean Turquoise", 599.99, 4, cb);
        },
        function(cb) {
            itemCreate("Billy-Bo Jupiter Thunderbird", categories[0], manufacturers[0], "Solidbody Electric Guitar with Mahogany Body, Maple Top, Mahogany Neck, Rosewood Fingerboard, and 2 Humbucking Pickups - Firebird Red", 3199.99, 6, cb);
        },
        function(cb) {
            itemCreate("D-28 Acoustic Guitar - Natural", categories[0], manufacturers[3], "6-string Acoustic Guitar, Dreadnought, with Spruce Top, East Indian Rosewood Back and Sides, and Ebony Fingerboard - Natural", 3129.99, 1, cb);
        },
        function(cb) {
            itemCreate("Acoustic Hummingbird Deluxe - Rosewood Burst", categories[0], manufacturers[0], "6-string Acoustic-electric Guitar, with Sitka Spruce Top, Rosewood Back and Sides, Mahogany Neck, and Ebony Fretboard - Rosewood Burst", 5499.99, 2, cb);
        },
        function(cb) {
            itemCreate("SC-13E Acoustic-Electric Guitar - Natural", categories[0], manufacturers[3], "6-string Acoustic-electric Guitar with Spruce Top, Koa Fine Veneer Back and Sides, Select Hardwood Neck, and Ebony Fingerboard - Natural", 1599.99, 2, cb);
        },
        function(cb) {
            itemCreate("114ce - Natural Sitka Spruce", categories[0], manufacturers[4], "6-string Acoustic-electric Guitar with Solid Sitka Spruce Top, Layered Walnut Back and Sides, Maple Neck, and Ebony Fretboard - Matte Natural", 999.99, 5, cb);
        },
        function(cb) {
            itemCreate("FS800 Concert Acoustic Guitar - Natural", categories[0], manufacturers[5], "6-string Acoustic Guitar with Spruce Top, Laminate Back and Sides, Nato Neck, and Walnut Fingerboard - Natural", 219.99, 2, cb);
        },
        function(cb) {
            itemCreate("D-X1E Dreadnought Acoustic-Electric Guitar - Natural Mahogany", categories[0], manufacturers[4], "6-string Acoustic-electric Guitar with Figured Mahogany Pattern HPL Top, Back, and Sides; Birch Laminate Neck, and Richlite Fretboard", 599.99, 4, cb);
        },
        function(cb) {
            itemCreate("American Professional II Jazz Bass - 3 Color Sunburst with Rosewood Fingerboard", categories[1], manufacturers[1], "4-string Electric Bass with Alder Body, Maple Neck, Rosewood Fingerboard, and 2 Single-coil Pickups - 3-Color Sunburst", 1799.99, 6, cb);
        },
        function(cb) {
            itemCreate("Stiletto Extreme 4 Bass Guitar - Black Cherry", categories[1], manufacturers[7], "4-string Electric Bass with Mahogany Body, Figured Maple Top, Maple Neck, Rosewood Fingerboard, and 2 Humbucking Pickups - Black Cherry", 549.99, 2, cb);
        },
        function(cb) {
            itemCreate("Mini Precision Electric Bass - Black", categories[1], manufacturers[6], "4-string Electric Bass with Poplar Body, Maple Neck, Laurel Fingerboard, and Split Single-coil Pickup - Black", 199.99, 8, cb);
        },
        function(cb) {
            itemCreate("Gio GSR200SMNGT Bass Guitar - Natural Gray Burst", categories[1], manufacturers[8], "4-string Electric Bass Guitar with Poplar Body, Spalted Maple Top, Spalted Maple Neck, Jatoba Fretboard, 2 Single-coil Pickups, and Active Bass Boost - Natural Grey Burst", 299.99, 3, cb);
        },
        function(cb) {
            itemCreate("Player Mustang Bass PJ - Aged Natural", categories[1], manufacturers[1], "4-string Electric Bass with Alder Body, Maple Neck, Pau Ferro Fingerboard, and 2 Single-coil Pickups - Aged Natural", 899.99, 2, cb);
        },
        function(cb) {
            itemCreate("Holy Grail Nano Reverb Pedal", categories[4], manufacturers[5], "A true space-saver with classic Holy Grail sounds.", 129.99, 4, cb);
        },
        function(cb) {
            itemCreate("Viola Bass - Vintage Sunburst", categories[1], manufacturers[9], "4-string Electric Bass with Maple Body, Flame Maple Top, Maple Neck, Rosewood Fingerboard, and 2 Humbucking Pickups - Vintage Sunburst", 499.99, 1, cb);
        },
        function(cb) {
            itemCreate("Performer 4 Bass Guitar - Metallic Purple", categories[1], manufacturers[10], "4-string Bass with Nato Body, Maple Neck with Amara Fingerboard, and J/P Passive Pickups - Metallic Purple", 429.99, 3, cb);
        },
        function(cb) {
            itemCreate("Mikro GSRM20 Bass Guitar - Brown Sunburst", categories[1], manufacturers[8], "4-string Electric Bass with Poplar Body, Maple Neck, Jatoba Fingerboard, and 2 Single-coil Pickups - Brown Sunburst", 199.99, 6, cb);
        },
        function(cb) {
            itemCreate("American Professional II Jazz Bass - Olympic White with Rosewood Fingerboard", categories[1], manufacturers[1], "4-string Electric Bass with Alder Body, Maple Neck, Rosewood Fingerboard, and 2 Single-coil Pickups - Olympic White", 1799.99, 5, cb);
        },
        function(cb) {
            itemCreate("Player Jazz Bass - Tidepool with Maple Fingerboard", categories[1], manufacturers[1], "4-string Electric Bass with Alder Body, Maple Neck and Fingerboard, and 2 Single-coil Pickups - Tidepool", 899.99, 2, cb);
        },
        function(cb) {
            itemCreate("Music Man DarkRay Bass Guitar - Starry Night with Ebony Fingerboard", categories[1], manufacturers[11], "4-string Electric Bass with Select Hardwood Body, Maple Neck, Ebony Fingerboard, 1 Humbucking Pickup, and Custom Darkglass Electronics - Starry Night", 849.99, 1, cb);
        },
        function(cb) {
            itemCreate("Stage Custom Birch Shell Pack - Honey Amber", categories[2], manufacturers[5], "5-piece Drum Kit with 22 Kick, 16 Floor Tom, 12 and 10 Rack Toms, and 14 Snare - Honey Amber", 749.99, 5, cb);
        },
        function(cb) {
            itemCreate("Breakbeats 2022 4-piece Shell Pack with Snare Drum - Black Sparkle", categories[2], manufacturers[12], "4-pc Hardwood Shell Pack with 10 Tom, 13 Floor Tom, 16 Bass Drum, and 14 Snare, and Nylon Carrying Bags - Black Sparkle", 599.99, 10, cb);
        },
        function(cb) {
            itemCreate("Collector's Series FinishPly 4-piece Shell Pack - Pale Blue Oyster with Chrome Hardware", categories[2], manufacturers[13], "4-piece Shell Pack with 10 and 12 Rack Toms, 16 Floor Tom, and 22 Bass Drum - Pale Blue Oyster", 4059.99, 1, cb);
        },
        function(cb) {
            itemCreate("Catalina Club CT1-J484 4-piece Shell Pack with Snare Drum - Satin Walnut Glaze", categories[2], manufacturers[2], "4-piece Mahogany Drum Kit with 14 x 18 Bass Drum, 8 x 12  Rack Tom, 14 x 14 Floor Tom, and 5 x 14 Snare Drum - Satin Walnut Glaze", 749.99, 6, cb);
        },
        function(cb) {
            itemCreate("Nitro Mesh Electronic Drum Set", categories[2], manufacturers[14], "5-piece Electronic Drum Set with 8 Snare, Kick Tower with Pedal, 3 x 8 Toms, 10 Crash Cymbal, 10 Ride Cymbal, 10 Hi-Hats, and Nitro Sound Module", 449.99, 4, cb);
        },
        function(cb) {
            itemCreate("V-Drums Acoustic Design VAD506 Electronic Drum Set", categories[2], manufacturers[15], "5-piece Wood Shell Electronic Drum Set with 14 Snare, 20 Kick, 10/12 Toms, 14 Floor Tom, 14 Crash, 16 Crash/Ride, and 18 Ride Cymbals, 12 Hi-hat, and TD-27 Sound Module - Midnight Sparkle Wrap", 4599.99, 3, cb);
        },
        function(cb) {
            itemCreate("PDDT710R Drum Throne - Round", categories[2], manufacturers[16], "Drum Throne with Padded Seat and Tripod Base - 12", 69.99, 13, cb);
        },
        function(cb) {
            itemCreate("K Custom Dark Cymbal Set - 14/16/18/20 inch", categories[2], manufacturers[17], "4-piece Zildjian K Custom Dark Cymbal Pack with 14 Hi-hat Pair, 16 Crash, 18 Crash, and 20 Ride", 1299.99, 6, cb);
        },
        function(cb) {
            itemCreate("dB One Low Volume 4-piece Cymbal Set", categories[2], manufacturers[18], "4-piece Perforated Stainless Alloy Cymbal Set with Hi-hats, Small and Large Crashes, and a Ride Cymbal", 359.99, 4, cb);
        },
        function(cb) {
            itemCreate("2002 Cymbal Set - 14/18/20/22 inch", categories[2], manufacturers[19], "5-pc Cymbal Pack Made from CuSn8 Bronze with 14 Hi-hats, 18 and 20 Crashes, and 22 Ride", 1199.99, 3, cb);
        },
        function(cb) {
            itemCreate("Mike Johnston Byzance Set - 14/18/20/21 inch", categories[2], manufacturers[20], "4-piece Cymbal Pack with 14 Hi-hat Pair, 20 Extra-thin Crash, 21 Ride, and Bonus 18 Extra-dry Thin Crash", 1499.99, 1, cb);
        },
        function(cb) {
            itemCreate("HHX Complex Promotional Cymbal Set - 14/16/18/20 inch", categories[2], manufacturers[21], "4-piece B20 Cymbal Set with 14 Hi-hats (Pair), 16 and 18 Crashes, and 20 Ride - Natural", 1359.99, 7, cb);
        },
        function(cb) {
            itemCreate("PP-1 Hand Percussion Pack", categories[2], manufacturers[20], "Instrument Bundle with Luis Conte Live Shaker, Classic Hardwood Claves, and Compact Foot Jingle Tambourine", 49.99, 5, cb);
        },
        function(cb) {
            itemCreate("Drum Set Tambourine - Black with Brass Jingles", categories[2], manufacturers[22], "Tambourine with Hi-hat Mount - Black, Brass Jingles", 59.99, 2, cb);
        },
        function(cb) {
            itemCreate("LP Foot Tambourine LP188", categories[2], manufacturers[23], "Foot Tambourine with 4 Pairs of Jingles, Black Elastic Band, Plastic Frame - Red", 14.99, 5, cb);
        },
        function(cb) {
            itemCreate("Festival Drum Combo Pack", categories[2], manufacturers[24], "Drum Pack with 20.5 x 10 Djembe, 19 x 10 Timbau, and 24.5 x 10 Tubano - Morado", 499.99, 2, cb);
        },
        function(cb) {
            itemCreate("Valencia 100 Series Tubano - 10 inch Kintekloth", categories[2], manufacturers[24], "10 inch Recycled Hardwood Tubano with Key-tuned Nuskyn Mondo Drumhead", 499.99, 4, cb);
        },
        function(cb) {
            itemCreate("Mondo Key-Tuned Djembe - 14x25 - Sahara Brown", categories[2], manufacturers[24], "Djembe with Acousticon Shell - Sahara Brown", 499.99, 1, cb);
        },
        function(cb) {
            itemCreate("Stage 3 88 Stage Keyboard", categories[3], manufacturers[25], "88-key Digital Stage Piano with Synth, Organ, and Piano Sound Generators and 2GB Memory for Nord Piano Library", 4199.99, 6, cb);
        },
        function(cb) {
            itemCreate("JUNO-DS88 88-key Synthesizer", categories[3], manufacturers[15], "88-key Synthesizer with Velocity-sensitive, Hammer-action Keys, Wave Expansion Slot, Phrase Pads, Vocoder with Auto Pitch, and 8-track Sequencer", 1199.99, 1, cb);
        },
        function(cb) {
            itemCreate("MicroFreak Hybrid Synthesizer", categories[3], manufacturers[26], "25-key Paraphonic Hybrid Hardware Synth with Poly-aftertouch Flat Keyboard, Wavetable and Digital Oscillators, Analog Filters, Modulation Matrix, Arpeggiator, and Sequencer", 359.99, 4, cb);
        },
        function(cb) {
            itemCreate("TD-3-MO-AM Analog Bass Line Synthesizer - Yellow", categories[3], manufacturers[27], "All-analog Bass Synthesizer with 16-step Sequencer, Arpeggiator, 4-pole Resonant VCF, Overdrive, and Poly Chain Capability", 279.99, 5, cb);
        },
        function(cb) {
            itemCreate("Minilogue XD 4-voice Analog Synthesizer", categories[3], manufacturers[28], "4-voice Analog/Digital Synthesizer with 2 VCOs per Voice, Digital Multi-engine, Effects, 16-step Polyphonic Sequencer, 4 Voice Modes, and MIDI/Sync I/O", 599.99, 10, cb);
        },
        function(cb) {
            itemCreate("Poly D Polyphonic Analog Synthesizer", categories[3], manufacturers[27], "37-key Analog 4-Voice Paraphonic Synthesizer with Full-size Keys, 4 VCOs, Classic Ladder Filter, LFO, BBD Stereo Chorus, Distortion, 32-step Sequencer, and Arpeggiator", 899.99, 3, cb);
        },
        function(cb) {
            itemCreate("Subsequent 37 Analog Synthesizer", categories[3], manufacturers[29], "37-key Analog Synthesizer with Mono and Duo Modes, Aftertouch, 256 Presets, 2 Modulation Buses, and Enhanced Analog Signal Path", 1899.99, 2, cb);
        },
        function(cb) {
            itemCreate("P-45 88-key Digital Piano with Speakers", categories[3], manufacturers[5], "88-key Digital Piano with Graded Hammer Standard Keyboard and Built-in Speaker System", 599.99, 4, cb);
        },
        function(cb) {
            itemCreate("DGX670B 88-key Arranger Piano - Black", categories[3], manufacturers[5], "88-key Portable Grand Digital Piano with GHS Weighted Action, CFX Stereo Sampling, and Virtual Resonance Modeling", 899.99, 2, cb);
        },
        function(cb) {
            itemCreate("Recital Pro 88-key Hammer-action Digital Piano", categories[3], manufacturers[14], "88-key Digital Piano with Hammer-action Keyboard, Lesson Mode, Recording, Integrated Speakers, Metronome, Onboard Effects, Sustain Pedal Input, and Headphone Output", 379.99, 6, cb);
        },
        function(cb) {
            itemCreate("Professional MPK Mini MK III 25-key Keyboard Controller", categories[3], manufacturers[30], "25-key MIDI Controller with Synth-action Mini Keys, 4-way Thumbstick, 8 MPC-style Pads, and 8 Control Knobs", 99.99, 5, cb);
        },
        function(cb) {
            itemCreate("KeyLab 88 MkII 88-key Weighted Keyboard Controller", categories[3], manufacturers[26], "88-note USB MIDI Keyboard Controller with Aftertouch, 9 Faders, 9 Encoders, 16 RGB Performance Pads, DAW Command Center, CV/Gate Connectivity, MIDI, USB, and Analog Lab Software - Mac/Win", 999.99, 7, cb);
        },
        function(cb) {
            itemCreate("KeyLab Essential 61 61-key Keyboard Controller", categories[3], manufacturers[26], "61-note MIDI Controller Keyboard with Extensive Hands-on Controls, 8 Performance Pads, MIDI/USB Connectivity, Analog Lab Virtual Instrument, and Other Software", 259.99, 7, cb);
        },
        function(cb) {
            itemCreate("Launchkey Mini MK3 25-key Keyboard Controller", categories[3], manufacturers[31], "25 Mini-key USB Controller Keyboard with 16 Performance Pads, 8 Knobs, Pitch and Modulation Strips, and Bundled Software", 199.99, 3, cb);
        },
        function(cb) {
            itemCreate("Katana-50 MkII 1 x 12-inch 50-watt Combo Amp", categories[4], manufacturers[32], "50/25/0.5W 1x12 Guitar Combo Amplifier with 5 Amp Voicings, 60 Effects, 4 Tone Slots, Cab-emulated Headphone/Record Output, and USB", 299.99, 13, cb);
        },
        function(cb) {
            itemCreate("DSL40CR 1x12 40-watt Tube Combo Amp", categories[4], manufacturers[33], "40-watt, 1x12 Tube Guitar Combo Amplifier with 2 Channels (Each with 2 Modes), High/Low Power Modes, Speaker-emulated Line Output, Digital Reverb, Effects Loop, and 2-button Footswitch", 1099.99, 6, cb);
        },
        function(cb) {
            itemCreate("Champion 20 1x8 inch 20-watt Combo Amp", categories[4], manufacturers[1], "20-watt 1-channel 1x8 Guitar Combo Amplifier with Selectable Amp Voicing, Onboard Effects, Stereo Aux Input, and Headphone Jack - Black", 129.99, 5, cb);
        },
        function(cb) {
            itemCreate("THR30 II Wireless - 30-watt Modeling Combo - Cream", categories[4], manufacturers[5], "30-watt 1-channel 2x3.5 Battery-powered Stereo Guitar Combo Amplifier with Amplifier Models, Effects, 3-band EQ, USB Connectivity, Bluetooth, and Wireless Receiver", 599.99, 4, cb);
        },
        function(cb) {
            itemCreate("Tone Master Princeton Reverb 1x10 12-watt Combo Amp", categories[4], manufacturers[1], "12-watt, 1-channel Solid-state 1x10 Guitar Combo Amplifier with Reverb, Tremolo, Selectable Output Power, Cab Simulation, and Line Output", 999.99, 5, cb);
        },
        function(cb) {
            itemCreate("65 Princeton Reverb 1 x 12-inch 12-watt Tube Combo Amp - Lacquered Tweed", categories[4], manufacturers[1], "12-watt, 1-ch 1x12 Tube Guitar Combo Amplifier with Reverb and Tremolo - Lacquered Tweed", 1299.99, 7, cb);
        },
        function(cb) {
            itemCreate("Crush 20 1x8 20-watt Combo Amp", categories[4], manufacturers[34], "20-watt 2-channel 1x8 Guitar Combo Amplifier with 4-stage High-gain Preamp and CabSim Circuit - Orange", 149.99, 5, cb);
        },
        function(cb) {
            itemCreate("VoiceLive Play Acoustic Guitar and Vocal Effects Processor Pedal", categories[4], manufacturers[35], "Guitar and Vocal Digital Multi-effects Processing Pedal with Mic and Instrument Inputs, Dual XLR Outputs with Assignable Function, 1/8 Auxiliary Input, USB Connectivity, and Headphone Output", 299.99, 2, cb);
        },
        function(cb) {
            itemCreate("FX600 Digital Multi-FX Pedal", categories[4], manufacturers[27], "Digital Multi-effects Pedal with Chorus, Flanger, Phaser, Delay, Tremolo, and Pitch Shifter", 49.99, 6, cb);
        },
        function(cb) {
            itemCreate("GT-1 Guitar Multi-effects Pedal", categories[4], manufacturers[32], "Guitar Multi-effects Pedal with 108 Effects and 198 Patches", 229.99, 3, cb);
        },
        function(cb) {
            itemCreate("Centavo Professional Overdrive Pedal", categories[4], manufacturers[36], "Overdrive Pedal with Gain/Treble/Output Controls and Mod Switch", 179.99, 10, cb);
        },
        function(cb) {
            itemCreate("DS-1W Waza Craft Distortion Pedal", categories[4], manufacturers[32], "Distortion Pedal with Standard Mode, Custom Mode, and Tone/Dist/Level Controls", 199.99, 6, cb);
        },
        function(cb) {
            itemCreate("TS9 Tube Screamer Overdrive Pedal", categories[4], manufacturers[8], "Distortion/Overdrive Guitar Stompbox Effect", 109.99, 4, cb);
        },
        function(cb) {
            itemCreate("Iridium Amp & IR Cab Pedal", categories[4], manufacturers[37], "Stereo Amplifier Simulator and Cab IR Convolver with 300 Presets, Onboard Room Reverb, and Buffered Bypass Switching", 399.99, 6, cb);
        },
        function(cb) {
            itemCreate("BigSky Multidimensional Reverb Pedal", categories[4], manufacturers[37], "Multi-effects Reverb Pedal with 12 Reverb Types, 300 Presets, 3 Footswitches, and MIDI", 479.99, 4, cb);
        },
        function(cb) {
            itemCreate("Halo Andy Timmons Dual Echo Pedal - Andy Apple Red", categories[4], manufacturers[38], "Dual Delay Pedal with A/B Sides, 5 Rhythms, Tap Tempo, and Preset Save/Recall - Andy Apple Red", 299.99, 1, cb);
        },
        function(cb) {
            itemCreate("RV-6 Digital Reverb Pedal", categories[4], manufacturers[32], "Digital Reverb Pedal with 8 Reverb Modes, Expression Pedal Input, and Mono or Stereo Operation", 169.99, 2, cb);
        },
        function(cb) {
            itemCreate("NT1-A Large-diaphragm Condenser Microphone", categories[5], manufacturers[39], "Large-diaphragm Cardioid Condenser Mic with Shockmount, Pop Shield, XLR Cable, and Dust Cover", 179.99, 4, cb);
        },
        function(cb) {
            itemCreate("AT2020 Cardioid Medium-diaphragm Condenser Microphone", categories[5], manufacturers[40], "Medium-diaphragm Cardioid Condenser Microphone with Pivoting Stand Mount", 99.99, 6, cb);
        },
        function(cb) {
            itemCreate("C214 Large-diaphragm Condenser Microphone", categories[5], manufacturers[41], "Large-diaphragm Cardioid Condenser Microphone with 143dB Dynamic Range, Switchable 20dB Attenuation, and Low-cut Filter", 499.99, 3, cb);
        },
        function(cb) {
            itemCreate("SM7B Cardioid Dynamic Vocal Microphone", categories[5], manufacturers[42], "Dynamic Vocal Mic with Bass Roll-Off and Presence Boost Controls", 399.99, 7, cb);
        },
        function(cb) {
            itemCreate("SM57 Cardioid Dynamic Instrument Microphone", categories[5], manufacturers[42], "Dynamic Microphone with Cardioid Pickup Pattern, 40Hz-15kHz Frequency Response, Low Impedance, Includes Stand Adapter, and Zippered Carrying Case", 99.99, 12, cb);
        },
        function(cb) {
            itemCreate("Beta 52A Supercardioid Dynamic Kick Drum Microphone", categories[5], manufacturers[42], "Supercardioid Dynamic Microphone for Kick Drum and Bass Instruments", 199.99, 2, cb);
        },
        function(cb) {
            itemCreate("E609 Silver Supercardioid Dynamic Guitar Microphone", categories[5], manufacturers[43], "Dynamic Supercardioid Guitar Amplifier Microphone", 99.99, 3, cb);
        },
        function(cb) {
            itemCreate("DP7 Plus Bundle 8-Piece Drum Microphone Package", categories[5], manufacturers[44], "8-piece Audix Drum Mic Package with 1 D6, 1 i5, 2 D2, 1 D4, and 3 ADX51 Microphones, and Road Case", 1149.99, 3, cb);
        },
        function(cb) {
            itemCreate("AT2020USB+ Cardioid Condenser USB Microphone", categories[5], manufacturers[40], "Medium-diaphragm Cardioid Side Address Condenser Microphone with USB Connectivity, Headphone Volume Control, and Mix Control", 129.99, 3, cb);
        },
        function(cb) {
            itemCreate("Xenyx X1204USB Mixer with USB and Effects", categories[5], manufacturers[27], "8-channel USB Mixer with One-knob Compression, 2 Aux Sends, 2 Busses, Built-in FX, and 3-band EQ Per Channel", 199.99, 4, cb);
        },
        function(cb) {
            itemCreate("MG06X 6-channel Mixer with Effects", categories[5], manufacturers[5], "6-channel Analog Mixer with 2 Microphone Preamps, 4 Dedicated Stereo Line Channels, EQ, and Digital Effects", 199.99, 6, cb);
        },
        function(cb) {
            itemCreate("CR3-X 3 inch Multimedia Monitors", categories[5], manufacturers[45], "3 inch Active Studio Monitor, with 1/4 TRS, 1/8 TRS, and RCA Inputs (pair)", 99.99, 4, cb);
        },
        function(cb) {
            itemCreate("305P MkII 5-inch Powered Studio Monitor", categories[5], manufacturers[46], "82W Powered 2-way Studio Reference Monitors with 5 Woofer, 1 Tweeter, and Magnetic Shielding", 179.99, 12, cb);
        },
        function(cb) {
            itemCreate("Backline Gear Transport Pack Musician's Accessories Backpack", categories[6], manufacturers[47], "Polyester Audio Gear/Laptop Backpack for Guitar and Bass Players - Black and Red", 299.99, 6, cb);
        },
        function(cb) {
            itemCreate("EXM-75 Excellines Microphone Cable - 75 foot", categories[6], manufacturers[48], "Microphone Cable, XLR Male-XLR Female, 75 ft Long", 49.99, 10, cb);
        },
        function(cb) {
            itemCreate("Pro WaterShield Inkjet Printable CD-R Media - White 50pk", categories[6], manufacturers[49], "Water-resistant Printable CD-R, 50-pack Spindle", 30.99, 6, cb);
        },
        function(cb) {
            itemCreate("Bulk Guitar Cable - 50 foot Roll - Black", categories[6], manufacturers[50], "50ft Roll of Bulk Guitar Cable, .155 Diameter, for Use with George Ls .155 Connectors - Black", 109.99, 4, cb);
        },
        function(cb) {
            itemCreate("Lightning iPad Cable for JAM and MiC - 1 meter", categories[6], manufacturers[51], "1-meter Connection Cable for Apogee MiC and JAM Interfaces to Lightning iOS Devices", 34.99, 10, cb);
        },
        function(cb) {
            itemCreate("Ultra microSDXC Card - 64GB, Class 10, UHS-I", categories[6], manufacturers[52], "microSDXC Card with Class 10/UHS-I Video Compliance and 80MB/S Maximum Transfer Speed - 64GB", 11.99, 15, cb);
        },
        function(cb) {
            itemCreate("CSS-204 Stereo Interconnect Dual 1/4-inch TRS Male to Dual 1/4-inch TRS Male Cable - 13.2 foot", categories[6], manufacturers[53], "Audio Cable, Dual 1/4 TRS Male-Dual 1/4 TRS Male, 4M Long", 19.99, 8, cb);
        },
        function(cb) {
            itemCreate("UniTune Clip Clip-on Chromatic Tuner", categories[6], manufacturers[54], "Clip-on Chromatic Headstock Tuner with Adaptive LED Display, Custom Clip, and Multiple Tuning Modes", 34.99, 5, cb);
        },
        function(cb) {
            itemCreate("StroboStomp HD Pedal Tuner", categories[6], manufacturers[55], "Guitar and Bass Tuner Pedal with True Bypass, Buffered Output, and Buffered Monitor Modes; Open and Alternate tuning presets; and High-definition LCD Screen with Variable-color LED Backlight", 149.99, 4, cb);
        },
        function(cb) {
            itemCreate("PVP101 Guitar Pick Variety Pack - Light/Medium", categories[6], manufacturers[56], "Variety Pack of 12 Picks with Different Textures, Shapes, and Material - Light/Medium", 5.99, 14, cb);
        },
        function(cb) {
            itemCreate("Assorted Guitar Picks - Medium (7-pack)", categories[6], manufacturers[47], "7-pack of Assorted Guitar Picks, Medium Gauge", 4.99, 6, cb);
        },
        function(cb) {
            itemCreate("Tortex Standard Guitar Picks - .60mm Orange (12-pack)", categories[6], manufacturers[56], "Standard Shape Tortex Guitar Picks .60mm Gauge - Orange (12-pack)", 4.99, 11, cb);
        },
        function(cb) {
            itemCreate("Holy Grail Nano Reverb Pedal", categories[4], manufacturers[5], "A true space-saver with classic Holy Grail sounds.", 129.99, 4, cb);
        },
        function(cb) {
            itemCreate("351 Celluloid Guitar Pick Medley - Medium (12-pack)", categories[6], manufacturers[1], "Celluloid 351 Guitar Pick - 12-pack", 6.99, 10, cb);
        },        
        function(cb) {
            itemCreate("KS7190 Classic Single-X Stand", categories[6], manufacturers[57], "Single-braced, X-style Keyboard Stand", 35.99, 5, cb);
        },
        function(cb) {
            itemCreate("KS8291XX Keyboard Stand with Lok-Tight Construction", categories[6], manufacturers[57], "Double-braced 1-tier Keyboard Stand", 99.99, 4, cb);
        },
        function(cb) {
            itemCreate("L85 Piano Stand - Black", categories[6], manufacturers[5], "Furniture-style Stand for Yamaha P115, P105, P95, P85, and P45 Digital Pianos - Black", 169.99, 2, cb);
        }
    ], cb)
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



