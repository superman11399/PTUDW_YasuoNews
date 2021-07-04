const db = require("../utils/db");

module.exports = {
    findByUsername(username){
        return db('NguoiDung').where('TenDangNhap',username);
    },
    findById(id){
        return db('NguoiDung').where('idNguoiDung',id);
    },
    addGuest(user) {
        return db('NguoiDung').insert(user);
    },
}
