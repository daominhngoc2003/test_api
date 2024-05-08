// import Joi from "joi";
import Information from "../models/information.js";
import { informationSchema } from "../schemas/information.js";

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = informationSchema.validate(body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        messages: error.details.map((message) => ({ message })),
      });
    }
    const data = await Information.create(body);
    if (!data) {
      return res.status(200).json({
        message: "Thêm thất bại",
      });
    }
    return res.status(201).json({
      message: "Thêm thành công",
      data,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(403).json({
        message: `Địa chỉ email đã tồn tại`,
      });
    }
    return res.status(400).json({
      message: error,
    });
  }
};

export const getAll = async (req, res) => {
  const {
    _limit = 10,
    _sort = "createAt",
    _order = "asc",
    _page = 1,
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order == "desc" ? -1 : 1,
    },
  };

  try {
    const data = await Information.paginate({}, options);
    if (data == 0) {
      return res.status(404).json({
        message: "Không tìm thấy thông tin cá nhân nào",
      });
    }
    return res.status(200).json({
      message: "Lấy danh sách thông tin cá nhân thành công",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Information.findOne({ _id: id });
    console.log(data);
    if (!data) {
      return res.status(200).json({
        message: "Không tìm thấy thông tin cá nhân nào",
      });
    }
    return res.status(200).json({
      message: "Lấy thông tin cá nhân thành công",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const { isHardDelete } = req.body;
    console.log("1" + id);
    console.log("2" + isHardDelete);
    const information = await Information.findById(id);
    if (!information) {
      return res.status(404).json({
        message: "Không tìm thấy thông tin cá nhân",
      });
    }
    // Nếu client gửi lên isHardDelete = id của db thì xóa thông tin cá nhân vĩnh viễn ngược lại thì xóa mềm
    if (isHardDelete == id) {
      await Information.deleteOne({ _id: isHardDelete });
      return res.status(200).json({
        message: "Xóa thông tin cá nhân vĩnh viễn thành công",
        data: information,
      });
    } else if (isHardDelete != id) {
      await information.delete();
      return res.status(200).json({
        message: "Xóa thông tin cá nhân thành công",
        data: information,
      });
    } else {
      return res.status(200).json({
        message: "Xoá thất bại, Xin hãy kiểm tra lại ",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Xóa Thông tin cá nhân thất bại",
      error: error.message,
    });
  }
};
export const restore = async (req, res) => {
  try {
    const id = req.params.id;
    // const user = req.user;
    const information = await Information.findOne({ _id: id });
    console.log("hiih", information);
    // if (!user.role || user.role !== "admin") {
    //     return res.status(403).json({
    //         message: "Bạn không có quyền phục hồi thông tin cá nhân",
    //     });
    // }
    if (information) {
      return res.status(400).json({
        message: "Thông tin cá nhân chưa chuyển tới thùng rác",
      });
    }
    const restoredInformation = await Information.restore({ _id: id });
    return res.status(200).json({
      message: "Phục hồi thông tin cá nhân thành công",
      data: restoredInformation,
    });
  } catch (error) {
    res.status(400).json({
      message: "Phục hồi thông tin cá nhân không thành công",
      error: error.message,
    });
  }
};
