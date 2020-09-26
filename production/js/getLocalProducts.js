
function appendText() {
  //var txt1 = "<p>Text.</p>";        // Create text with HTML
  var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
  //var txt3 = document.createElement("p");
  //txt3.innerHTML = "Text.";         // Create text with DOM
  $("tbody").append(txt2);   // Append new elements
}
  // loadBrands();


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
        <div style="display: inline-flex" >
        <button class="btn btn-success" id="editProduct" onclick="showEditInfo()"><i class="fa fa-edit"></i></button>
        <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
        </div>
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
function showEditInfo(){
  chuoi_titleModal = `<a class="text-success">Áo</a>`;
  modalTitleId.innerHTML = chuoi_titleModal;
  show_editInfo.click();
}

function loadBrands() {
   $.getJSON("http://localhost/OS-BanQuanAo/public/api/brands", function (data) {
      $.each(data, function (key, val) {
        $('#brandValue').append("<option id='"+val['Id']+"'>"+val['Name']+"</option>"); 
      });
     });
}
function loadAttributes() {
   $.getJSON("http://localhost/OS-BanQuanAo/public/api/attributes", function (data) {
      $.each(data, function (key, val) {
        $('#attrValue').append("<option id='"+val['Id']+"'>"+val['Size']+' - '+val['Color']+"</option>"); 
      });
     });
}

$(function() {

$('#submitModal').on('click', function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "http://localhost/OS-BanQuanAo/public/api/products/add",
        data: $('form.tagForm').serialize(),
        success: function(response) {
            alert(response['response']);
        },
        error: function() {
            alert('Error');
        }
    });
    return false;
});
});

$(document).ready(function () {
  getjson();
});
