function encodeLink(a){
  link = encodeURIComponent(a.toString().replace(/.*\/(cuisine\/.*)/g,'$1'));
  console.log(link);
  location = "/cuisine/"+link;
}
