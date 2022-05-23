import Joi from "joi-browser";

const addSmartPhoneProductSchema = {
  title: Joi.string().min(5).max(20).trim().required(),
  image: Joi.string().min(10).max(255),
  shortinfo: Joi.string().min(10).max(40).required().trim(),
  cpu: Joi.string().min(5).max(20).required().trim(),
  ram: Joi.string().min(5).max(20).required().trim(),
  battery: Joi.string().min(4).max(20).trim().required(),
  camera: Joi.string().min(5).max(20).trim().required(),
  screen: Joi.string().min(5).max(30).trim().required(),
  description: Joi.string().min(20).max(400).required(),
  price: Joi.number().required(),
};

export default addSmartPhoneProductSchema;
