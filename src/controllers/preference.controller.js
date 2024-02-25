const { update } = require("../services/preference.service");

function getPreferences(req, res) {
  res.status(200).json({ preferences: req.user.preferences });
}

function updatePreferences(req, res) {
  const { preferences } = req.body;
  update(req.user.email, preferences);
  res.status(200).json({ message: "Preferences updated successfully" });
}

module.exports = { getPreferences, updatePreferences };
