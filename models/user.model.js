const db = require('../utils/db');

module.exports = {
  all() {
    return db('nguoidung');
  },

  add(user) {
    return db('nguoidung').insert(user);
  },

  patchFieldValue(id, table, fieldname, value) {
    return db(table).where('id',id).update(fieldname,value);
  },

  async findByUserType(type){
    const row = await db('nguoidung').where('LoaiNguoiDung', type);
    if (rows.length === 0)
      return null;
    return row;
  },

  async findByUsername(username) {
    const rows = await db('nguoidung').where('TenDangNhap', username);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

    del(id) {
    return db('nguoidung')
      .where('id', id)
      .del();
  }
};
