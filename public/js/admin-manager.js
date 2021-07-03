//Xử lý xóa tag
$(document).on("click", ".delTagConfirm", function () {
    const id = $(this).data("id");
    const tenTag = $(this).data("content");
    $("#deleteTagModal #content").text('Bạn có chắc muốn xóa tag ' + tenTag + '?');
    $("#deleteTagModal #del").attr("value", id);
  });
  
  //Xử lý đổi tên tag
  $(document).on("click", ".patchTagName", function () {
    const id = $(this).data("id");
    const tenTag = $(this).data("content");
    $("#renameTagModal #tagName").val(tenTag);
    $("#renameTagModal #idTag").attr("value", id);
  });

  $(document).on("click", ".deleteCateConfirm", function () {
    const id = $(this).data("id");
    const tenCate = $(this).data("title");
    $("#deleteTagModal #content").text('Bạn có chắc muốn xóa chuyên mục ' + tenCate + '?');
    $("#deleteTagModal #del").attr("value", id);
  });

  $("#cate-filter").on("click", function (e) {
    var value = $('#type-cate option:selected').text();
    console.log(value);
    if (value === 'Tất cả chuyên mục')
      value = '';
    $("tbody tr").filter(function () {
      $(this).toggle($(this).text().indexOf(value) > -1);
    });
  });

  $(document).on("click", ".deleteMainCateConfirm", function () {
    const id = $(this).data("id");
    const tenCate = $(this).data("title");
    const soCon = $(this).data("content");
  
    $("#deleteMainCategory #idCateDel").attr("value", id);
    $("#deleteMainCategory #so").attr("value", soCon);
    $("#deleteMainCategory #delContent").text('Bạn có chắc muốn xóa chuyên mục ' + tenCate + "?");
  });

  $("#frmDelMain").on("submit", function (e) {
    const soCon = $("#frmDelMain #so").val();
    if (+soCon != 0){
      e.preventDefault();
      $("#deleteMainCategory #delContent").text("Không thể thực hiện. Vui lòng xóa hoặc đổi chuyên mục cha cho các chuyên mục con!");
    }
  });

  $(document).on("click", ".deleteSubCateConfirm", function () {
    const id = $(this).data("id");
    const tenCate = $(this).data("title");
    const soBai = $(this).data("content");

    $("#deleteSubCategory #idCateDel").attr("value", id);
    $("#deleteSubCategory #so").attr("value", soBai);
    $("#deleteSubCategory #delContent").text('Bạn có chắc muốn xóa chuyên mục ' + tenCate + "?");
  });

  $("#frmDelSub").on("submit", function (e) {
    const soBai = $("#deleteSubCategory #so").val();
    if (+soBai != 0){
      e.preventDefault();
      $("#deleteSubCategory #delContent").text("Không thể thực hiện. Vui lòng xóa hoặc đổi chuyên mục cho các bài báo!");
    }
  });

  $(document).on("click", ".renameMainCateConfirm", function () {
    const id = $(this).data("id");
    const tenCate = $(this).data("title");
  
    $("#renameMainCategory #mainCateID").attr("value", id);
    $("#renameMainCategory #newMainCateName").val(tenCate);
  });

  $(document).on("click", ".updateSubConfirm", function () {
    const id = $(this).data("id");
    const tenCate = $(this).data("title");
    const tenCha = $(this).data("content");
  
    $("#updateSubCategory #subCateID").attr("value", id);
    $("#updateSubCategory #newSubCateName").val(tenCate);
    $(`#updateSubCategory #subCate_parent option:contains(${tenCha})`).attr('selected', true);
  });
  