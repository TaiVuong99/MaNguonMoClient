
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
        <button class="btn btn-danger" id="delProduct" onclick="showDelInfo()"><i class="fa fa-trash"></i></button>
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

function loadBrands() {
  $.getJSON("http://localhost/OS-BanQuanAo/public/api/brands", function (data) {
    $.each(data, function (key, val) {
      $('#brandValue').append("<option id='" + val['Id'] + "'>" + val['Name'] + "</option>");
    });
  });

}
function loadAttributes() {
  $.getJSON("http://localhost/OS-BanQuanAo/public/api/attributes", function (data) {
    $.each(data, function (key, val) {
      $('#attrValue').append("<option id='" + val['Id'] + "'>" + val['Size'] + ' - ' + val['Color'] + "</option>");
    });
  });
}

$(function () {

  $('#submitModal').on('click', function (e) {
    //alert("test");
    var myObject = {
      name: "",
      image: "",
      brand: "",
      sku: "",
      attribute: "",
      price: "",
      sale_price: "",
      description: "",
      visibility: "",
      date: "",
      cate: ""
    };
    // alert("test2");
    myObject['name'] = document.getElementById('nameValue').value;
    // alert(myObject['name']);
    myObject['image'] = "image";
    //alert(myObject[image]);
    myObject['brand'] = document.getElementById('brandValue').options[document.getElementById('brandValue').selectedIndex].id;
    //alert(myObject['brand']);
    myObject['sku'] = document.getElementById('skuValue').value;
    myObject['attribute'] = document.getElementById('attrValue').options[document.getElementById('attrValue').selectedIndex].id;
    myObject['price'] = document.getElementById('priceValue').value;
    myObject['sale_price'] = document.getElementById('salesPriceValue').value;
    myObject['description'] = document.getElementById('descripValue').value;
    myObject['visibility'] = document.getElementById("visibleValue").options[document.getElementById("visibleValue").selectedIndex].value;
    myObject['date'] = document.getElementById('dateValue').value;
    myObject['cate'] = document.getElementById('cateValue').value;
    var myJSON = JSON.stringify(myObject);
    alert("test2");
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://localhost/OS-BanQuanAo/public/api/products/add",
      dataType: 'json',
      data: myJSON,
      contentType: 'application/json;charset=UTF-8',
      success: function (response) {
        alert(response['response']);
        alert("success");
      },
      error: function () {
        alert('Error');
        //console.log(myObject['name']);
        console.log(JSON.parse(myJSON));
      }
    });
    return false;
    // debugger;

  });
});

$(document).ready(function () {
  getjson();
});

function showEditInfo() {
  chuoi_titleModal = `<a class="text-success">Áo</a>`;
  modalTitleId.innerHTML = chuoi_titleModal;
  chuoi_bodyModal = `<div class="clearfix"></div>`
  modalBodyId.innerHTML = chuoi_bodyModal
  showModal.click();
}

function showDelInfo() {
  confirm(`Bạn muốn xóa sản phẩm khỏi danh sách ?`)
}
