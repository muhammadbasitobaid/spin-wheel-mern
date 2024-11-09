import { model, Schema, Document } from "mongoose";

export interface Wheel {
  name: string;
  label: string;
  options: string[];
}

export interface SpinConfig {
  spinningSpeedLevel: number;
  spinningDuration: number;
  manuallyStopOption: boolean;
  randomInitialAngleOption: boolean;
  mysterySpinOption: boolean;
  spinCountOption: boolean;
  confetti: boolean;
  sound: boolean;
  confettiType: "Confetti" | "Fireworks";
  soundType: "Sound" | "No Sound";
}

export interface WheelSnapshot {
  selectedOption?: string;
  inputNumbers?: number;
  history: string[];
  options?: string[];
  lowerNumber?: number;
  highestNumber?: number;
  excludeNumbers?: string;
  interval?: number;
  customLetterList?: string;
  casing?: string;
}

export interface WheelDocument extends Document {
  name: string;
  createdAt: Date;
  selectedWheel: Wheel;
  description: string;           // New field for description
  popUpMessage: string;          // New field for popUpMessage
  wheelSnapshot: WheelSnapshot;
  selectedTheme: string[];
  spinConfig: SpinConfig;
}

const wheelSchema = new Schema<Wheel>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

const spinConfigSchema = new Schema<SpinConfig>({
  spinningSpeedLevel: { type: Number, required: true },
  spinningDuration: { type: Number, required: true },
  manuallyStopOption: { type: Boolean, required: true },
  randomInitialAngleOption: { type: Boolean, required: true },
  mysterySpinOption: { type: Boolean, required: true },
  spinCountOption: { type: Boolean, required: true },
  confetti: { type: Boolean, required: true },
  sound: { type: Boolean, required: true },
  confettiType: {
    type: String,
    enum: ["Confetti", "Fireworks"],
    required: true,
  },
  soundType: { type: String, enum: ["Sound", "No Sound"], required: true },
});

const wheelSnapshotSchema = new Schema<WheelSnapshot>({
  selectedOption: { type: String, required: false },
  inputNumbers: { type: Number, required: false },
  history: { type: [String], required: true },
  lowerNumber: { type: Number, required: false },
  highestNumber: { type: Number, required: false },
  excludeNumbers: { type: String, required: false },
  interval: { type: Number, required: false },
  customLetterList: { type: String, required: false },
  casing: { type: String, required: false },
  options: { type: [String], required: false },
});

const wheelDocumentSchema = new Schema<WheelDocument>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  selectedWheel: {
    type: wheelSchema,
    required: true,
  },
  description: {
    type: String,  
    required: true,
  },
  popUpMessage: {
    type: String,  
    required: true,
  },
  wheelSnapshot: {
    type: wheelSnapshotSchema,
    required: true,
  },
  selectedTheme: {
    type: [String],
    required: true,
  },
  spinConfig: {
    type: spinConfigSchema,
    required: true,
  },
});

export const Wheel = model<WheelDocument>("Wheel", wheelDocumentSchema);

export default Wheel;
