
export default (schema) => {
    return (req, res, next) => {
      try {
        const allParams = {...req.body, ...req.query};
    
        const { error } = schema.validate(
            allParams,
          { abortEarly: false }
        );
    
        if (error) {
          return res
            .status(400)
            .json({ message: error.details.map((err) => err.message).join(", ") });
        }
        
        next();
      } catch (err) {
        return next({ status: 400, message: "Invalid data format. Ensure all fields are properly structured." });
      }
    };

}
