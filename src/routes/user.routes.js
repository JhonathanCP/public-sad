import { Router } from "express";
import { createUser, getUser, getUsers, addGroupToUser, addReportToUser, addRoleToUser, removeGroupFromUser, removeReportFromUser, removeRoleFromUser } from "../controllers/user.controller.js";
import { isAdmin, isAdminOrModerator, verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.post("/", [verifyToken, isAdmin], createUser);
router.get("/", [verifyToken, isAdminOrModerator], getUsers);
router.get("/:id", [verifyToken, isAdminOrModerator], getUser);
router.post("/:userId/roles/:roleId", [verifyToken, isAdminOrModerator], addRoleToUser);
router.post("/:userId/group/:groupId", [verifyToken, isAdminOrModerator], addGroupToUser);
router.post("/:userId/report/:reportId", [verifyToken, isAdminOrModerator], addReportToUser);
router.delete("/:userId/roles/:roleId", [verifyToken, isAdminOrModerator], removeRoleFromUser);
router.delete("/:userId/group/:groupId", [verifyToken, isAdminOrModerator], removeGroupFromUser);
router.delete("/:userId/report/:reportId", [verifyToken, isAdminOrModerator], removeReportFromUser);

export default router;