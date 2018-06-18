// 每次删除块的没有写


var block_score = new Array();
var space; // space值具体加减还没有写

$(document).ready(function(e){
    var begin = $('#begin');
    begin.click(function(){
        new_game();
    });
});

var get_random = function(){
    var random_x,random_y;
    do{
        random_x = parseInt(Math.floor(Math.random()*4));
        random_y = parseInt(Math.floor(Math.random()*4));
        if(block_score[random_x][random_y] == 0) break;
    }while(true);
    if(Math.random() < 0.9){
        block_score[random_x][random_y] = 2;
    }else{
        block_score[random_x][random_y] = 4;
    }
    show_animate(random_x,random_y,block_score[random_x][random_y]);
    return true;
}

var updateBoardView = function(){
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            var show_block = $('#b-' + i + '-' + j);
            show_block.empty();
            show_block.append('<div class="con-block" id="flow-b-'+i+'-'+j+'"></div>');
            var add_block = $('#flow-b-'+i+'-'+j);
            add_block.addClass("block-"+block_score[i][j]+"-color");
            add_block.css("margin","0px");

            if(block_score[i][j] == 0){
                add_block.text("");
            }else{
                add_block.text(block_score[i][j]);
                if(block_score[i][j] >= 8){
                    add_block.css("color","#f9f6f2");
                }else{
                    add_block.css("color","#776e65");
                    if(block_score[i][j] < 256) continue;
                    // 大于256的光晕特效

                }
            }
        }
    }
}

var init_map = function(){
    space = 0;
    for(var i = 0;i < 4;i++){
        block_score[i] = new Array();
        for(var j = 0;j < 4;j++){
            block_score[i][j] = 0;
        }
    }

    updateBoardView();//通知前端对board二位数组进行设定。

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
    // var flag = get_random();
    // if(flag == false){
    //     gameover();
    // }
}

$(document).keydown(function(event){
    // 37-40分别为left、up、right、down
    switch(event.keyCode){
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
    for(var i = 0;i < 4;i++){
        for(var j = 1;j < 4;j++){
            if(block_score[i][j] == 0) continue;
            if(block_score[i][j-1] == 0) return true;
            if(block_score[i][j] == block_score[i][j-1]) return true;
        }
    }
    return false;
}

var can_move_right = function(){
    for(var i = 0;i < 4;i++){
        for(var j = 2;j >= 0;j--){
            if(block_score[i][j] == 0) continue;
            if(block_score[i][j+1] == 0) return true;
            if(block_score[i][j] == block_score[i][j+1]) return true;
        }
    }
    return false;
}

var can_move_up = function(){
    for(var j = 0;j < 4;j++){
        for(var i = 1;i < 4;i++){
            if(block_score[i][j] == 0) continue;
            if(block_score[i-1][j] == 0) return true;
            if(block_score[i][j] == block_score[i-1][j]) return true;
        }
    }
    return false;
}

var can_move_down = function(){
    for(var j = 0;j < 4;j++){
        for(var i = 2;i >= 0;i--){
            if(block_score[i][j] == 0) continue;
            if(block_score[i+1][j] == 0) return true;
            if(block_score[i][j] == block_score[i+1][j]) return true;
        }
    }
    return false;
}

var move_left = function(){
    if(can_move_left() == false) return false;
    for(var i = 0;i < 4;i++){
        for(var j = 1;j < 4;j++){
            if(block_score[i][j] == 0) continue;
            var aims = -1;
            for(var k = j-1;k >= 0;k--){
                if(block_score[i][k] == 0){
                    aims = k;
                    continue;
                }
                if(block_score[i][k] == block_score[i][j]){
                    aims = k;
                    break;
                }
                break;
            }
            if(aims == -1) continue;
            block_score[i][aims] += block_score[i][j];
            block_score[i][j] = 0;
            show_move_animate(i,j,i,aims);
        }
    }
    setTimeout("updateBoardView()",200);
    setTimeout("get_random()",200);
    return true;
}

var move_right = function(){
    if(can_move_right() == false) return false;
    for(var i = 0;i < 4;i++){
        // 不同方向判定顺序应该不同，这样保证逻辑正确
        for(var j = 2;j >= 0;j--){
            if(block_score[i][j] == 0) continue;
            var aims = -1;
            for(var k = j+1;k <= 3;k++){
                if(block_score[i][k] == 0){
                    aims = k;
                    continue;
                }
                if(block_score[i][k] == block_score[i][j]){
                    aims = k;
                    break;
                }
                break;
            }
            if(aims == -1) continue;
            block_score[i][aims] += block_score[i][j];
            block_score[i][j] = 0;
            show_move_animate(i,j,i,aims);
        }
    }
    setTimeout("updateBoardView()",200);
    setTimeout("get_random()",200);
    return true;
}

var move_up = function(){
    if(can_move_up() == false){
        return false;
    }
    for(var j = 0;j < 4;j++){
        for(var i = 1;i < 4;i++){
            if(block_score[i][j] == 0) continue;
            var aims = -1;
            for(var k = i-1;k >= 0;k--){
                if(block_score[k][j] == 0){
                    aims = k;
                    continue;
                }
                if(block_score[k][j] == block_score[i][j]){
                    aims = k;
                    break;
                }
                break;
            }
            if(aims == -1) continue;
            block_score[aims][j] += block_score[i][j];
            block_score[i][j] = 0;
            show_move_animate(i,j,aims,j);
        }
    }
    setTimeout("updateBoardView()",200);
    setTimeout("get_random()",200);
    return true;
}

var move_down = function(){
    if(can_move_down() == false){
        return false;
    }
    for(var j = 0;j < 4;j++){
        for(var i = 2;i >= 0;i--){
            if(block_score[i][j] == 0) continue;
            var aims = -1;
            for(var k = i+1;k < 4;k++){
                if(block_score[k][j] == 0){
                    aims = k;
                    continue;
                }
                if(block_score[k][j] == block_score[i][j]){
                    aims = k;
                    break;
                }
                break;
            }
            if(aims == -1) continue;
            block_score[aims][j] += block_score[i][j];
            block_score[i][j] = 0;
            show_move_animate(i,j,aims,j);
        }
    }
    setTimeout("updateBoardView()",200);
    setTimeout("get_random()",200);
    return true;
}