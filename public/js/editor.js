function openApproveModal() {
  $("#approveModal").modal();
}

function handleApprove(id) {
  const date = $("#date").val();
  const time = $("#time").val();
  const tags = $("#tag").val();
  const datetime = date.toString() + " " + time.toString() + ":00";

  // alert("date" + date + "time" + time);
  // alert("asd", datetime);
  console.log("time " + datetime);
  if (!date || !time) {
    alert("Ngày hoặc thời gian không hợp lệ.");
    return false;
  }

  if (tags.length === 0) {
    alert("Hãy chọn ít nhất một tag");
    return false;
  }

  const data = {
    listTag: tags,
    idChuyenMucPhu: $("#category").val(),
    NgayDang: datetime,
  };

  console.log(data);
  $("#save").prop("disabled", true);
  $("#cancel").prop("disabled", true);

  fetch("/editor/approve/" + id, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "CSRF-Token": $("#_csrf").val(), // <-- is the csrf token as a header
    },
  })
    .then((res) => {
      console.log("RES", res);
      if (res.status === 200) {
        window.location.href = "/editor/waiting";
      } else {
        alert("Duyệt bài viết thất bại, thử lại sau.");
      }
    })
    .catch((err) => {
      console.log("err", err);
      alert("Duyệt thất bại thử lại sau");
    })
    .finally(() => {
      $("#save").prop("disabled", false);
      $("#cancel").prop("disabled", false);
      $("#cancel").click();
    });
}

function openDenyModal() {
  $("#denyModal").modal();
}

function handleDeny(id) {
  const reason = $("#reason").val();

  if (!reason) {
    alert("Hãy điền lý do từ chối.");
    return false;
  }

  const data = {
    LyDoTuChoi: reason,
  };
  console.log(data);
  $("#saveDeny").prop("disabled", true);
  $("#cancelDeny").prop("disabled", true);

  fetch("/editor/deny/" + id, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // "CSRF-Token": $("#_csrf").val(), // <-- is the csrf token as a header
    },
  })
    .then((res) => {
      if (res.status === 200) {
        window.location.href = "/editor/waiting";
      } else {
        alert("Từ chối bài viết thất bại, thử lại sau.");
      }
    })
    .catch((err) => {
      alert("Từ chối thất bại, thử lại sau.");
    })
    .finally(() => {
      $("#saveDeny").prop("disabled", false);
      $("#cancelDeny").prop("disabled", false);
      $("#cancelDeny").click();
    });
}
