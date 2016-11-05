var ctx = document.getElementById("canvas").getContext("2d");
var scoreEl = document.getElementById("score");
//当前前第一结蛇头的位置
var x = 40;
var y = 0;

//速度
var speed = 10;

//方向：1:up;2:down;3:left;4:right;
var d = 4;

//定义蛇身数组
var snakes = new Array();

//定义食物数组
var foods = new Array();

//记录分数
var score = 0;
//snakes[0] = {x:x,y:y};

//初始化舍身长度
var len = 5;

//初始化
function init() {
    ctx.fillStyle = "#ff0000";

    //画蛇神
    for (var i = len - 1; i >= 0; i--) {
        snakes[len - 1 - i] = {x: i * 10, y: 0};
        ctx.fillRect(snakes[len - 1 - i].x, snakes[len - 1 - i].y, 10, 10);
    }

    //花食物
    foods[0] = {x: parseInt(Math.random() * 490), y: parseInt(Math.random() * 490)};
    ctx.fillRect(foods[0].x, foods[0].y, 10, 10);
}
init();
print();

//键盘监听
function keydown(e) {
    switch (e.keyCode) {
        //上W
        case 87:
            if (d != 2) {
                d = 1;
            }
            break;
        //下S
        case 83:
            if (d != 1) {
                d = 2;
            }
            break;
        //左A
        case 65:
            if (d != 4) {
                d = 3;
            }
            break;
        //右D
        case 68:
            if (d != 3) {
                d = 4;
            }
            break;
        //测试
        case 38:
            addSnake();
            break;
        default:
    }
}

//画食物和社
function draw(_x, _y) {
    //alert("_x:"+_x+";_y:"+_y);
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillStyle = "#996633";
    ctx.fillRect(0, 0, 500, 500);

    ctx.fillStyle = "#FF0000";

    //循环替代位置，从最后一个开始
    for (var i = len - 1; i >= 1; i--) {
        //console.log(i);
        snakes[i].x = snakes[i - 1].x;
        snakes[i].y = snakes[i - 1].y;
        ctx.fillRect(snakes[i].x, snakes[i].y, 10, 10);
    }
    snakes[0].x = _x;
    snakes[0].y = _y;
    ctx.fillRect(_x, _y, 10, 10);

    ctx.fillStyle = "#00FF00";
    for (var i = 0; i < foods.length; i++) {
        ctx.fillRect(foods[i].x, foods[i].y, 10, 10);
    }
    //print();
}
//1:up;2:down;3:left;4:right;
function move() {
    switch (d) {
        case 1:
            y = y - speed;
            if (y < 0) {
                y = 490;
            }
            break;
        case 2:
            y = y + speed;
            if (y > 490) {
                y = 0;
            }
            break;
        case 3:
            x = x - speed;
            if (x < 0) {
                x = 490;
            }
            break;
        case 4:
            x = x + speed;
            if (x > 490) {
                x = 0;
            }
            break;
        default:
    }
    draw(x, y);
}

function addSnake() {
    snakes[len] = {x: snakes[len - 1].x + 10, y: snakes[len - 1].y + 10};
    len = len + 1;
}

function createFood() {
    var fx = parseInt(Math.random() * 490);
    var fy = parseInt(Math.random() * 490);
    if ((Math.abs(fx - x) >= 10) && (Math.abs(fy - y) >= 10)) {
        foods[foods.length] = {x: fx, y: fy};
        return false;
    } else {
        return true;
    }
}
function deleteFood(fIndex) {
    foods.splice(fIndex, 1);
}
function checkHit() {
    for (var i = 0; i < foods.length; i++) {
        var fx = foods[i].x;
        var fy = foods[i].y;

        if ((Math.abs(fx - x) < 10) && (Math.abs(fy - y) < 10)) {
            addSnake();
            deleteFood(i);
            while (createFood()) {
            }
            //createFood();
            score += 10;
            scoreEl.innerHTML = "得分：<span>" + score + "</span>";
        }
    }
}
setInterval("move()", 50);
setInterval("checkHit()", 50);
//setInterval("createFood()",5000);
document.onkeydown = keydown;
function print() {
    var outString = "";
    for (var i = 0; i < snakes.length; i++) {
        outString += i + ":{x:" + snakes[i].x + ",y:" + snakes[i].y + "};"
    }

    //alert(outString);
    console.log(outString);
}
