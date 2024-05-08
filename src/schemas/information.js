import Joi from "joi";

export const informationSchema = Joi.object({
  preface: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'preface' là bắt buộc",
  }),
  text1: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'nickname' là bắt buộc",
  }),
  text2: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'nickname' là bắt buộc",
  }),
  nickname: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'nickname' là bắt buộc",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'email' là bắt buộc",
    "string.email": "Email không tồn tại",
  }),
  github: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'github' là bắt buộc",
  }),
  introduce: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'introduce' là bắt buộc",
  }),
  avatar: Joi.array().required().messages({
    "array.empty": "Không được bỏ trống",
    "any.required": "Trường 'avatar' là bắt buộc",
  }),
  fullname: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'fullname' là bắt buộc",
  }),
  education: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'education' là bắt buộc",
  }),
  location: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'location' là bắt buộc",
  }),
  overview: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống",
    "any.required": "Trường 'overview' là bắt buộc",
  }),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
  deletedAt: Joi.date().default(null),
  deleted: Joi.boolean().default(false),
});
