const { updateUsersFile, users } = require("./user.service");

async function update(email, preferences) {
  const user_id = users.findIndex((user) => user.email == email);
  console.log(user_id);
  users[user_id].preferences = preferences;
  updateUsersFile(users);
}

module.exports = { update };
