$(document).on("click", ".openConfirm", function () {
    var title = $(this).data("title");
    var content = $(this).data("content");
    var id = $(this).data("id");
    $(".modal-body #content").text(title + content + '?');
    var type = $(this).data("type");

    console.log(id);
    $(".modal-footer #del").attr("value", id);
});

$(document).on("click", ".roleConfirm", function () {
    const id = $(this).data("id");
    const role = $(this).data("content");

    $("#patchRole #role").attr("value", id);
    $("#patchRole #oldrole").attr("value", role);
});

$("#formRole").on('submit', function (e) {
    const role = $(".roleConfirm").data("content");
    const newRole = $("#formRole #role_select").val();
    if (role === newRole)
        e.preventDefault();
});

$("#formFilter").on('submit', function (e) {
    const filter = $("#formFilter #TypeUser").val();
    console.log(filter);
    if (filter==='Loại người dùng')
        e.preventDefault();
});