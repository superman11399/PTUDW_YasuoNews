const db = require("../utils/db");
const moment = require("moment");
module.exports = {
    async checkUsername(username){
        const rows = await db("nguoidung")
      .whereNot("TinhTrang", 0)
      .andWhere("TenDangNhap", username);
    if (rows.length === 0) return null;

    return rows[0];
    },
    findByUsername(username){
    return db('nguoidung').whereNot("TinhTrang", 0).where('TenDangNhap',username);
    },
    findById(id){
        return db('nguoidung').whereNot("TinhTrang", 0).where('idNguoiDung',id);
    },
    addGuest(user) {
        return db('nguoidung').insert(user);
    },
    saveOTP(OTP,email)
    {

        return db('OTP').insert({MaOTP: OTP, EmailNguoiDung: email});
    },
    async checkOTP(OTP,email){
        const rows = await db("OTP").where("MaOTP", OTP).andWhere("EmailNguoiDung", email);
        if (rows.length === 0) return false;
        const now = moment();
        const OTPtime = moment(rows[0].ThoiGianTao);
        const hourDiff = moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(OTPtime,"DD/MM/YYYY HH:mm:ss"))).asHours;
        if ( hourDiff > 3) return false;
        return true;
    }
}
