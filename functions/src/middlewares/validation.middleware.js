const z = require("zod");

function validateRequestBody(schema) {
  return function (req, res, next) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).send(error);
      }

      res.status(500).send({ error: "Internal Server Error" });
    }
  };
}

module.exports = {
  validateRequestBody,
};
