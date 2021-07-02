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