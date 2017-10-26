const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name : { type: String, required: true, minlength: 1 },
    password : { type: String, required: true, minlength: 1 },
    watchlist: [],
    browselist: [],
}, { timestamps: true })

mongoose.model("User", UserSchema)



var ProductSchema = new mongoose.Schema({
    productid: String,
    watchedBy: [],
}, {timestamps: true });

mongoose.model("Product", ProductSchema)




var OrderSchema = new mongoose.Schema({
    userid: String,
    orderCart: [],
}, {timestamps: true });


mongoose.model("Order", OrderSchema)