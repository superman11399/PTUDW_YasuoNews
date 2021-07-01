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

  async assignCate(row){
    isExisted = await this.checkExist('idBTV',row.idBTV,'editor');
    console.log(isExisted);
    if(isExisted)
      return this.patch('idBTV',row.idBTV,'editor','idChuyenMucChinh', row.idChuyenMucChinh);
    else
      return this.add(row,'editor');
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

  async findSubscriberWithDetail() {
    const query = `select *, TIMESTAMPDIFF(MINUTE,NOW(),s.NgayHetHan) as soPhut
    from nguoidung nd JOIN subscriber s ON nd.idNguoiDung = s.idDocGia`;
    row = await db.schema.raw(query);
    if (row.length === 0)
      return null;
    return row[0];
  },

  async findEditorWithDetail() {
    const row = await db('nguoidung').join('editor', 'idNguoiDung','=','idBTV').join('chuyenmucchinh','chuyenmucchinh.idChuyenMucChinh','=','editor.idChuyenMucChinh');
    if (row.length === 0)
      return null;
    return row;
  },

  async findWriterWithDetail() {
    const query =`SELECT *
    FROM (SELECT nd.*, w.ButDanh, COUNT(b.idBaiBao) as tongBaiBao 
          FROM (nguoidung nd JOIN writer w on nd.idNguoiDung = w.idPV) LEFT JOIN baibao b on w.idPV = b.idTacGia
          WHERE nd.LoaiNguoiDung ='writer'
          GROUP BY nd.idNguoiDung) as A
          LEFT JOIN
          (SELECT wp.idPV, COUNT(bd.idBaiBao) as soBaiDaDang
          FROM (writer wp LEFT JOIN baibao bp on wp.idPV = bp.idTacGia) LEFT JOIN baibaoduocduyet bd on bp.idBaiBao = bd.idBaiBao
          GROUP BY wp.idPV) as B
          on A.idNguoiDung = B.idPV`;
    row = await db.schema.raw(query);
    if (row.length === 0)
      return null;
    return row[0];
  },

};