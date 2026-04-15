const express = require("express")

const { createSession, getSessionByID, getMySession, deleteSession } = require("../controllers/sessionController")

const { protect } = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/create", protect, createSession);
router.get("/my-sessions", protect, getMySession);
router.get("/:id", protect, getSessionByID);
router.delete("/:id", protect, deleteSession);

module.exports = router;