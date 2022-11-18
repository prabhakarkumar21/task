const UserModel = require("../model/user.model");
const DataModel = require("../model/data.model");
const reader = require("xlsx");
const path = require("path");
const upload = async (req, res) => {
  try {
    let fileLocation = req.files?.excel.tempFilePath;
    const file = reader.readFile(fileLocation);
    let data = [];
    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      let temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }

    DataModel.insertMany(data)
      .then((saved) => {
        res.json({
          success: true,
          message: "Excel data is uploaded to DB",
        });
      })
      .catch((error) => {
        res.json({
          success: false,
          msg: error.message,
          error,
        });
      });
  } catch (error) {
    // server error
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

const datas = async (req, res) => {
  try {
    let page;
    let limit;
    page = parseInt(req.query.page) || 1;
    limit = parseInt(req.query.limit) || 80;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};
    const length = await DataModel.countDocuments().exec();
    result.total_count = length;
    result.total_pages = Math.ceil(length / limit);
    if (result.total_pages < page) {
      result.msg = "Page Number exceeds limit!";
      result.results = [];
      return res.json(result);
    }
    if (endIndex < length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    result.results = await DataModel.find(
      {},
      {
        __v: 0,
        updatedAt: 0,
        createdAt: 0,
      }
    )
      .limit(limit)
      .skip(startIndex);
    res.paginatedResult = result;
    return res.json(result);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: e,
    });
  }
};
module.exports = {
  upload,
  datas,
};
