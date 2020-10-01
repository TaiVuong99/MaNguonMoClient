function getpProductByCate(id) {
  var url = "http://localhost/OS-BanQuanAo/public/api/products/cate/" + id;
  $.getJSON(url, function (data) {
  $.each(data, function (key, val) {
    var table = $('#datatable').DataTable();
    table.rows.add([{
      "DT_RowId": val["Id"],
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
      <button class="btn btn-success" onclick="showEditInfo()"><i class="fa fa-edit"></i></button>
      <button class="btn btn-danger" onclick="showDelInfo(this)"><i class="fa fa-trash"></i></button>
      </div>
      `
      }]);
      table.draw();
    });
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

function delProduct(id,cate) {
  var urlString = "http://localhost/OS-BanQuanAo/public/api/products/delete/" + id;
  $.ajax({
    url: urlString,
    type: 'DELETE',
    success: function(response) {
        alert("Xoá thành công");
        var table = $('#datatable').DataTable();
        table
        .clear();
        getpProductByCate(cate);
    },
    error: function(response) {
      console.log(response);
    }
});
}

// click button save
$(function () {
  $('#submitModal').on('click', function (e) {
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
    myObject['name'] = document.getElementById('nameValue').value;
    myObject['image'] = "image";
    myObject['brand'] = document.getElementById('brandValue').options[document.getElementById('brandValue').selectedIndex].id;
    myObject['sku'] = document.getElementById('skuValue').value;
    myObject['attribute'] = document.getElementById('attrValue').options[document.getElementById('attrValue').selectedIndex].id;
    myObject['price'] = document.getElementById('priceValue').value;
    myObject['sale_price'] = document.getElementById('salesPriceValue').value;
    myObject['description'] = document.getElementById('descripValue').value;
    myObject['visibility'] = document.getElementById("visibleValue").options[document.getElementById("visibleValue").selectedIndex].value;
    myObject['date'] = document.getElementById('dateValue').value;
    myObject['cate'] = document.getElementById('cateValue').value;
    var myJSON = JSON.stringify(myObject);
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://localhost/OS-BanQuanAo/public/api/products/add",
      dataType: 'json',
      data: myJSON,
      contentType: 'application/json;charset=UTF-8',
      success: function (response) {
        console.log(response);
        alert("Thêm thành công");
        var table = $('#datatable').DataTable();
        table
        .clear();
        getpProductByCate(myObject['cate']);
      },
      error: function () {
        alert('Error');
      }
    });
    return false;
  });
});

function showEditInfo() {
  chuoi_titleModal = `<a class="text-success">Áo</a>`;
  modalTitleId.innerHTML = chuoi_titleModal;
  chuoi_bodyModal = `<div class="clearfix"></div>`
  modalBodyId.innerHTML = chuoi_bodyModal
  showModal.click();
}

function showDelInfo(elm) {
  var check = confirm(`Bạn muốn xóa sản phẩm khỏi danh sách ?`);
  if(check==true) {
    var al = $(elm).closest('tr').attr('id');
    var url_string = window.location.href;
    var url = new URL(url_string);
    var cate = url.searchParams.get("id");
    delProduct(al,cate);
  }
}
