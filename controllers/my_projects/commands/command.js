const collection = "my_projects";
const ErrorQuery = "Error query PostgreSQL";
const db = require("../../../config/database.js");
const wrapper = require("../../../helper/queryWrapper.js");

const insertOne = async (body) => {
  const { id, user_id, title, tech_stack, github_url, web_url } = body;
  try {
    const query = `
        INSERT INTO ${collection} (id, user_id, title, tech_stack, github_url, web_url)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    const values = [id, user_id, title, tech_stack, github_url, web_url];
    await db.execute(query, values);
    return wrapper.data("Adding data success");
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

const updateOne = async (body, id) => {
  const { title, tech_stack, github_url, web_url } = body;
  try {
    const query = `
      UPDATE ${collection}
      SET title = ?, tech_stack = ?, github_url = ?, web_url = ?
      WHERE id = ?;
    `;
    const values = [title, tech_stack, github_url, web_url, id];
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
