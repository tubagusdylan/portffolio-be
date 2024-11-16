const response = require("../../../helper/responseWrapper");
const query = require("./query");

const getDetailTestiHandler = async (req, res) => {
  const id = req.params.id;
  const testimonie = await query.findOne(id);
  if (testimonie.err) {
    return response.notFound(res, testimonie.message);
  }
  return response.success(res, { message: "Success get testimonie data", data: testimonie.data });
};

const getTestimoniesHandler = async (req, res) => {
  const { page, limit } = req.query;

  const testimonies = await query.findAll(page, limit);
  const count = await query.countAll();
  if (testimonies.err) {
    return response.notFound(res, testimonies.message);
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
    message: "Success get testimonies data",
    data: testimonies.data,
    meta: meta,
  });
};

module.exports = {
  getDetailTestiHandler,
  getTestimoniesHandler,
};
