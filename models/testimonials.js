const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    testimonialBy : { type: mongoose.Schema.Types.ObjectId, ref: 'User',},
    testimonial : { type: String, required: true},
    created_on : { type: Date, required: true}
})

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;