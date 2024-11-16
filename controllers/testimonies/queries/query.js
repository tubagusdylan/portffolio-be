const collection = "testimonies";
const ErrorQuery = "Error query PostgreSQL";
const ErrorNotFound = "Data not found, please try another input";
const db = require("../../../config/database.js");
const wrapper = require("../../../helper/queryWrapper.js");

const findOne = async (id) => {
  try {
    const query = `
        SELECT * FROM ${collection}
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

const findAll = async (page, limit) => {
  try {
    const offset = limit * (page - 1);
    const query = `
        SELECT * FROM ${collection}
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?;
    `;
    const values = [limit, offset.toString()];
    const [rows] = await db.execute(query, values);
    if (!rows || rows === 0) {
      return wrapper.error(ErrorNotFound);
    }
    return wrapper.data(rows);
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

const countAll = async () => {
  try {
    const query = `SELECT COUNT(id) AS count FROM ${collection}`;
    const [rows] = await db.execute(query);
    if (!rows || rows.length === 0) {
      return wrapper.error(ErrorNotFound);
    }
    return wrapper.data(rows[0].count);
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

module.exports = {
  findOne,
  findAll,
  countAll,
};
