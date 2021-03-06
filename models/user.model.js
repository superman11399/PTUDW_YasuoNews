const db = require("../utils/db");

module.exports = {
  all() {
    return db("nguoidung").whereNot("TinhTrang", 0);
  },

  addUserWithDetail(user, detail) {
    if (user.LoaiNguoiDung === "writer") {
      return this.addWriter(user);
    } else if (user.LoaiNguoiDung === "subscriber") {
      return this.addSubscriber(user);
    } else if (user.LoaiNguoiDung === "editor") {
      return this.addEditor(user, detail);
    } else if (user.LoaiNguoiDung === "admin") {
      return this.addAdmin(user, detail);
    } else return db("nguoidung").insert(user);
  },

  async addWriter(user) {
    const id = await this.add(user, "nguoidung");
    const query = `INSERT INTO PhongVien value(${id[0]},'Ẩn danh')`;
    return db.raw(query);
  },

  async addAdmin(user) {
    const id = await this.add(user, "nguoidung");
    const query = `INSERT INTO PhongVien value(${id[0]},'admin')`;
    return db.raw(query);
  },

  async addSubscriber(user) {
    const id = await this.add(user, "nguoidung");
    const query = `INSERT INTO subscriber value(${id[0]},NOW() + INTERVAL 7 DAY)`;
    return db.raw(query);
  },

  async addEditor(user, cateID) {
    const id = await this.add(user, "nguoidung");
    const query = `INSERT INTO editor value(${id[0]},${cateID})`;
    return db.raw(query);
  },

  add(row, table) {
    return db(table).insert(row);
  },

  del(IDname, idVal, table) {
    return db(table).where(IDname, idVal).del();
  },

  async delUser(id, type) {
    // if (type === "editor") {
    //   const query = `UPDATE editor SET idChuyenMucChinh = NULL WHERE idBTV = ${id}`;
    //   await db.raw(query);
    // }
    if (type === "editor") {
      await this.del("idBTV", id, "editor");
    }
    if (type === "subscriber") {
      await this.del("idDocGia", id, "subscriber");
    }
    return this.patch("idNguoiDung", id, "NguoiDung", "TinhTrang", 0);
  },

  patch(IDname, idVal, table, field, newVal) {
    return db(table).where(IDname, idVal).update(field, newVal);
  },

  async patchRole(id, newrole, oldrole) {
    console.log("This is id: " + id);
    if (oldrole === "editor") {
      await this.del("idBTV", id, "editor");
    }
    if (oldrole === "subscriber") {
      await this.del("idDocGia", id, "subscriber");
    }

    await this.addRowWhenPatchRole(id, newrole);
    return this.patch("idNguoiDung", id, "NguoiDung", "LoaiNguoiDung", newrole);
  },

  addRowWhenPatchRole(id, role) {
    if (role === "editor") {
      const query = `INSERT INTO editor value(${id},NULL)`;
      return db.raw(query);
    }
    if (role === "subscriber") {
      now = db.fn.now();
      const query = `INSERT INTO subscriber value(${id}, NOW())`;
      return db.raw(query);
    }
    if (role === "writer") {
      const query = `INSERT INTO PhongVien value(${id},'Ẩn danh')`;
      return db.raw(query);
    }
    if (role === "admin") {
      const query = `INSERT INTO PhongVien value(${id},'admin')`;
      return db.raw(query);
    }
  },

  async assignCate(row) {
    isExisted = await this.checkExist("idBTV", row.idBTV, "editor");
    if (isExisted)
      return this.patch(
        "idBTV",
        row.idBTV,
        "editor",
        "idChuyenMucChinh",
        row.idChuyenMucChinh
      );
    else return this.add(row, "editor");
  },

  async checkExist(IDname, idVal, table) {
    row = await db(table).where(IDname, idVal);
    if (row.length === 0) return false;
    return true;
  },

  async findByUsername(username) {
    const rows = await db("nguoidung")
      .whereNot("TinhTrang", 0)
      .andWhere("TenDangNhap", username);
    if (rows.length === 0) return null;

    return rows[0];
  },

  async findByID(id) {
    const rows = await db("nguoidung")
      .whereNot("TinhTrang", 0)
      .andWhere("idNguoiDung", id);
    if (rows.length === 0) return null;

    return rows[0];
  },

  async findByUserType(type) {
    const row = await db("nguoidung")
      .whereNot("TinhTrang", 0)
      .andWhere("LoaiNguoiDung", type);
    if (row.length === 0) return null;
    return row;
  },

  async findSubscriberWithDetail() {
    const query = `select nd.*,
    CASE WHEN TIMESTAMPDIFF(MINUTE,NOW(),s.NgayHetHan) > 0 THEN TIMESTAMPDIFF(MINUTE,NOW(),s.NgayHetHan)
    ELSE 0
    END AS soPhut,
    CASE WHEN TIMESTAMPDIFF(MINUTE,NOW(),s.NgayHetHan) > 0 THEN 'Còn hạn'
    ELSE 'Hết hạn'
    END AS TTrang
from nguoidung nd JOIN subscriber s ON nd.idNguoiDung = s.idDocGia
WHERE nd.TinhTrang != 0`;
    row = await db.schema.raw(query);
    if (row.length === 0) return null;
    return row[0];
  },

  async findEditorWithDetail() {
    const query = `SELECT nd.*, c.*
    FROM (nguoidung nd JOIN editor e on nd.idNguoiDung = e.idBTV) LEFT JOIN chuyenmucchinh c on e.idChuyenMucChinh = c.idChuyenMucChinh
    WHERE nd.TinhTrang != 0`;
    row = await db.schema.raw(query);
    if (row.length === 0) return null;
    return row[0];
  },

  findWriter() {
    return db("phongvien");
  },

  async findWriterWithDetail() {
    const query = `SELECT *
    FROM (SELECT nd.*, w.ButDanh, COUNT(b.idBaiBao) as tongBaiBao 
          FROM (nguoidung nd JOIN PhongVien w on nd.idNguoiDung = w.idPV) LEFT JOIN baibao b on w.idPV = b.idTacGia
          WHERE nd.LoaiNguoiDung ='writer'
          GROUP BY nd.idNguoiDung) as A
          LEFT JOIN
          (SELECT wp.idPV, COUNT(bd.idBaiBao) as soBaiDaDang
          FROM (PhongVien wp LEFT JOIN baibao bp on wp.idPV = bp.idTacGia) LEFT JOIN baibaoduocduyet bd on bp.idBaiBao = bd.idBaiBao
          GROUP BY wp.idPV) as B
          on A.idNguoiDung = B.idPV
    WHERE TinhTrang != 0`;
    row = await db.schema.raw(query);
    if (row.length === 0) return null;
    return row[0];
  },

  renewSubs(id) {
    const query = `update subscriber set NgayHetHan = NOW() + INTERVAL 7 DAY where idDocGia = '${id}'`;
    return db.raw(query);
  },

  async findUserWithDetail(id) {
    row = await this.findByID(id);
    type = String(row.LoaiNguoiDung);
    if (type === "editor") {
      const query = `SELECT nd.*, c.*
      FROM (nguoidung nd JOIN editor e on nd.idNguoiDung = e.idBTV) LEFT JOIN chuyenmucchinh c on e.idChuyenMucChinh = c.idChuyenMucChinh
      WHERE nd.TinhTrang != 0 AND nd.idNguoiDung = ${id}`;
      user = await db.raw(query);
      if (user.length === 0) return null;
      return user[0][0];
    } else if (type === "writer") {
      const query = `SELECT *
      FROM (SELECT nd.*, w.ButDanh, COUNT(b.idBaiBao) as tongBaiBao 
            FROM (nguoidung nd JOIN PhongVien w on nd.idNguoiDung = w.idPV) LEFT JOIN baibao b on w.idPV = b.idTacGia
            WHERE nd.LoaiNguoiDung ='writer'
            GROUP BY nd.idNguoiDung) as A
            LEFT JOIN
            (SELECT wp.idPV, COUNT(bd.idBaiBao) as soBaiDaDang
            FROM (PhongVien wp LEFT JOIN baibao bp on wp.idPV = bp.idTacGia) LEFT JOIN baibaoduocduyet bd on bp.idBaiBao = bd.idBaiBao
            GROUP BY wp.idPV) as B
            on A.idNguoiDung = B.idPV
      WHERE TinhTrang != 0 AND idNguoiDung = ${id}`;
      user = await db.raw(query);
      console.log(user);
      if (user.length === 0) return null;
      return user[0][0];
    } else if (type === "subscriber") {
      const query = `select nd.*,
      CASE WHEN TIMESTAMPDIFF(MINUTE,NOW(),s.NgayHetHan) > 0 THEN TIMESTAMPDIFF(MINUTE,NOW(),s.NgayHetHan)
      ELSE 0
      END AS soPhut,
      CASE WHEN TIMESTAMPDIFF(MINUTE,NOW(),s.NgayHetHan) > 0 THEN 'Còn hạn'
      ELSE 'Hết hạn'
      END AS TTrang
  from nguoidung nd JOIN subscriber s ON nd.idNguoiDung = s.idDocGia
  WHERE nd.TinhTrang != 0 AND nd.idNguoiDung = ${id}`;
      user = await db.raw(query);
      if (user.length === 0) return null;
      return user[0][0];
    } else {
      return row;
    }
  },

  ThuHoiSubscriber(id) {
    const query = `update nguoidung set LoaiNguoiDung = "guest" where idNguoiDung = '${id}'`;
    return db.raw(query);
  },
};
