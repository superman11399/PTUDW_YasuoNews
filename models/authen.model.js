const db = require("../utils/db");
const moment = require("moment");
const bcrypt = require("bcryptjs");
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
    },
    async checkUniqueEmail(email){
        const rows = await db("nguoidung").whereNot("TinhTrang", 0).where("Email", email);
        if (rows.length === 0) return true;
        return false;
    },
    isAuth(req, res, next) {
        if (res.locals.auth) {
            next();
        } else {
            const url = req.headers.referer || '/news/home';
            res.redirect(url);
        }
    },
    isNotAuth(req, res, next) {
        if (!res.locals.auth) {
            next();
        } else {
            const url = req.headers.referer || '/news/home';
            res.redirect(url);
        }
    },
    isAdmin(req, res, next) {
        if (res.locals.auth && res.locals.authUser.LoaiNguoiDung == 'admin') {
            next();
        } else {
            const url = req.headers.referer || '/news/home';
            res.redirect(url);
        }
    },
    isWriter(req, res, next) {
        if (res.locals.auth && res.locals.authUser.LoaiNguoiDung == 'writer') {
            next();
        } else {
            const url = req.headers.referer || '/news/home';
            res.redirect(url);
        }
    },
    isEditor(req, res, next) {
        if (res.locals.auth && res.locals.authUser.LoaiNguoiDung == 'editor') {
            next();
        } else {
            const url = req.headers.referer || '/news/home';
            res.redirect(url);
        }
    },
    isSubcriber(req, res, next) {
        if (res.locals.auth && res.locals.authUser.LoaiNguoiDung == 'subcriber') {
            next();
        } else {
            const url = req.headers.referer || '/news/home';
            res.redirect(url);
        }
    },
    layButDanh(idNguoiDung)
    {
        return db('phongvien').where("idPV", idNguoiDung);
    },
    CapNhat(idNguoiDung, HoTen,Email,NgaySinh)
    {
        return db('nguoidung').whereNot("TinhTrang", 0).where('idNguoiDung',idNguoiDung)
        .update({HoTen:HoTen, Email:Email, NgaySinh:NgaySinh});
    },
    CapNhatButDanh(idNguoiDung, ButDanh)
    {
        return db('phongvien').where('idPV',idNguoiDung)
        .update({ButDanh:ButDanh});
    },
    changePasswordWithEmail(email,password)
    {
        const hash = bcrypt.hashSync(password, 10);
        return db('nguoidung').whereNot("TinhTrang", 0).where('Email',email)
        .update({MatKhau:hash});
    },
    async checkPasswordMatch(id,password)
    {
        const rows = await db("nguoidung").whereNot("TinhTrang", 0).where("idNguoiDung", id);
        if (rows.length === 0) return false;
        const checkPass = await bcrypt.compareSync(password, rows[0].MatKhau);
        if (!checkPass) return false;
        return true;
    },
    changePasswordWithId(id,password)
    {
        const hash = bcrypt.hashSync(password, 10);
        return db('nguoidung').whereNot("TinhTrang", 0).where('idNguoiDung',id)
        .update({MatKhau:hash});
    },
}
