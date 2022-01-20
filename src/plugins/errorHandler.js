exports.onError = (err, req, res, next) => res.error(500, err);
exports.onLost = (req, res) =>
  res.fail(404, {
    method: req.method,
    url: req.url,
  });
