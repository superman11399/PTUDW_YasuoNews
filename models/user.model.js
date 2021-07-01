const db = require("../utils/db");

module.exports = {
  all() {
    return db("nguoidung");
  },

  add(user) {
    return db("nguoidung").insert(user);
  },

  add(row, table) {
    return db(table).insert(row);
  },

  del(IDname, idVal, table) {
    return db(table).where(IDname, idVal).del();
  },

  patch(IDname, idVal, table, field, newVal) {
    return db(table).where(IDname, idVal).update(field, newVal);
  },

  patchRole(id, value) {
    return this.patch('idNguoiDung', id, 'nguoidung', 'LoaiNguoiDung', value);
  },

  async checkExist(IDname, idVal, table){
    row = await db(table).where(IDname, idVal);
    if (row.length === 0)
      return false;
    return true;
  },

  async findByUsername(username) {
    const rows = await db("nguoidung").where("TenDangNhap", username);
    if (rows.length === 0) return null;

    return rows[0];
  },

  async findByID(id) {
    const rows = await db("nguoidung").where("idNguoiDung", id);
    if (rows.length === 0) return null;

    return rows[0];
  },

      // switch(oldvalue){
    //   case "editor":
    //     this.del('idBTV', id, "bientapvien");
    //     break;
    //   case "writer":
    //     this.del('idPV', id, "bientapvien");
    //     break;
    //   default:
    // }
    // chua hoan thanh

  async findByUserType(type) {
    const row = await db('nguoidung').where('LoaiNguoiDung', type);
    if (row.length === 0)
      return null;
    return row;
  },
};