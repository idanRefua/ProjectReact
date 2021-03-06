import Joi from "joi-browser";

const addLaptopValidtion = {
  title: Joi.string().min(5).max(20).trim().required(),
  image: Joi.string().min(10).max(255),
  shortinfo: Joi.string().min(10).max(40).required().trim(),
  cpu: Joi.string().min(5).max(20).required().trim(),
  gpu: Joi.string().min(5).max(20).required().trim(),
  ram: Joi.string().min(5).max(20).required().trim(),
  battery: Joi.string().min(5).max(20).required().trim(),
  harddrive: Joi.string().min(5).max(20).required().trim(),
  description: Joi.string().min(20).max(400).required(),
  price: Joi.number().required(),
};

export default addLaptopValidtion;
