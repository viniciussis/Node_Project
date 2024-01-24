import RequestError from "../errors/RequestError.js";

async function paging(req, res, next) {
  try {
    let { limit = 5, page = 1, sorting = "_id:-1" } = req.query;
    let [field, direction] = sorting.split(":");
    direction = parseInt(direction);
    limit = parseInt(limit);
    page = parseInt(page);

    const result = req.result;
    if (page > 0 && limit > 0) {
      const list = await result.find()
        .sort({ [field]: direction })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate()
        .exec();

      res.status(200).json(list);
    } else {
      next(new RequestError());
    }
  } catch (error) {
    next(error);
  }
}

export default paging;