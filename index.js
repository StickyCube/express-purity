var purity = require('purity');
var ok = require('ok-js');

module.exports = {
  Types: purity.Types,

  ValidationError: purity.ValidationError,

  createDataType: purity.createDataType,

  Schema: function (definition, options) {
    var schema;
    var target;
    var modify;

    options = options || {};

    target = options.target || 'body';
    modify = typeof options.modify === 'boolean'
      ? options.modify
      : true;

    schema = purity.Schema(definition, options);

    return function (req, res, next) {
      var data = ok.get(req, target);

      schema.validate(data, function (err, res) {
        if (err) return next(err);
        if (!modify) return next();

        ok.set(req, target, res);
        return next();
      });
    };
  }
};
