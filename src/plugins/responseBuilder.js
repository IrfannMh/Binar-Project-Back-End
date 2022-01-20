function ok(code, data = null) {
  this.status(code).json({
    status: 'OK',
    data,
  });
}

function fail(code, data = null) {
  this.status(code).json({
    status: 'FAIL',
    data,
  });
}

function error(code, err = new Error()) {
  this.status(code).json({
    status: 'ERROR',
    data: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
  });
}

module.exports = {
  ok,
  fail,
  error,
};
