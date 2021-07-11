$("#file").change(handleChangeFile);

function handleChangeCover() {
  $("#file").click();
}

function handleChangeFile() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = (e) => {
      $("#avatar").attr("src", e.target.result);
      console.log(this.files[0].type);
    };

    reader.readAsDataURL(this.files[0]);
  }
}
function checkSubmit(urlHandle) {
  const content = $("#content").val();
  var desc = CKEDITOR.instances.content.getData();
  const arrayOfTags = $("#arrayOfTags").val();
  console.log(desc);
  if (!desc.length) {
    alert("Nội dung bài viết không được để trống");
    return false;
  }
  if (arrayOfTags.length === 0) {
    alert("Tag không được để trống");
    return false;
  }

  return true;
}
