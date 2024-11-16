const collection = "testimonies";
const ErrorQuery = "Error query PostgreSQL";
const db = require("../../../config/database.js");
const wrapper = require("../../../helper/queryWrapper.js");

const insertOne = async (body) => {
  const { id, client_name, description, rating } = body;
  try {
    const query = `
        INSERT INTO ${collection} (id, client_name, description, rating)
        VALUES (?, ?, ?, ?);
    `;
    const values = [id, client_name, description, rating];
    await db.execute(query, values);
    return wrapper.data("Adding data success");
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

module.exports = {
  insertOne,
  deleteOne,
};
