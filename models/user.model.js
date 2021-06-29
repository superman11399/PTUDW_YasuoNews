const db = require("../utils/db");

module.exports = {
  all() {
    return db("NguoiDung");
  },

  add(user) {
    return db("NguoiDung").insert(user);
  },

  async findByUserType(type){
    const row = await db('NguoiDung').where('LoaiNguoiDung', type);
    if (rows.length === 0)
      return null;
    return row;
  },

  async findByUsername(username) {
    const rows = await db("NguoiDung").where("NguoiDung", username);
    if (rows.length === 0) return null;

    return rows[0];
  },
};
