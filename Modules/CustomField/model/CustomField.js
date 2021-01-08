const mongoose = require('mongoose');

const opts = { 
    toObject: {virtuals: true},
    toJSON: { virtuals: true } };

const CustomFieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max:255
    },
    type: {
      type: String,
      enum: ['short text', 'long text', 'dropdown list', 'date'],
      required: true
    },
    entity: {
      type: [String],
      enum: ['user','student', 'turma', 'school'],
      required: true
    }
}, opts);

module.exports = mongoose.model('CustomField', CustomFieldSchema);