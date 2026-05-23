const validate = (schema) => {
  return (req, res, next) => {
    console.log("Validate middleware called");
    console.log("next type:", typeof next);
    console.log("req.body:", req.body);
    
    try {
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        console.log("Validation failed:", result.error.errors);
        return res.status(400).json({ error: result.error.errors });
      }
      
      console.log("Validation passed, calling next");
      return next();
    } catch (error) {
      console.error("Validation error:", error);
      return res.status(400).json({ error: error.message });
    }
  };
};

export default validate;