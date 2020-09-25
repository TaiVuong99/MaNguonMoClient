
function appendText() {
  //var txt1 = "<p>Text.</p>";        // Create text with HTML
  var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
  //var txt3 = document.createElement("p");
  //txt3.innerHTML = "Text.";         // Create text with DOM
  $("tbody").append(txt2);   // Append new elements
}

$(document).ready(function () {

  //appendText();
  getjson();
});

function getjson() {
  $.getJSON("http://localhost/OS-BanQuanAo/public/api/products", function (data) {
    //var items = [];
    $.each(data, function (key, val) {
      //items.push( "<li id='" + key + "'>" + val + "</li>" );
      var table = $('#datatable').DataTable();
      table.rows.add([{
        0: val["Image"],
        1: val["Name"],
        2: val["SKU"],
        3: val["Brand"],
        4: val["Size"] + " - " + val["Color"],
        5: val["Price"] + " VND",
        6: val["Sale Price"] + " VND",
        7: val["Date"],
        8: `
        <button class="btn btn-success"><i class="fa fa-edit"></i></button>
        <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
        <a class="btn btn-success"><i class="fa fa-edit"></i></a>
        <a class="btn btn-danger"><i class="fa fa-trash"></i></a>
        `
      }])
        .draw();
    });

    //$( ".shirt_data" ).append( "</tbody>" );

    // $( "<ul/>", {
    //   "class": "my-new-list",
    //   html: items.join( "" )
    // }).appendTo( "body" );
  });
}