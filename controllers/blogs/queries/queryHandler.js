const response = require("../../../helper/responseWrapper");
const query = require("./query");

const getDetailBlogHandler = async (req, res) => {
  const id = req.params.id;
  const blog = await query.findOne(id);
  if (blog.err) {
    return response.notFound(res, blog.message);
  }
  return response.success(res, { message: "Success get blogs data", data: blog.data });
};

const getBlogsHandler = async (req, res) => {
  const { page, limit, title, category } = req.query;

  let blogs, count;
  if (title || category) {
    blogs = await query.findAllWithFilter(page, limit, title, category);
    count = await query.countAllWithFilter(title, category);
  } else {
    blogs = await query.findAll(page, limit);
    count = await query.countAll();
  }

  if (blogs.err) {
    return response.notFound(res, blogs.message);
  }

  const totalData = count.data;
  const totalPages = Math.ceil(totalData / limit);
  const meta = {
    page: page,
    per_page: limit,
    total_data: Math.max(totalData, 0),
    total_pages: totalPages,
  };

  return response.successPagination(res, {
    message: "Success get blogs data",
    data: blogs.data,
    meta: meta,
  });
};

module.exports = {
  getDetailBlogHandler,
  getBlogsHandler,
};
