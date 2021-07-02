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

  patch(IDname, idVal, table, field, newVal) {
    return db(table).where(IDname, idVal).update(field, newVal);
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
  }
};