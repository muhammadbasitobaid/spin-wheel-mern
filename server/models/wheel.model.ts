import { model, Schema, Document } from "mongoose";

// SpinConfig interface
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
  selectedTheme: string[];
}

// WheelDocument interface
export interface WheelDocument extends Document {
  selectedOption?: string;
  customOptions?: string[];
  wheelType: string;
  customWheelName: string;
  inputNumbers?: number;
  history: string[];
  lowerNumber?: number;
  highestNumber?: number;
  interval?: number;
  customLetterList?: string;
  casing?: string;
  description: string;
  popUpMessage: string;
  createdAt: Date;
  spinConfig: SpinConfig;
}

// SpinConfig schema
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
  selectedTheme: { type: [String], required: true },
});

// WheelDocument schema
const wheelDocumentSchema = new Schema<WheelDocument>({
  selectedOption: { type: String },
  customOptions: { type: [String] },
  wheelType: { type: String, required: true },
  customWheelName: { type: String, required: true },
  inputNumbers: { type: Number },
  history: { type: [String], default: [] },
  lowerNumber: { type: Number },
  highestNumber: { type: Number },
  interval: { type: Number },
  customLetterList: { type: String },
  casing: { type: String },
  description: { type: String, required: true },
  popUpMessage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  spinConfig: { type: spinConfigSchema, required: true },
});

// Export the Wheel model
export const Wheel = model<WheelDocument>("Wheel", wheelDocumentSchema);

