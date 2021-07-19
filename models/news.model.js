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
  LayDanhSachTag() {
    return db("tag");
  },
  LayDanhSachChuyenMucPhu() {
    return db("chuyenmucphu");
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
  async ChiTietBaiVietVer2(idBaiBao) {
    const details = await db("BaiBao")
      .where("BaiBao.idBaiBao", idBaiBao)
      .join(
        "ChuyenMucPhu",
        "BaiBao.idChuyenMucPhu",
        "=",
        "ChuyenMucPhu.idChuyenMucPhu"
      )
      .join("PhongVien", "BaiBao.idTacGia", "=", "PhongVien.idPV")
      .join(
        "ChuyenMucChinh",
        "ChuyenMucPhu.idChuyenMucChinh",
        "=",
        "ChuyenMucChinh.idChuyenMucChinh"
      );
    if (details.length === 0) return null;
    return details[0];
  },
  async ChiTietBaiVietThuocBTV(idBaiBao, idBTV) {
    const sql = `select * from editor e join chuyenmucphu p on p.idChuyenMucChinh=e.idChuyenMucChinh join baibao b on b.idChuyenMucPhu=p.idChuyenMucPhu join phongvien pv on pv.idPV=b.idTacGia where idbtv=${idBTV} and b.idBaiBao=${idBaiBao}`;
    return db.raw(sql);
  },
  ThemBaiBaoDuocDuyet(bb) {
    return db("baibaoduocduyet").insert(bb);
  },
  LayDanhSachTagCuaBaiViet(idBaiBao) {
    const sql = `SELECT * FROM baibao_tag where idBaiBao=${idBaiBao}`;
    const res = db.raw(sql);
    return res;
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
    const sql = `select ThoiGianBinhLuan,tenNguoiDung, NoiDung from binhluan where binhluan.idBaiBao=${idBaiBao}`;
    return db.raw(sql);
  },
  TangView(idBaiBao) {
    const sql = `update baibao join baibaoduocduyet on baibao.idBaiBao=baibaoduocduyet.idBaiBao set LuotXem=LuotXem+1 where baibao.idBaiBao=${idBaiBao}`;
    return db.raw(sql);
  },
  AddComment(cmt) {
    return db("binhluan").insert(cmt);
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
  all() {
    return db("baibao")
      .leftJoin(
        "baibaoduocduyet",
        "baibao.idBaiBao",
        "=",
        "baibaoduocduyet.idBaiBao"
      )
      .leftJoin("PhongVien", "baibao.idTacGia", "=", "PhongVien.idPV")
      .leftJoin(
        "chuyenmucphu",
        "chuyenmucphu.idChuyenMucPhu",
        "=",
        "baibao.idChuyenMucPhu"
      )
      .leftJoin(
        "chuyenmucchinh",
        "chuyenmucphu.idChuyenMucChinh",
        "=",
        "chuyenmucchinh.idChuyenMucChinh"
      );
  },
  ThemBaiViet(baibao) {
    return db("baibao").insert(baibao);
  },
  del(IDname, idVal, table) {
    return db(table).where(IDname, idVal).del();
  },
  XoaBaiBaoDuocDuyet(id) {
    return this.del("idBaiBao", id, "baibaoduocduyet");
  },
  XoaBinhLuanBaiViet(id) {
    // const sql = `delete from baibao_tag where idbaibao=${id}`;
    const res4 = db("binhluan").del().where({ idBaiBao: id });
    return res4;
  },
  XoaBaiViet(id) {
    // const res3 = db("baibaoduocduyet").del().where({ idBaiBao: id });
    const res = db("baibao").del().where({ idBaiBao: id });
    // console.log("res:", res, "|res2:", res2, "|res3:", res3, "|res4:", res4);
    return res;
  },
  XoaTagBaiViet(id) {
    // const sql = `delete from baibao_tag where idbaibao=${id}`;
    const res = db("baibao_tag").del().where({ idBaiBao: id });
    return res;
  },
  UpdateBaiViet(id, baibao) {
    delete baibao.idBaiBao;
    return db("baibao").where("idBaiBao", id).update(baibao);
  },
  ThemTagBaiViet(idBaiBao, idTag) {
    const content = {
      idBaiBao,
      idTag,
    };
    return db("baibao_tag").insert(content);
  },
  LayDanhSachBaiVietTheoTinhTrangVaTacGia(tinhTrang, idTacgia) {
    const sql = `SELECT * FROM baibao b join chuyenmucphu p on p.idChuyenMucPhu=b.idChuyenMucPhu join chuyenmucchinh cmc on cmc.idChuyenMucChinh= p.idChuyenMucChinh  where b.TinhTrangDuyet="${tinhTrang}" and b.idTacGia=${idTacgia} GROUP BY b.idBaiBao`;
    //LEFT JOIN baibao_tag bt on bt.idBaiBao=b.idBaiBao left join tag on tag.idTag=bt.idTag
    return db.raw(sql);
  },
  LayDanhSachBaiVietTheoTinhTrangVaBTV(tinhTrang, idBTV) {
    const sql = `select * from editor e join chuyenmucphu p on p.idChuyenMucChinh=e.idChuyenMucChinh join baibao b on b.idChuyenMucPhu=p.idChuyenMucPhu join phongvien pv on pv.idPV=b.idTacGia where idbtv=${idBTV} and TinhTrangDuyet="${tinhTrang}"`;
    //LEFT JOIN baibao_tag bt on bt.idBaiBao=b.idBaiBao left join tag on tag.idTag=bt.idTag
    return db.raw(sql);
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
    await db("binhluan").where("idBaiBao", id).del();
    await db("baibaoduocduyet").where("idBaiBao", id).del();
    return db("baibao").where("idBaiBao", id).del();
  },

  async getCommentOfArticle(idBaiBao) {
    return db('binhluan').where("idBaiBao",idBaiBao);
  },

  delCom(id) {
    return db("binhluan").where("idBL", id).del();
  },

  themVaoBaiXuatBan(id){
    const query = `insert into baibaoduocduyet value(${id},NOW(),0)`;
    return db.raw(query);
  },

  async updatePost(id, subID, status) {
    if(status==="Đã xuất bản"){
      await this.themVaoBaiXuatBan(id);
    } 
    return db("baibao")
      .where("idBaiBao", id)
      .update("idChuyenMucPhu", subID)
      .update("TinhTrangDuyet", status);
  },

  async getDetailOfPostForAdmin(id) {
    row = await db("baibao").where("idBaiBao",id).leftJoin("chuyenmucphu","baibao.idChuyenMucPhu","=","chuyenmucphu.idChuyenMucPhu").leftJoin("phongvien","idTacGia","=","idPV");
    if(row.length===0)
      return null;
    return row[0];
  },
};
