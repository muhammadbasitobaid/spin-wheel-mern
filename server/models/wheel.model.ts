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
  inputNumbers: number;
}

export interface WheelDocument extends Document {
  name: string;
  createdAt: Date;
  history: string[];
  selectedWheel: Wheel; // Updated to use the Wheel interface
  inputNumbers: number;
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
  inputNumbers: { type: Number, required: true },
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
  history: {
    type: [String],
    required: true,
  },
  selectedWheel: {
    type: wheelSchema,
    required: true,
  },
  inputNumbers: {
    type: Number,
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
