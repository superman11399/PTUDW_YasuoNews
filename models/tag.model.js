const db = require("../utils/db");
const { findByID } = require("./user.model");

module.exports = {
  add(row, table) {
    return db(table).insert(row);
  },

  all(){
    return db("tag");
  },

  del(IDname, idVal, table) {
    return db(table).where(IDname, idVal).del();
  },

  patch(IDname, idVal, table, field, newVal) {
    return db(table).where(IDname, idVal).update(field, newVal);
  },

  async delTag(id){
    await this.del('idTag',id,'baibao_tag');
    return this.del('idTag',id,'tag');
  },

  async findByID(id) {
    const rows = await db("tag").where("idTag", id);
    if (rows.length === 0) return null;

    return rows[0];
  },

  async allWithDetail() {
    const query = `SELECT t.*, COUNT(bt.idBaiBao) as numberOfNews
    FROM tag t LEFT JOIN baibao_tag bt on t.idTag = bt.idTag
    GROUP BY t.idTag`;

    rows = await db.schema.raw(query);

    if(rows.length === 0)
        return null;

    return rows[0];
  },
};
