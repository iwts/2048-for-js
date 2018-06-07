var block_score = new Array();
var space;

$(document).ready(function(e){
    new_game();
});

var get_random = function(){
    if(space == 16) return false;
    var random_x,random_y;
    do{
        random_x = parseInt(Math.floor(Math.random()*4));
        random_y = parseInt(Math.floor(Math.random()*4));
        if(block_score[random_x][random_y] == 0) break;
    }while(true);
    if(Math.random() < 0.5){
        block_score[random_x][random_y] = 2;
    }else{
        block_score[random_x][random_y] = 4;
    }
    show_animate(random_x,random_y,block_score[random_x][random_y]);
    return true;
}

// var updateBoardView = function(){}

var init_map = function(){
    space = 0;
    for(var i = 0;i < 4;i++){
        block_score[i] = new Array();
        for(var j = 0;j < 4;j++){
            block_score[i][j] = 0;
        }
    }

    //   updateBoardView();//通知前端对board二位数组进行设定。

    get_random();
    get_random();
}

var new_game = function(){
    init_map();
}

var gameover = function(){
    // demo，以后要加更多选项
    alert("gameover");
}

var move = function(){
    var flag = get_random();
    if(flag == false){
        gameover();
    }
}

$(document).keydown(function(event){
    // 37-40分别为left、up、right、down
    swtich(event.keyCode){
        case 37: if(move_left() == true){
                    move();
                }break;
        case 38: if(move_up() == true){
                    move();
                }break;
        case 39: if(move_right() == true){
                    move();
                }break;
        case 40: if(move_down() == true){
                    move();
                }break;
    }
});

var can_move_left = function(){
    
}

var move_left = funciton(){
    if(can_move_left() == false) return false;

    
}