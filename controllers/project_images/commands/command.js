const collection = "project_images";
const ErrorQuery = "Error query PostgreSQL";
const db = require("../../../config/database.js");
const wrapper = require("../../../helper/queryWrapper.js");

const insertOne = async (body) => {
  const { id, project_id, name, alt } = body;
  try {
    const query = `
        INSERT INTO ${collection} (id, project_id, name, alt)
        VALUES (?, ?, ?, ?);
    `;
    const values = [id, project_id, name, alt];
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
