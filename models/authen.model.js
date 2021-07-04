const db = require("../utils/db");

module.exports = {
    async checkUsername(username){
        const rows = await db("nguoidung")
      .whereNot("TinhTrang", 0)
      .andWhere("TenDangNhap", username);
    if (rows.length === 0) return null;

    return rows[0];
    },
    async findByUsername(username){
    return db('nguoidung').where('TenDangNhap',username);
    },
    findById(id){
        return db('nguoidung').where('idNguoiDung',id);
    },
    addGuest(user) {
        return db('nguoidung').insert(user);
    },
}
