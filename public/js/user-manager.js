$(document).on("click", ".delUserConfirm", function () {
  var type = $(this).data("title");
  var username = $(this).data("content");
  var id = $(this).data("id");
  $("#confirm_del_user #content").text('Bạn có chắc muốn xóa người dùng ' + username + "?");

  $(".modal-footer #del").attr("value", id);
  $(".modal-footer #deltype").attr("value", type);
});

$(document).on("click", ".roleConfirm", function () {
  const id = $(this).data("id");
  const role = $(this).data("content");

  console.log(role);

  $("#patchRole #role").attr("value", id);
  $("#patchRole #oldrole").attr("value", role);
  $(`#patchRole #role_select option[value=${role}]`).attr('selected','selected');
});

$(document).on("click", ".regConfirm", function () {
  const id = $(this).data("id");
  const content = $(this).data("content");
  var title = $(this).data("title");

  $("#regSubs #SubsContent").text(title + content + "?");
  $("#regSubs #idsubs").attr("value", id);
});

$(document).on("click", ".cateConfirm", function () {
  const id = $(this).data("id");
  const username = $(this).data("content");
  $("#assignCate #asgnCate").text('Phân chuyên mục cho ' + username + ':');
  $("#assignCate #editor").attr("value", id);
});

$("#formRole").on("submit", function (e) {
  const role = $(".roleConfirm").data("content");
  const newRole = $("#formRole #role_select").val();
  if (role === newRole) e.preventDefault();
});

$("#formCate").on("submit", function (e) {
  const newCate = $("#formCate #cate_select").val();
    if (newCate === ''){
      e.preventDefault();
      $(".modal-body #alert").text("Vui lòng chọn chuyên mục mới cho biên tập viên");
    } 
});

$("#general-filter").on("click", function (e) {
  var value = $('#TypeUser').val().toLowerCase();
  if (value === 'all')
    value = '';
  $("tbody tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

$("#subs-filter").on("click", function (e) {
  var value = $('#RemainingTime').val().toLowerCase();
  if (value === 'all')
    value = '';
  $("tbody tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});


