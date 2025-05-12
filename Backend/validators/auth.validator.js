const { z } = require("zod");

const passwordRule =  z.string()
  .min(4, {message: "Password must be atleast 4 characters long"})
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?]).*$/, 
    {message: "Password must have at least one uppercase, one lowercase, one number and one special character"});


const signupSchema = z.object({
  username: z.string()
    .min(2, {message: "Username must be atleast 2 characters"})
    .max(20, {message: "Username cannot exceed 20 characters"})
    .trim()
    .toLowerCase()
    .regex(/^[a-zA-Z0-9]+$/, { message: "Username cannot contain special characters" }),

  name: z.string()
    .min(2, {message: "Username must be atleast 2 characters long"})
    .max(30, {message: "Username cannot exceed 30 characters"})
    .trim(),

  email: z.string()
    .email({message: "Invalid email address"})
    .trim()
    .toLowerCase(),

  password: passwordRule,
});


const signinSchema = z
  .object({
      username: z.string()
        .min(2, {message: "Username must be atleast 2 characters"})
        .max(20, {message: "Username cannot exceed 20 characters"})
        .trim()
        .toLowerCase()
        .optional(),

      email: z.string()
        .email({message: "Invalid email address"})
        .trim()
        .toLowerCase()
        .optional(),

      password: passwordRule,
  })
  .refine((data) => data.email || data.username, {
    message: "Either email or username is required"
  });


  const updateUserSchema = z
    .object({
      username: z.string()
        .min(2, {message: "Username must be atleast 2 characters"})
        .max(20, {message: "Username cannot exceed 20 characters"})
        .trim()
        .toLowerCase()
        .optional(),
    
      name: z.string()
        .min(2, {message: "Username must be atleast 2 characters long"})
        .max(30, {message: "Username cannot exceed 30 characters"})
        .trim()
        .optional(),
    
      email: z.string()
        .email({message: "Invalid email address"})
        .trim()
        .toLowerCase()
        .optional(),
    
      password: passwordRule.optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "Atleast one field(username | name | email | password) must be provided"
    });
  


  module.exports = { signupSchema, signinSchema, updateUserSchema };
