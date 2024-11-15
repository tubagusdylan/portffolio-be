const collection = "users";
const ErrorQuery = "Error query PostgreSQL";
const ErrorNotFound = "Data not found, please try another input";
const db = require("../../../config/database.js");
const wrapper = require("../../../helper/queryWrapper.js");

const findAll = async () => {
  try {
    const query = `
          SELECT id, username, profile_name, is_admin, created_at
          FROM ${collection};
        `;
    const [rows] = await db.execute(query);
    if (!rows || rows.length === 0) {
      return wrapper.error(ErrorNotFound);
    }
    return wrapper.data(rows);
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

const findOne = async (id) => {
  try {
    const query = `
      SELECT id, username, profile_name, is_admin, created_at
      FROM ${collection}
      WHERE id = ?;
    `;
    const values = [id];
    const [rows] = await db.execute(query, values);
    if (!rows || rows.length === 0) {
      return wrapper.error(ErrorNotFound);
    }
    return wrapper.data(rows[0]);
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

const findOneByUsername = async (username) => {
  try {
    const query = `
      SELECT id, username, password, profile_name, is_admin
      FROM ${collection}
      WHERE username = ?;
    `;
    const values = [username];
    const [rows] = await db.execute(query, values);
    if (!rows || rows.length === 0) {
      return wrapper.error(ErrorNotFound);
    }
    return wrapper.data(rows[0]);
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

const findOneByToken = async (token) => {
  try {
    const query = `
      SELECT id, username, profile_name, is_admin
      FROM ${collection}
      WHERE refresh_token = ?;
    `;

    const values = [token];
    const [rows] = await db.execute(query, values);

    if (!rows || rows.length === 0) {
      return wrapper.error(ErrorNotFound);
    }
    return wrapper.data(rows[0]);
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

module.exports = {
  findAll,
  findOne,
  findOneByUsername,
  findOneByToken,
};
