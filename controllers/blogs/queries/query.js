const collection = "blogs";
const ErrorQuery = "Error query PostgreSQL";
const ErrorNotFound = "Data not found, please try another input";
const db = require("../../../config/database.js");
const wrapper = require("../../../helper/queryWrapper.js");

const findOne = async (id) => {
  try {
    const query = `
      SELECT 
        b.id,
        b.title,
        b.body,
        b.category,
        b.tags,
        b.created_at,
        b.updated_at,
        u.profile_name AS writer_name
      FROM ${collection} b
      LEFT JOIN users u ON b.writer_id = u.id
      WHERE b.id = ?
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
      SELECT 
        b.id,
        b.title,
        b.body,
        b.category,
        b.tags,
        b.created_at,
        b.updated_at,
        u.profile_name AS writer_name
      FROM ${collection} b
      LEFT JOIN users u ON b.writer_id = u.id
      ORDER BY b.updated_at DESC
      LIMIT ? OFFSET ?;`;
    const values = [limit, offset.toString()];
    const [rows] = await db.execute(query, values);
    if (!rows || rows.length === 0) {
      return wrapper.error(ErrorNotFound);
    }
    return wrapper.data(rows);
  } catch (error) {
    return wrapper.error(ErrorQuery);
  }
};

const findAllWithFilter = async (page, limit, title, category) => {
  try {
    const offset = limit * (page - 1);
    const query = `
      SELECT 
        b.id,
        b.title,
        b.body,
        b.category,
        b.tags,
        b.created_at,
        b.updated_at,
        u.profile_name AS writer_name
      FROM ${collection} b
      LEFT JOIN users u ON b.writer_id = u.id
      WHERE b.title LIKE ? OR b.category LIKE ?
      ORDER BY b.updated_at DESC
      LIMIT ? OFFSET ?;`;
    const values = [`%${title}%`, `%${category}%`, limit, offset.toString()];
    const [rows] = await db.execute(query, values);
    if (!rows || rows.length === 0) {
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

const countAllWithFilter = async (title, category) => {
  try {
    const query = `
        SELECT COUNT(id) AS count FROM ${collection}
        WHERE title LIKE ? OR category LIKE ?;
    `;
    const values = [`%${title}%`, `%${category}%`];
    const [rows] = await db.execute(query, values);
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
  findAllWithFilter,
  countAll,
  countAllWithFilter,
};