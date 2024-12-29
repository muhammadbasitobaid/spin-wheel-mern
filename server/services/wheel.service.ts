import { WheelDocument, Wheel } from "@models/wheel.model";
import LoggerService from "@services/logger.service";

export default class WheelService {
  /**
   * Fetch a wheel by its ID
   * @param wheelId - The ID of the wheel to fetch
   * @returns A promise that resolves to the Wheel document or null if not found
   */
  static async getWheelById(wheelId: string): Promise<WheelDocument | null> {
    try {
      const wheel = await Wheel.findById(wheelId);
      if (!wheel) {
        throw new Error(`Wheel with ID ${wheelId} not found`);
      }
      return wheel;
    } catch (error: any) {
      LoggerService.log.error(
        `Error fetching wheel by ID ${wheelId}: ${error.message}`
      );
      throw error;  // Rethrow to propagate error
    }
  }

  /**
   * Delete a wheel by its ID
   * @param wheelId - The ID of the wheel to delete
   * @returns A promise that resolves to nothing if deletion is successful
   */
  static async deleteWheelById(wheelId: string): Promise<void> {
    try {
      const wheel = await Wheel.findByIdAndDelete(wheelId);
      if (!wheel) {
        throw new Error(`Wheel with ID ${wheelId} not found`);
      }
      LoggerService.log.info(`Wheel with ID ${wheelId} successfully deleted`);
    } catch (error: any) {
      LoggerService.log.error(
        `Error deleting wheel by ID ${wheelId}: ${error.message}`
      );
      throw error;  // Rethrow to propagate error
    }
  }

  /**
   * Generate a share link for a wheel
   * @param wheelId - The ID of the wheel to share
   * @param baseUrl - The base URL of the application
   * @returns A shareable link for the wheel
   */
  static generateShareLink(
    wheelId: string,
    baseUrl: string
  ): string {
    return `${baseUrl}/wheels/${wheelId}/share`;
  }
}
