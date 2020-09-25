
function appendText() {
  //var txt1 = "<p>Text.</p>";        // Create text with HTML
  var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
  //var txt3 = document.createElement("p");
  //txt3.innerHTML = "Text.";         // Create text with DOM
  $("tbody").append(txt2);   // Append new elements
}

$(document).ready(function(){

  //appendText();
  getjson();
});

function getjson() {
$.getJSON( "http://localhost/OS-System-Backend-BanQuanAo/public/api/categories", function( data ) {
  //var items = [];
  $.each( data, function( key, val ) {
    //items.push( "<li id='" + key + "'>" + val + "</li>" );
     $( "tbody" ).append( "<tr role='row' class='odd'>"
     + "<td>"+val["Name"]+"</td>" +
   + "<td class='"+"sorting_1"+"'>"+val["Name"]+"</td>"
   + "<td>"+val["Name"]+"</td>"
    + "<td>"+val["Name"]+"</td>"
    + "<td>"+val["Name"]+"</td>"
   + "<td>"+val["Name"]+"</td>"
    + "<td>"+val["Name"]+"</td>"
   + "<td>"+val["Name"]+"</td>"
   + "<td>"+val["Name"]+"</td>"
     + "</tr>");
  });
   
   //$( ".shirt_data" ).append( "</tbody>" );
 
  // $( "<ul/>", {
  //   "class": "my-new-list",
  //   html: items.join( "" )
  // }).appendTo( "body" );
});
}