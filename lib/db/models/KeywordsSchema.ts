import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const KeywordsSchema = new Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true,
    dbRef: "_id",
  },
  name: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const KeywordModel = mongoose.models.Keywords || mongoose.model('Keywords', KeywordsSchema);
export default KeywordModel;
