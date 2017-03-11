
exports.ValidationEmail = function ValidateEmail(mail) {
  if (/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true);
  }
  return (true);
};
