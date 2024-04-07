import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IData extends Document {
  createdAt?: Date;
  current: number;
  voltage: number;
  frequency: number;
  power: number;
  energy: number;
}
//this is schema db
const DataSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
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

const Data = models?.Data || model("Data", DataSchema);

export default Data;
