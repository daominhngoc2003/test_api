import Joi from "joi";
const productSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'name' là bắt buộc",
  }),
  desc: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'desc' là bắt buộc",
  }),
  image: Joi.array().required().messages({
    "array.empty": "Không được bỏ trống ảnh",
    "any.required": "Trường 'image' là bắt buộc",
  }),
  demo: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'demo' là bắt buộc",
  }),
  git: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'git' là bắt buộc",
  }),
  categoryId: Joi.string().required(),
});

export default productSchema;
