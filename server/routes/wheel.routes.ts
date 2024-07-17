import WheelController from "@controllers/wheel.controllers";
import { Router } from "express";

// Wheel routes

const router = Router();

router.get("/:wheelId", WheelController.getWheelById);
router.get("/:wheelId/share", WheelController.generateShareLink);
router.delete("/:wheelId", WheelController.deleteWheel);

export default router;
