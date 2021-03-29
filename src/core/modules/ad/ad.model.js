const { Schema, model } = require('mongoose');

const adSchema = new Schema(
  {
    shortText: { type: String, required: true },
    description: { type: String, default: '' },
    images: { type: [String], default: [] },
    userId: { type: Schema.Types.ObjectId, required: true },
    tags: { type: [String], default: [] },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

module.exports = { Ad: model('ad', adSchema) };
