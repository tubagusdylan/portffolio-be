const response = require("../../../helper/responseWrapper");
const query = require("./query");

const getDetailProjectHandler = async (req, res) => {
  const id = req.params.id;
  const project = await query.findOne(id);
  if (project.err) {
    return response.notFound(res, project.message);
  }
  return response.success(res, { message: "Success get project data", data: project.data });
};

const getProjectsHandler = async (req, res) => {
  const { page, limit, title, tech_stack } = req.query;

  let projects, count;
  if (title || tech_stack) {
    projects = await query.findAllWithFilter(page, limit, title, tech_stack);
    count = await query.countAllWithFilter(title, tech_stack);
  } else {
    projects = await query.findAll(page, limit);
    count = await query.countAll();
  }

  if (projects.err) {
    return response.notFound(res, projects.message);
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
    message: "Success get projects data",
    data: projects.data,
    meta: meta,
  });
};

module.exports = {
  getDetailProjectHandler,
  getProjectsHandler,
};
