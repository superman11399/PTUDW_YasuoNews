const db = require("../utils/db");

module.exports = {
  all() {
    return db("users");
  },

  add(user) {
    return db("users").insert(user);
  },

  async findByUserType(type){
    const row = await db('users').where('LoaiNguoiDung', type);
    if (rows.length === 0)
      return null;
    
    return row;
  },

  async findByUsername(username) {
    const rows = await db("users").where("username", username);
    if (rows.length === 0) return null;

    return rows[0];
  },
};
