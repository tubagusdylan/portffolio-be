const collection = "blog_images";
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

const findAll = async (blog_id) => {
  try {
    const query = `
      SELECT id, name, alt
      FROM ${collection}
      WHERE blog_id = ?;
    `;
    const values = [blog_id];
    const [rows] = await db.execute(query, values);
    if (!rows || rows.length === 0) {
      return wrapper.error(ErrorNotFound);
    }
    return wrapper.data(rows);
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

module.exports = {
  findOne,
  findAll,
};
