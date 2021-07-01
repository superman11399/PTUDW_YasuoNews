const db = require("../utils/db");

module.exports = {
  BaiVietNoiBat(){
    return db('BaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').orderByRaw('RAND()').limit(4);
  },
  Top10XemNhieuNhat(){
    return db('BaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').orderBy('LuotXem','desc').limit(10);
  },
  Top10MoiNhat(){
    return db('BaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').orderBy('NgayDang','desc').limit(10);
  },
  Top10ChuyenMuc(){
    const id1 = db('BaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').where('BaiBao.idChuyenMucPhu','1').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').limit(1);
    const id2 = db('BaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').where('BaiBao.idChuyenMucPhu','2').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').limit(1);
    const id3 = db('BaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').where('BaiBao.idChuyenMucPhu','3').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').limit(1);
    const id4 = db('BaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').where('BaiBao.idChuyenMucPhu','4').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').limit(1);
    const id5 = db('BaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').where('BaiBao.idChuyenMucPhu','5').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').limit(1);
    const id6 = db('BaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').where('BaiBao.idChuyenMucPhu','6').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').limit(1);
    return db.union(id1, true).union(id2, true).union(id3, true).union(id4, true).union(id5, true).union(id6, true);
  },
  LayDanhSachBaiVietTheoChuyenMucPhu(idChuyenMucPhu,offset)
  {
    return db('BaiBao').where('BaiBao.idChuyenMucPhu',idChuyenMucPhu).where('BaiBao.TinhTrangDuyet','Đã xuất bản').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').offset(offset).limit(6);
  },
  LayDanhSachBaiVietTheoChuyenMucChinh(idChuyenMucChinh,offset)
  {
    return db('BaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('ChuyenMucChinh','ChuyenMucPhu.idChuyenMucChinh','=','ChuyenMucChinh.idChuyenMucChinh').where('ChuyenMucChinh.idChuyenMucChinh',idChuyenMucChinh).join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').offset(offset).limit(6);
  },
  LayTagBaiBao()
  {
      return db('BaiBao_Tag').join('Tag','Tag.idTag','=','BaiBao_Tag.idTag').join('BaiBao','BaiBao.idBaiBao','=','BaiBao_Tag.idBaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản');
  },
  LayDanhSachBaiVietTheoTag(idTag,offset)
  {
    return db('BaiBao_Tag').where('BaiBao_Tag.idTag',idTag).join('Tag','Tag.idTag','=','BaiBao_Tag.idTag').join('BaiBao','BaiBao.idBaiBao','=','BaiBao_Tag.idBaiBao').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').offset(offset).limit(6);
  },
  async countChuyenMucPhu(idChuyenMucPhu) {
    const rows = await db('BaiBao').where('BaiBao.idChuyenMucPhu',idChuyenMucPhu).where('BaiBao.TinhTrangDuyet','Đã xuất bản').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').count('*', { as: 'total' });

    return rows[0].total;
  },
  async countChuyenMucChinh(idChuyenMucChinh) {
    const rows = await db('BaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('ChuyenMucChinh','ChuyenMucPhu.idChuyenMucChinh','=','ChuyenMucChinh.idChuyenMucChinh').where('ChuyenMucChinh.idChuyenMucChinh',idChuyenMucChinh).join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').count('*', { as: 'total' });

    return rows[0].total;
  },
  async countTag(idTag) {
    const rows = await  db('BaiBao_Tag').where('BaiBao_Tag.idTag',idTag).join('Tag','Tag.idTag','=','BaiBao_Tag.idTag').join('BaiBao','BaiBao.idBaiBao','=','BaiBao_Tag.idBaiBao').join('ChuyenMucPhu','BaiBao.idChuyenMucPhu','=',
    'ChuyenMucPhu.idChuyenMucPhu').join('PhongVien','BaiBao.idTacGia','=',
    'PhongVien.idPV').join('BaiBaoDuocDuyet','BaiBao.idBaiBao','=',
    'BaiBaoDuocDuyet.idBaiBao').where('BaiBao.TinhTrangDuyet','Đã xuất bản').count('*', { as: 'total' });

    return rows[0].total;
  },
};
