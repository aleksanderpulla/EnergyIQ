import mongoose, { Schema, Document } from 'mongoose';

export interface DataDocument extends Document {
  current: number;
  voltage: number;
}
//this is schema db
const DataSchema: Schema<DataDocument> = new Schema<DataDocument>({
  current: { 
    type: Number, 
    required: true
  },
  voltage: { 
    type: Number,
    required: true
  }
});

// Check if the model already exists and delete it
if (mongoose.models['Data']) {
  delete mongoose.models['Data'];
}

export const DataModel = mongoose.model('Data', DataSchema);
