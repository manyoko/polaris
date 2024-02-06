const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    title : String,
    description : String,
    image : Buffer

})

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;