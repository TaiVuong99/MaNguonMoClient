var flag = 0;

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
      5: val["Price"], //" VND",
      6: val["Sale Price"],// + " VND",
      7: val["Date"],
      8: `
      <div style="display: inline-flex" >
      <button class="btn btn-success" onclick="showEditInfo(this)" name="btnUpdate"><i class="fa fa-edit"></i></button>
      <button class="btn btn-danger" onclick="showDelInfo(this)"><i class="fa fa-trash"></i></button>
      </div>
      `
      }]);
      table.draw();
    });
  });
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
    var checkedType = "";
    var checkedUrl = "";
    var resString = "";
    if(flag==0) {
      checkedType = "POST";
      checkedUrl = "http://localhost/OS-BanQuanAo/public/api/products/add";
      resString = "Thêm thành công";
    }
    else {
      checkedType = "PUT";
      checkedUrl = "http://localhost/OS-BanQuanAo/public/api/products/update/"+ $(':hidden#IdValue').val();
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
    myObject['image'] = "image";
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
    myObject['cate'] = document.getElementById('cateValue').value;
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
        alert(resString);
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

function showEditInfo(elm) {
  flag = 1;
  chuoi_titleModal = `<a class="text-success">Sửa sản phẩm</a>`;
  modalTitleId.innerHTML = chuoi_titleModal;
  chuoi_bodyModal = `<div class="form-group">
          <label for="imageValue"> Hình ảnh: </label>
          <input type="file" accept=".png, .jpeg, jpg, .psd, .pdf" id="imageValue" name="image">  
        </div>
        <div class="form-group">
          <label for="nameValue"> Tên: </label>
          <input class="form-control" id="nameValue" name="name">
        </div>
        <div class="form-group">
          <label for="skuValue"> SKU: </label>
          <input class="form-control" id="skuValue" name="sku">
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
          <input type="number" class="form-control" id="priceValue" min="0" name="price" placeholder="VND">
          </input>
        </div>
        <div class="form-group">
          <label for="salesPriceValue"> Giá khuyến mãi: </label>
          <input type="number" class="form-control" id="salesPriceValue" min="0" name="sale_price" placeholder="VND">
        </div>
        <div class="form-group">
          <label for="dateValue"> Ngày nhập: </label>
          <input type="date" class="form-control" id="dateValue" name="date">
        </div>
        <div class="form-group">
          <label for="descripValue"> Mô tả: </label>
          <input type="text" class="form-control" id="descripValue" name="description">
        </div>
        <div class="form-group">
          <label for="visibleValue"> Trạng thái: </label>
          <select id="visibleValue" class="form-control" name="visibility">
            <option id="pub">Publish</option>
            <option id="hid">Hidden</option>
          </select>
        </div>
        <div class="form-group">
          <label for="cateValue"> Loại: </label>
          <input type="number" class="form-control" id="cateValue" min="0" name="cate" readonly>
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
  var url_string = window.location.href;
  var url = new URL(url_string);
  var id = url.searchParams.get("id");
  document.getElementById("cateValue").value = id;
  //$('#brandValue option:selected').prop('selected', false);
  //$('#attrValue option:selected').prop('selected', false);
  $(document).on('shown.bs.modal', '#modelId', function (e) {
  if(flag == 1) {
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
  if(check==true) {
    var al = $(elm).closest('tr').attr('id');
    var url_string = window.location.href;
    var url = new URL(url_string);
    var cate = url.searchParams.get("id");
    delProduct(al,cate);
  }
}
