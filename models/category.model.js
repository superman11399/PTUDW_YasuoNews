const db = require("../utils/db");

module.exports = {
  allMainCate() {
    return db("chuyenmucchinh");
  },

  allSubCate() {
    return db("chuyenmucphu");
  },

  all() {
    return db("chuyenmucphu").join("chuyenmucchinh",'chuyenmucphu.idChuyenMucChinh','=','chuyenmucchinh.idChuyenMucChinh');
  },

  add(row, table) {
    return db(table).insert(row);
  },

  del(IDname, idVal, table) {
    return db(table).where(IDname, idVal).del();
  },

  delMainCate(id){
    return this.del("idChuyenMucChinh",id, "chuyenmucchinh");
  },

  delSubCate(id){
    return this.del("idChuyenMucPhu",id, "chuyenmucphu");
  },

  patch(IDname, idVal, table, field, newVal) {
    return db(table).where(IDname, idVal).update(field, newVal);
  },

  patchRow(row, idName, table){
    const id = row.id;
    delete row.id;
    return db(table).where(idName, id).update(row);
  },

  async findNonAssignedCate(){
    const query =`SELECT c.idChuyenMucChinh, c.TenChuyenMuc
    FROM chuyenmucchinh c
    WHERE c.idChuyenMucChinh NOT IN (
    SELECT e.idChuyenMucChinh
    FROM editor e
		WHERE e.idChuyenMucChinh is not NULL)`;
    row = await db.schema.raw(query);
    if (row.length === 0)
      return null;
    return row[0];
  },

  async findCategoryWithDetail(){
    const query = `SELECT c.*, COUNT(b.idBaiBao) as soBaiBao, COUNT(DISTINCT p.idChuyenMucPhu) as soChuyenMucCon
    FROM (chuyenmucchinh c LEFT JOIN chuyenmucphu p on c.idChuyenMucChinh = p.idChuyenMucChinh) LEFT JOIN baibao b on b.idChuyenMucPhu = p.idChuyenMucPhu
    GROUP BY c.idChuyenMucChinh`;
    row = await db.raw(query);
    return row[0];
  },

  async findSubCategoryWithDetail(){
    const query = `SELECT p.*, c.TenChuyenMuc, COUNT(b.idBaiBao) as soBaiBao
    FROM (chuyenmucphu p JOIN chuyenmucchinh c on c.idChuyenMucChinh = p.idChuyenMucChinh) LEFT JOIN baibao b on b.idChuyenMucPhu = p.idChuyenMucPhu
    GROUP BY p.idChuyenMucPhu`;
    row = await db.raw(query);
    return row[0];
  }
};