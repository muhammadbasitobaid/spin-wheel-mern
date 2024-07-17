import { Request, Response } from "express";
import WheelService from "@services/wheel.service";
import LoggerService from "@services/logger.service";

// Get wheel by ID
export const getWheelById = async (req: Request, res: Response) => {
  try {
    const { wheelId } = req.params;
    const wheel = await WheelService.getWheelById(wheelId);

    if (!wheel) {
      return res.status(404).json({ message: "Wheel not found" });
    }

    res.status(200).json(wheel);
  } catch (error: any) {
    LoggerService.log.error(error);
    res
      .status(500)
      .json({ message: "Error fetching wheel", error: error.message });
  }
};

// Generate share link for a wheel
export const generateShareLink = async (req: Request, res: Response) => {
  try {
    const { wheelId } = req.params;
    const shareLink = WheelService.generateShareLink(
      wheelId,
      req.protocol,
      req.get("host") as string
    );

    res
      .status(200)
      .json({ message: "Share link generated successfully", shareLink });
  } catch (error: any) {
    LoggerService.log.error(error);
    res
      .status(500)
      .json({ message: "Error generating share link", error: error.message });
  }
};

// Delete wheel by ID
export const deleteWheel = async (req: Request, res: Response) => {
  try {
    const { wheelId } = req.params;
    await WheelService.deleteWheelById(wheelId);

    res.status(200).json({ message: "Wheel deleted successfully" });
  } catch (error: any) {
    LoggerService.log.error(error);
    res
      .status(500)
      .json({ message: "Error deleting wheel", error: error.message });
  }
};

export default {
  getWheelById,
  generateShareLink,
  deleteWheel,
};
