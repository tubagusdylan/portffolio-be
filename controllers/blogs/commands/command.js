const collection = "blogs";
const ErrorQuery = "Error query PostgreSQL";
const db = require("../../../config/database.js");
const wrapper = require("../../../helper/queryWrapper.js");

const insertOne = async (bodyParams) => {
  const { id, writer_id, title, body, category, tags } = bodyParams;
  try {
    const query = `
        INSERT INTO ${collection} (id, writer_id, title, body, category, tags)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    const values = [id, writer_id, title, body, category, tags];
    await db.execute(query, values);
    return wrapper.data("Adding data success");
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

const updateOne = async (bodyParams, id) => {
  const { title, body, category, tags } = bodyParams;
  try {
    const query = `
        UPDATE ${collection}
        SET title = ?, body = ?, category = ?, tags = ?, updated_at = NOW()
        WHERE id = ?;
    `;
    const values = [title, body, category, tags, id];
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

module.exports = {
  insertOne,
  updateOne,
  deleteOne,
};
