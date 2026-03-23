exports.success = (message, data) => {
  return { message, data };
};

exports.getUniqueID = (users) => {
  const ids = users.map((user) => user.id);
  const maxId = ids.reduce((a, b) => Math.max(a, b));
  const newId = maxId + 1;

  return newId;
};
