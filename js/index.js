// ---------- start ----------
// ---------- 常量  ----------
const COLORS = {
    RED : "#f47983",
    BLACK : "#29363B",
    WHITE : "#FFFFFF"
}

const SDURED = "#9c0c13";
var RADIUS = 20;
var params = {
    width:document.documentElement.clientWidth-300,
    height:document.documentElement.clientHeight,
    horizontalSpacing:50,
    verticalSpacing:50
};
// ---------- 常量 -----------
// ---------- end  ----------

var treeArray = null;
var root = null;
var isAnimation = false;
let container = document.querySelector(".container");
// 生成画布
let two = new Two(params).appendTo(container);
two.update();


// 当页面改变大小的时候改变画布的大小
window.onresize = function(){
    params = {
        width:document.documentElement.clientWidth-300,
        height:document.documentElement.clientHeight
    };
    two.width = document.documentElement.clientWidth-300;
    two.height = document.documentElement.clientHeight;
    two.update();
}
