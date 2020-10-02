var flag = 0;
var url_string = window.location.href;
var url = new URL(url_string);
var cate_id = url.searchParams.get("id");
var local_folder = "D:\\New folder\\MaNguonMoClient\\images\\";

function getProductByCate(id) {
  var url = "http://localhost/OS-BanQuanAo/public/api/products/cate/" + id;
  var filename = "";
  // $.getJSON(url, function (data) {
  //   //var img = "";
  //   var table = $('#datatable').DataTable();
  //   $.each(data, function (key, val) {
  //     //img = local_folder + val["Image"];
  //     table.rows.add([{
  //       "DT_RowId": val["Id"],
  //       0: val["Name"],
  //       1: val["SKU"],
  //       2: val["Brand"],
  //       3: val["Size"] + " - " + val["Color"],
  //       4: val["Price"], //" VND",
  //       5: val["Sale Price"],// + " VND",
  //       6: val["Date"],
  //       7: `
  //     <div style="display: inline-flex" >
  //     <button class="btn btn-success" onclick="showEditInfo(this)" name="btnUpdate"><i class="fa fa-edit"></i></button>
  //     <button class="btn btn-danger" onclick="showDelInfo(this)"><i class="fa fa-trash"></i></button>
  //     </div>
  //     `
  //     }]);
  //     table.draw();
  //   });
  //   console.log(data);
  // });
  $(document).ready(function() {
  $('#datatable').DataTable({
    destroy: true,
    // "columnDefs": [
    // { "width": "1%", "targets": 0 }
    // ],
    "ajax": {
      "url":url,
      "dataSrc": function (json) {
      var return_data = new Array();
      for(var i=0;i< json.length; i++){
        filename = json[i].Image.replace(/C:\\fakepath\\/i, '');
        return_data.push({
          "DT_RowId" : json[i].Id,
          'Image': '<img src="'+local_folder + filename +'" style="width: 100%;">',
          'Name'  : json[i].Name,
          'SKU' : json[i].SKU,
          'Brand': json[i].Brand,
          'Size': json[i].Size,
          'Color': json[i].Color,
          'Price': json[i].Price,
          'Sale Price': json[i]["Sale Price"],
          'Date': json[i].Date
        })
      }
      return return_data;
    }
    },
    "columns": [
        // { "width": "1%" },
        // {
        //   "render": function (data, type, JsonResultRow, meta) {
        //     return '<img src="'+local_folder+ 'data': 'Image' +'" style="max-width: 100%;">';
        //   }
        // },
        { 'data': 'Image'},
        { 'data': 'Name' },
        { 'data': 'SKU' },
        { 'data': 'Brand' },
        //{ 'data': 'Size' },  
        {
          "data": null,
          "render": function(data, type, full, meta){
          return full["Size"] + " - " + full["Color"];
          }
        },
        { 'data': 'Price' },
        { 'data': 'Sale Price' },
        { 'data': 'Date' },
        {
          "render": function (data, type, JsonResultRow, meta) {
            return `<div style="display: inline-flex" >
       <button class="btn btn-success" onclick="showEditInfo(this)" name="btnUpdate"><i class="fa fa-edit"></i></button>
       <button class="btn btn-danger" onclick="showDelInfo(this)"><i class="fa fa-trash"></i></button>
       </div>`;
          }
        }
    ]
});
  } );
}

function getProductById(id) {
  var url = "http://localhost/OS-BanQuanAo/public/api/products/" + id;
  $.getJSON(url, function (data) {
    document.getElementById("descripValue").value = data.Description;
    var currentStatus = data.visibility;
    $("#visibleValue option:contains(" + currentStatus + ")").attr('selected', 'selected');
  });
}

function loadBrands() {
  $.getJSON("http://localhost/OS-BanQuanAo/public/api/brands", function (data) {
    $.each(data, function (key, val) {
      $('#brandValue').append("<option id='brand_" + val['Id'] + "'>" + val['Name'] + "</option>");
    });
  });
}
function loadAttributes() {
  $.getJSON("http://localhost/OS-BanQuanAo/public/api/attributes", function (data) {
    $.each(data, function (key, val) {
      $('#attrValue').append("<option id='attr_" + val['Id'] + "'>" + val['Size'] + ' - ' + val['Color'] + "</option>");
    });
  });
}

function delProduct(id) {
  var urlString = "http://localhost/OS-BanQuanAo/public/api/products/delete/" + id;
  $.ajax({
    url: urlString,
    type: 'DELETE',
    success: function (response) {
      alert("Xoá thành công");
      var table = $('#datatable').DataTable();
      table
        .clear();
      getProductByCate(cate_id);
    },
    error: function (response) {
      console.log(response);
    }
  });
}

