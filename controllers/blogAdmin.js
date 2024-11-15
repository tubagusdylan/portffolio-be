const db = require("../config/database.js");

const getBlogs = async (req, res) => {
  const { page, size } = req.query;
  try {
    const query = `SELECT * FROM blog_cms ORDER BY created_at DESC LIMIT ${(Number(page) - 1) * Number(size)}, ${Number(
      size
    )}`;
    const [rows] = await db.query(query);
    if (rows.length === 0) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Data not found",
        data: {},
        meta: {
          page: 1,
          size: Number(size),
        },
      });
    }

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Data found",
      data: {
        blogs: rows,
      },
      meta: {
        page: Number(page),
        size: Number(size),
      },
    });
  } catch (error) {
    res.status(409).json({
      code: 409,
      success: false,
      error: error,
    });
  }
};

const addBlog = async (req, res) => {
  const { userId, title, body, summary, category, createdBy } = req.body;
  if (!title || !body || !summary || !category) {
    return res.status(400).json({
      code: 400,
      success: false,
      message: "Data should not be null",
    });
  }
  try {
    const blogId = `blog-${(Math.random() + 1).toString(16).substring(4)}`;
    const query = `
        INSERT INTO blog_cms (blog_id, user_id, title, body, summary, category, created_by) 
        VALUES ('${blogId}', '${userId}', '${title}', '${body}', '${summary}', '${category}', '${createdBy}')
    `;
    await db.query(query);
    res.status(201).json({
      code: 201,
      success: true,
      message: "Added blog success",
    });
  } catch (error) {
    res.status(409).json({
      code: 409,
      success: false,
      error: error,
    });
  }
};

const getDetailBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const query = `SELECT * FROM blog_cms WHERE blog_id='${blogId}'`;
    const [rows] = await db.query(query);
    if (rows.length === 0) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Data not found",
      });
    }
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Data found",
      data: {
        blog: rows,
      },
    });
  } catch (error) {
    res.status(409).json({
      code: 409,
      success: false,
      error: error,
    });
  }
};

const updateBlog = async (req, res) => {
  const { blogId, userId, title, body, summary, category } = req.body;
  if (!title || !body || !summary || !category) {
    return res.status(400).json({
      code: 400,
      success: false,
      message: "Data should not be null",
    });
  }
  try {
    const query = `SELECT user_id FROM blog_cms WHERE blog_id='${blogId}'`;
    const [rows] = await db.query(query);
    if (rows[0].user_id !== userId) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Can't edit other user blogs",
      });
    }
  } catch (error) {
    res.status(409).json({
      code: 409,
      success: false,
      error: error,
    });
  }
  try {
    const query = `UPDATE blog_cms SET title='${title}', body='${body}', summary='${summary}', category='${category}' WHERE blog_id='${blogId}'`;
    await db.query(query);

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Blog has been updated",
    });
  } catch (error) {
    res.status(409).json({
      code: 409,
      success: false,
      error: error,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { userId } = req.body;
    const query_1 = `SELECT user_id FROM blog_cms WHERE blog_id='${blogId}'`;
    const [rows] = await db.query(query_1);
    if (rows.length === 0) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Blog not found",
      });
    }
    if (rows[0].user_id !== userId) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Can't delete other user blogs",
      });
    }

    const query_2 = `DELETE FROM blog_cms WHERE blog_id='${blogId}'`;
    await db.query(query_2);

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Blog has been deleted",
    });
  } catch (error) {
    res.status(409).json({
      code: 409,
      success: false,
      error: error,
    });
  }
};

module.exports = { getBlogs, addBlog, getDetailBlog, updateBlog, deleteBlog };
