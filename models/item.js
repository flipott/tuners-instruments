const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({ 
    name: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    manufacturer: {type: Schema.Types.ObjectId, ref: "Manufacturer", required: true},
    description: {type: String, required: true},
    price: {type: mongoose.Schema.Types.Decimal128, required: true},
    stock: {type: Number, required: true},
});

ItemSchema.virtual("url").get(function () {
    return `/inventory/${this.category.name.toLowerCase()}/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);