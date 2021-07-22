$("#download").on("click", function (e) {
  // window.jsPDF = window.jspdf.jsPDF;
  var pdf = new jsPDF("p", "pt", "a4");
  // source can be HTML-formatted string, or a reference
  // to an actual DOM element from which the text will be scraped.
  first = $("#post--content");
  // source = $("#post--content")[0];
  first.find("img").css("width", "100");
  // first.find(".post--content").find("img").css("width", "500");

  // we support special element handlers. Register them with jQuery-style
  // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
  // There is no support for any other type of selectors
  // (class, of compound) at this time.
  specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector
    "#noooo": function (element, renderer) {
      // true = "handled elsewhere, bypass text extraction"
      return true;
    },
  };
  margins = {
    top: 40,
    bottom: 60,
    left: 40,
    width: 200,
  };
  noww = first[0];
  console.log(noww);
  pdf.fromHTML(
    noww, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top,
    {
      // y coord
      width: margins.width, // max width of content on PDF
      // elementHandlers: specialElementHandlers,
    },

    function (dispose) {
      // dispose: object with X, Y of the last line add to the PDF
      //          this allow the insertion of new lines after html
      pdf.save("Test.pdf");
    },
    margins
  );
  // setTimeout(function () {
  //   pdf.save("Test.pdf");
  // }, 0);
  // pdf.save("Test.pdf");
  alert("button clicked");
});

// function demoFromHTML() {}
