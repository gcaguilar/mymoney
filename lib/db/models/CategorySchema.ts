import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true,
    dbRef: "_id",
  },
  name: {
    type: String,
  },
  associatesNames: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const CategoryModel = mongoose.models.Category || mongoose.model('Category', CategorySchema);
export default CategoryModel;