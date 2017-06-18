var canvas = $("#canvas")[0];
var w = $(window).width();
var h = $(window).height();
canvas.width = w;
canvas.height = h;
var ctx = canvas.getContext("2d");
var drawing = false;
var erasing = false;
var r = 0;
var g = 0;
var b = 0;

var showingColor = false;
function start(){
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,w,h);
  draw();
}
function draw(){
  erasing = false;
  drawing = false;
  ctx.strokeStyle = "rgba("+r+","+g+","+b+",1)";
  ctx.lineWidth = 1;
  $("#canvas").css("cursor", "url(http://pfam.xfam.org/static/images/cross_18.png), auto");
  $("#draw").addClass("active");
  $("#erase").removeClass("active");
}
function erase(){
  erasing = true;
  drawing = false;
  ctx.strokeStyle = "white";
  ctx.lineWidth = 10;
  $("#canvas").css("cursor", "url(http://us.oneill.com/shop/media/lookbookslider/icons/websites/2/hotspot_oneill.png) 0 0, auto");
  $("#erase").addClass("active");
  $("#draw").removeClass("active");
}
function clearAll(){
  drawing = false;
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,w,h);
}
$("input").on("input",function(){
  r = Math.round($("#red").val()*255/100);
  g = Math.round($("#green").val()*255/100);
  b = Math.round($("#blue").val()*255/100);
  $("#result").css("background-color","rgba("+r+","+g+","+b+",1)");
  if (!erasing) ctx.strokeStyle = "rgba("+r+","+g+","+b+",1)";
});
function color(){
  if (showingColor) $('#rgb').css('display', 'none');
  else $('#rgb').css('display', 'inline-block');
  showingColor = !showingColor;
}
function startDraw(e){
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
  drawing = true;
}
function onMove(e){
  if(drawing){
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  }
}

$("#canvas").bind({
  "touchstart mousedown": function(e){
    $('#rgb').css('display', 'none');
    showingColor = false;
    if (e.clientX !== undefined) startDraw(e);
    else startDraw(e.changedTouches[0]);
  },
  "touchmove mousemove": function(e){
    if (e.clientX !== undefined) onMove(e);
    else onMove(e.changedTouches[0]);
  },
  "touchend mouseup": function(){
    drawing = false;
  }
});
