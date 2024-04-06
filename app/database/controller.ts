import mongoose, { Schema, Document } from "mongoose";

export interface DataDocument extends Document {
  timestamp: Date;
  current: number;
  voltage: number;
  frequency: number;
  power: number;
  energy: number;
}
//this is schema db
const DataSchema: Schema<DataDocument> = new Schema<DataDocument>({
  timestamp: {
    type: Date,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  },
  voltage: {
    type: Number,
    required: true,
  },
  frequency: {
    type: Number,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
  energy: {
    type: Number,
    required: true,
  },
});

// Check if the model already exists and delete it
if (mongoose.models["Data"]) {
  delete mongoose.models["Data"];
}

export const DataModel = mongoose.model("Data", DataSchema);
