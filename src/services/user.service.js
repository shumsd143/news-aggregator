const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../../users.json");

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

const users = require(filePath) || [];

async function create(user) {
  users.push(user);
  await updateUsersFile(users);
  return user;
}

async function get(email) {
  return users.find((user) => user.email == email);
}

function updateUsersFile(users) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        console.log(err, 40);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  users,
  create,
  get,
  updateUsersFile,
};
