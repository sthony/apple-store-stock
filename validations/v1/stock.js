const Validator = require('validatorjs');

module.exports = {
  index: (req, res, next) => {
    const rules = {
      model: 'required|string',
      postal_code: 'required|string', 
      location: 'required|string'
    };

    const validation = new Validator(req.query, rules, {});

    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(422).json({
        message: errors[Object.keys(errors)[0]][0],
      });
    }
  },
};
