import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ExpenseSchema = new Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true,
    dbRef: "_id",
  },
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: String,
  },
  category: {
    type: String,
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

const ExpenseModel = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
export default ExpenseModel;
