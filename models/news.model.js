const db = require("../utils/db");

module.exports = {
  BaiVietNoiBat() {
    return db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .orderByRaw("RAND()")
      .limit(4);
  },
  Top10XemNhieuNhat() {
    return db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .orderBy("LuotXem", "desc")
      .limit(10);
  },
  Top10MoiNhat() {
    return db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .orderBy("NgayDang", "desc")
      .limit(10);
  },
  Top10ChuyenMuc() {
    const id1 = db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .where("BaiBao.idChuyenMucPhu", "1")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .limit(1);
    const id2 = db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .where("BaiBao.idChuyenMucPhu", "2")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .limit(1);
    const id3 = db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .where("BaiBao.idChuyenMucPhu", "3")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .limit(1);
    const id4 = db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .where("BaiBao.idChuyenMucPhu", "4")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .limit(1);
    const id5 = db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .where("BaiBao.idChuyenMucPhu", "5")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .limit(1);
    const id6 = db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .where("BaiBao.idChuyenMucPhu", "6")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .limit(1);
    return db
      .union(id1, true)
      .union(id2, true)
      .union(id3, true)
      .union(id4, true)
      .union(id5, true)
      .union(id6, true);
  },
  LayDanhSachBaiVietTheoChuyenMucPhu(idChuyenMucPhu, offset) {
    return db("BaiBao")
      .where("BaiBao.idChuyenMucPhu", idChuyenMucPhu)
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .offset(offset)
      .limit(6);
  },
  LayDanhSachBaiVietTheoChuyenMucChinh(idChuyenMucChinh, offset) {
    return db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join(
        "ChuyenMucChinh",
        "ChuyenMucPhu.idChuyenMucChinh",
        "=",
        "ChuyenMucChinh.idChuyenMucChinh"
      )
      .where("ChuyenMucChinh.idChuyenMucChinh", idChuyenMucChinh)
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .offset(offset)
      .limit(6);
  },
  LayTagBaiBao() {
    return db("BaiBao_Tag")
      .join("Tag", "Tag.idTag", "=", "BaiBao_Tag.idTag")
      .join("BaiBao", "BaiBao.idBaiBao", "=", "BaiBao_Tag.idBaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .select("BaiBao.idBaiBao", "Tag.idTag", "Tag.TenTag");
  },
  LayDanhSachBaiVietTheoTag(idTag, offset) {
    return db("BaiBao_Tag")
      .where("BaiBao_Tag.idTag", idTag)
      .join("Tag", "Tag.idTag", "=", "BaiBao_Tag.idTag")
      .join("BaiBao", "BaiBao.idBaiBao", "=", "BaiBao_Tag.idBaiBao")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .offset(offset)
      .limit(6);
  },
  async countChuyenMucPhu(idChuyenMucPhu) {
    const rows = await db("BaiBao")
      .where("BaiBao.idChuyenMucPhu", idChuyenMucPhu)
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .count("*", { as: "total" });

    return rows[0].total;
  },
  async countChuyenMucChinh(idChuyenMucChinh) {
    const rows = await db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join(
        "ChuyenMucChinh",
        "ChuyenMucPhu.idChuyenMucChinh",
        "=",
        "ChuyenMucChinh.idChuyenMucChinh"
      )
      .where("ChuyenMucChinh.idChuyenMucChinh", idChuyenMucChinh)
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .count("*", { as: "total" });

    return rows[0].total;
  },
  async countTag(idTag) {
    const rows = await db("BaiBao_Tag")
      .where("BaiBao_Tag.idTag", idTag)
      .join("Tag", "Tag.idTag", "=", "BaiBao_Tag.idTag")
      .join("BaiBao", "BaiBao.idBaiBao", "=", "BaiBao_Tag.idBaiBao")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .count("*", { as: "total" });
    return rows[0].total;
  },
  async ChiTietBaiViet(idBaiBao) {
    const details = await db("BaiBao")
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .where("BaiBao.idBaiBao", idBaiBao)
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .join(
        "ChuyenMucChinh",
        "ChuyenMucPhu.idChuyenMucChinh",
        "=",
        "ChuyenMucChinh.idChuyenMucChinh"
      );
    if (details.length === 0) return null;
    return details[0];
  },
  LayNgauNhien5BaiCungChuyenMuc(idChuyenMuc) {
    return db("BaiBao")
      .where("BaiBao.idChuyenMucPhu", idChuyenMuc)
      .where("BaiBao.TinhTrangDuyet", "Đã xuất bản")
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "BaiBaoDuocDuyet",
        "BaiBao.idBaiBao",
        "=",
        "BaiBaoDuocDuyet.idBaiBao"
      )
      .orderByRaw("RAND()")
      .limit(5);
  },

  LayBinhLuanCuaBaiViet(idBaiBao) {
    const sql = `select ThoiGianBinhLuan,HoTen, NoiDung from binhluan join baibao on baibao.idBaiBao=binhluan.idBaiBao join nguoidung on nguoidung.idNguoiDung=binhluan.idNguoiDung where baibao.idBaiBao=${idBaiBao}`;
    return db.raw(sql);
  },

  search(text, offset) {
    const query =
      "SELECT * FROM BaiBao t1 INNER JOIN ChuyenMucPhu t2 ON t1.idChuyenMucPhu=t2.idChuyenMucPhu INNER JOIN PhongVien t3 ON t1.idTacGia = t3.idPV INNER JOIN BaiBaoDuocDuyet t4 ON t1.idBaiBao = t4.idBaiBao WHERE MATCH (t1.TieuDe,t1.TomTat,t1.NoiDungChiTiet) AGAINST ('" +
      text +
      "' IN NATURAL LANGUAGE MODE) LIMIT " +
      offset +
      ",6;";
    return db.raw(query);
  },

  async countSearch(text) {
    const query =
      "SELECT COUNT(*) total FROM BaiBao t1 INNER JOIN ChuyenMucPhu t2 ON t1.idChuyenMucPhu=t2.idChuyenMucPhu  INNER JOIN PhongVien t3 ON t1.idTacGia = t3.idPV INNER JOIN BaiBaoDuocDuyet t4  ON t1.idBaiBao = t4.idBaiBao WHERE MATCH (t1.TieuDe,t1.TomTat,t1.NoiDungChiTiet) AGAINST ('" +
      text +
      "' IN NATURAL LANGUAGE MODE);";
    const rows = await db.raw(query);
    console.log(rows[0][0]);
    return rows[0][0].total;
  },

  async all() {
    const query = `SELECT b.*, cp.TenChuyenMucPhu, cc.TenChuyenMuc, p.ButDanh, bd.NgayDang, bd.LuotXem
    FROM baibao b LEFT JOIN baibaoduocduyet bd on b.idBaiBao = bd.idBaiBao LEFT JOIN phongvien p on p.idPV = b.idTacGia LEFT JOIN chuyenmucphu cp on cp.idChuyenMucPhu = b.idChuyenMucPhu LEFT JOIN chuyenmucchinh cc on cp.idChuyenMucChinh = cc.idChuyenMucChinh`;
    articles = await db.raw(query);
    if (articles.length === 0) return null;
    return articles[0];
  },

  getAllTagWithDetail() {
    return db("BaiBao_Tag")
      .join("Tag", "Tag.idTag", "=", "BaiBao_Tag.idTag")
      .join("BaiBao", "BaiBao.idBaiBao", "=", "BaiBao_Tag.idBaiBao")
      .select("BaiBao.idBaiBao", "Tag.idTag", "Tag.TenTag");
  },

  async del(id) {
    await db("baibao_tag").where("idBaiBao", id).del();
    return db("baibao").where("idBaiBao", id).del();
  },

  async getCommentOfArticle(idBaiBao) {
    const query = `select * from binhluan join baibao on baibao.idBaiBao=binhluan.idBaiBao join nguoidung on nguoidung.idNguoiDung=binhluan.idNguoiDung where baibao.idBaiBao=${idBaiBao}`;
    row = await db.raw(query);
    if (row.length === 0) return null;
    return row[0];
  },

  delCom(id) {
    return db("binhluan").where("idBL", id).del();
  },

  updatePost(id, subID, status) {
    return db("baibao")
      .where("idBaiBao", id)
      .update("idChuyenMucPhu", subID)
      .update("TinhTrangDuyet", status);
  },

  async getDetailOfPostForAdmin(id) {
    row = await db("baibao").where("idBaiBao",id).leftJoin("chuyenmucphu","baibao.idChuyenMucPhu","=","chuyenmucphu.idChuyenMucPhu");
    if(row.length===0)
      return null;
    return row[0];
  },
};
