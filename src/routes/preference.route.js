const {
  getPreferences,
  updatePreferences,
} = require("../controllers/preference.controller");

const router = require("express").Router();

router.get("/", getPreferences);
router.put("/", updatePreferences);

module.exports = router;
