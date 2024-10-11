import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("TEACHER", "STUDENT", "ADMIN").required(),
});

export const validateUser = (data) => {
  const { error } = userSchema.validate(data);
  if (error) {
    return {
      isValid: false,
      message: error.details[0].message,
    };
  }
  return { isValid: true };
};
