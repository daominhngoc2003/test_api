import cloudinary from "../configs/cloudinary.js";

export const uploadImage = async (req, res) => {
  const files = req.files;
  if (!Array.isArray(files)) {
    return res.status(400).json({ error: "Chưa có tập tin nào tải lên" });
  }
  try {
    const uploadPromises = files.map((file) => {
      // Sử dụng Cloudinary API để upload file lên Cloudinary
      return cloudinary.uploader.upload(file.path);
    });
    // Chờ cho tất cả các file đều được upload lên Cloudinary
    const results = await Promise.all(uploadPromises);

    // Trả về kết quả là một mảng các đối tượng chứa thông tin của các file đã upload lên Cloudinary
    const uploadedFiles = results.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
      original_filename: `portfolio-main/${result.original_filename}`,
    }));
    return res.json({ urls: uploadedFiles });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  const id = req.params.id;
  const { original_filename } = req.body;
  try {
    const result = await cloudinary.uploader.destroy(id);
    const resultFile = await cloudinary.uploader.destroy(original_filename);
    if (result.result && resultFile.result === "not found") {
      return res.status(400).json({
        message: "Xóa ảnh thất bại !!!",
        result,
      });
    }
    return res.status(200).json({
      message: "Xóa ảnh thành công",
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error deleting image" });
  }
};

export const updateImage = async (req, res) => {
  const files = req.files;

  if (!Array.isArray(files)) {
    return res.status(400).json({ error: "No files were uploaded" });
  }
  const id = req.params.id; // Lấy publicId của ảnh cần cập nhật
  const { original_filename } = req.body; // Lấy publicId từ file lưu của ảnh cần cập nhật
  const newImage = req.files[0].path; // Lấy đường dẫn của ảnh mới

  try {
    // Upload ảnh mới lên Cloudinary và xóa ảnh cũ cùng lúc
    const [uploadResult, deleteResult, deleteFile] = await Promise.all([
      cloudinary.uploader.upload(newImage),
      cloudinary.uploader.destroy(id),
      cloudinary.uploader.destroy(original_filename),
    ]);
    // Trả về kết quả với url và publicId của ảnh mới
    console.log(uploadResult);
    if (deleteResult.result && deleteFile.result == "not found") {
      cloudinary.uploader.destroy(uploadResult.public_id),
        cloudinary.uploader.destroy(
          `portfolio-main/${uploadResult.original_filename}`
        );
      return res.status(404).json({
        message: "Không tìm thấy Id nào xin kiểm tra lại",
      });
    }
    if (!uploadResult) {
      return res.status(200).json({
        message: "Update ảnh thất bại",
      });
    }
    return res.status(200).json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      original_filename: `portfolio-main/${uploadResult.original_filename}`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message || "Error updating image" });
  }
};
