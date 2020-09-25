function getJSON() {
var flickerAPI = "https://mydataopen.000webhostapp.com/public/api/products";
  $.getJSON( flickerAPI, {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
  console.log( "success" );
}