// click button save
$(function () {
  $('#submitModal').on('click', function (e) {
    var checkedType = "";
    var checkedUrl = "";
    var resString = "";
    if (flag == 0) {
      checkedType = "POST";
      checkedUrl = "http://localhost/OS-BanQuanAo/public/api/products/add";
      resString = "Thêm thành công";
    }
    else {
      checkedType = "PUT";
      checkedUrl = "http://localhost/OS-BanQuanAo/public/api/products/update/" + $(':hidden#IdValue').val();
      resString = "Sửa thành công";
    }
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
    myObject['image'] = document.getElementById('imageValue').value;
    var brand_id = document.getElementById('brandValue').options[document.getElementById('brandValue').selectedIndex].id.substring(6);
    myObject['brand'] = brand_id;
    myObject['sku'] = document.getElementById('skuValue').value;
    var attr_id = document.getElementById('attrValue').options[document.getElementById('attrValue').selectedIndex].id.substring(5);
    myObject['attribute'] = attr_id;
    myObject['price'] = document.getElementById('priceValue').value;
    myObject['sale_price'] = document.getElementById('salesPriceValue').value;
    myObject['description'] = document.getElementById('descripValue').value;
    myObject['visibility'] = document.getElementById("visibleValue").options[document.getElementById("visibleValue").selectedIndex].value;
    myObject['date'] = document.getElementById('dateValue').value;
    myObject['cate'] = cate_id;
    if (myObject['name'] == "" || myObject['sku'] == "" || myObject['price'] == "" || myObject['sale_price'] == "" || myObject['description'] == "" || myObject['date'] == "" || myObject['image'] == "") {
      alert('Vui lòng nhập đầy đủ thông tin sản phẩm');
      return false;
    }
    var myJSON = JSON.stringify(myObject);
    e.preventDefault();
    $.ajax({
      type: checkedType,
      url: checkedUrl,
      dataType: 'json',
      data: myJSON,
      contentType: 'application/json;charset=UTF-8',
      success: function (response) {
        console.log(response);
        var table = $('#datatable').DataTable();
        table
          .clear();
        getProductByCate(myObject['cate']);
        alert(resString);
      },
      error: function () {
        alert('Error');
      }
    });
    return false;
  });
});

function showEditInfo(elm) {
  flag = 1;
  chuoi_titleModal = `<a class="text-success">Sửa sản phẩm</a>`;
  modalTitleId.innerHTML = chuoi_titleModal;
  chuoi_bodyModal = `
        <div class="form-group">
          <label for="nameValue"> Ảnh: </label>
         <input type="file" accept=".png, .jpeg, .jpg" id="imageValue" name="image" required>
        </div>
        <div class="form-group">
          <label for="nameValue"> Tên: </label>
          <input class="form-control" id="nameValue" name="name" required>
        </div>
        <div class="form-group">
          <label for="skuValue"> SKU: </label>
          <input class="form-control" id="skuValue" name="sku" required>
        </div>
        <div class="form-group">
          <label for="brandValue"> Thương hiệu: </label>
          <select class="form-control" id="brandValue" name="brand">
          </select>
        </div>
        <div class="form-group">
          <label for="attrValue"> Thuộc tính: </label>
          <select class="form-control" id="attrValue" name="attribute">
          </select>
        </div>
        <div class="form-group">
          <label for="priceValue"> Giá: </label>
          <input type="number" class="form-control" id="priceValue" min="0" name="price" placeholder="VND" required> 
          </input>
        </div>
        <div class="form-group">
          <label for="salesPriceValue"> Giá khuyến mãi: </label>
          <input type="number" class="form-control" id="salesPriceValue" min="0" name="sale_price" placeholder="VND" required>
        </div>
        <div class="form-group">
          <label for="dateValue"> Ngày nhập: </label>
          <input type="date" class="form-control" id="dateValue" name="date" required>
        </div>
        <div class="form-group">
          <label for="descripValue"> Mô tả: </label>
          <input type="text" class="form-control" id="descripValue" name="description" required>
        </div>
        <div class="form-group">
          <label for="visibleValue"> Trạng thái: </label>
          <select id="visibleValue" class="form-control" name="visibility">
            <option id="pub">Publish</option>
            <option id="hid">Hidden</option>
          </select>
        </div>
        <div class="form-group">
          <input type="hidden" id="IdValue" name="IdValue" value="">
        </div>
      </form>
      `;

  modalBodyId.innerHTML = chuoi_bodyModal;
  $(':hidden#IdValue').val($(elm).closest('tr').attr('id'));
  loadBrands();
  loadAttributes();
  document.getElementById("nameValue").value = $(elm).closest('tr').find("td:eq(1)").text();
  document.getElementById("skuValue").value = $(elm).closest('tr').find("td:eq(2)").text();
  var currentBrand = $(elm).closest('tr').find("td:eq(3)").text();
  var currentAttr = $(elm).closest('tr').find("td:eq(4)").text();
  document.getElementById("priceValue").value = $(elm).closest('tr').find("td:eq(5)").text();
  document.getElementById("salesPriceValue").value = $(elm).closest('tr').find("td:eq(6)").text();
  document.getElementById("dateValue").value = $(elm).closest('tr').find("td:eq(7)").text();
  //$('#brandValue option:selected').prop('selected', false);
  //$('#attrValue option:selected').prop('selected', false);
  $(document).on('shown.bs.modal', '#modelId', function (e) {
    if (flag == 1) {
      $("#brandValue option:contains(" + currentBrand + ")").prop('selected', true);
      $("#attrValue option:contains(" + currentAttr + ")").prop('selected', true);
    }
  });
  var al = $(elm).closest('tr').attr('id');
  getProductById(al);
  showModal.click();
}

function showDelInfo(elm) {
  var check = confirm(`Bạn muốn xóa sản phẩm khỏi danh sách ?`);
  if (check == true) {
    var al = $(elm).closest('tr').attr('id');
    delProduct(al);
  }
}
