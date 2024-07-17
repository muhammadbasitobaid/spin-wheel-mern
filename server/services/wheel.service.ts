import Wheel, { WheelDocument } from "@models/wheel.model";
import LoggerService from "@services/logger.service";

export default class WheelService {
  // Get wheel by ID
  static async getWheelById(wheelId: string): Promise<WheelDocument | null> {
    try {
      const wheel = await Wheel.findById(wheelId);
      return wheel;
    } catch (error: any) {
      LoggerService.log.error(
        `Error fetching wheel by ID ${wheelId}: ${error.message}`
      );
      throw error;
    }
  }

  // Delete wheel by ID
  static async deleteWheelById(wheelId: string): Promise<void> {
    try {
      const wheel = await Wheel.findByIdAndDelete(wheelId);
      if (!wheel) {
        throw new Error(`Wheel with ID ${wheelId} not found`);
      }
    } catch (error: any) {
      LoggerService.log.error(
        `Error deleting wheel by ID ${wheelId}: ${error.message}`
      );
      throw error;
    }
  }

  // Example: Generate share link for a wheel (if needed)
  static generateShareLink(
    wheelId: string,
    protocol: string,
    host: string
  ): string {
    return `${protocol}://${host}/wheels/${wheelId}/share`;
  }
}
