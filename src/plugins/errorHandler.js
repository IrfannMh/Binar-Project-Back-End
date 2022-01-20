exports.onError = (err, _req, res, _next) => res.error(500, err);
exports.onLost = (req, res) =>
  res.fail(404, {
    method: req.method,
    url: req.url,
  });
