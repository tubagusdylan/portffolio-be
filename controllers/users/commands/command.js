const collection = "users";
const ErrorQuery = "Error query PostgreSQL";
const db = require("../../../config/database.js");
const wrapper = require("../../../helper/queryWrapper.js");

const insertOne = async (body) => {
  const { id, username, password, profileName, isAdmin } = body;
  try {
    const query = `
        INSERT INTO ${collection} (id, username, password, profile_name, is_admin)
        VALUES (?, ?, ?, ?, ?);
    `;
    const values = [id, username, password, profileName, isAdmin];
    await db.execute(query, values);
    return wrapper.data("Adding data success");
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

const updateOne = async (body, id) => {
  const { username, password, profileName, isAdmin } = body;
  try {
    const query = `
        UPDATE ${collection}
        SET username = ?, password = ?, profile_name = ?, is_admin = ?
        WHERE id = ?;
    `;
    const values = [username, password, profileName, isAdmin, id];
    await db.execute(query, values);
    return wrapper.data("Updating data success");
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

const deleteOne = async (id) => {
  try {
    const query = `
        DELETE FROM ${collection}
        WHERE id = ?;
    `;
    const values = [id];
    await db.execute(query, values);
    return wrapper.data("Deleting data success");
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

const updateRefreshToken = async (token, id) => {
  try {
    const query = `
        UPDATE ${collection} SET refresh_token = ?
        WHERE id = ?;
    `;
    const values = [token, id];
    await db.execute(query, values);
    return wrapper.data("Updating token success");
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

module.exports = {
  insertOne,
  updateOne,
  deleteOne,
  updateRefreshToken,
};
