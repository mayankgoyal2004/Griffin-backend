/**
 * Express middleware that validates req.body, req.query, or req.params against a Zod schema
 */
export const validate = (schema, source = "body") => {
  return async (req, res, next) => {
    try {
      const parsed = await schema.parseAsync(req[source]);
      req[source] = parsed;
      next();
    } catch (error) {
      next(error);
    }
  };
};

