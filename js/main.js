
var block_score = new Array();
var score;

$(document).ready(function(e){
    if(!localStorage.best){
        localStorage.best = 0;
    }else{
        var best = $('#best');
        best.empty();
        best.append(localStorage.best);
    }
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

var update_board_view = function(){
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
    score = 0;
    update_score(0);
    for(var i = 0;i < 4;i++){
        block_score[i] = new Array();
        for(var j = 0;j < 4;j++){
            block_score[i][j] = 0;
        }
    }

    update_board_view();//通知前端对board二位数组进行设定。

    get_random();
    get_random();
}

var new_game = function(){
    init_map();
}

var update_best = function(){
    var best = localStorage.best;
    if(score > best){
        localStorage.best = score;
        $('#best').empty();
        $('#best').append(score);
    }
}

var gameover = function(){
    var cover = $(".cover");
    cover.css("display","block");
    update_best();
}

var move = function(){
    if(can_move_left() == true) return;
    if(can_move_right() == true) return;
    if(can_move_up() == true) return;
    if(can_move_down() == true) return;
    setTimeout(gameover(),400);
}

var update_score = function(add){
    score += add;
    var board_score = $('#score');
    board_score.empty();
    board_score.append(score);
}

$(document).keydown(function(event){
    move();
    // 37-40分别为left、up、right、down
    switch(event.keyCode){
        case 37: move_left();break;
        case 38: move_up();break;
        case 39: move_right();break;
        case 40: move_down();break;
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
    var add_score = 0;
    for(var i = 0;i < 4;i++){
        for(var j = 1;j < 4;j++){
            /*
                flag的用法，如果有这样的情况：
                2240
                那么一般情况下左移后应该是
                4400
                如果没有flag，k的临界条件永远是最左(右/上/下)那么会出现这样：
                8000
                因为最左边的先走，出现：
                4040
                然后第三个方块走的时候由于临界是最左，则会自动合成出现8000的情况
                而flag就是避免这个情况，在“注释1的位置”，当合成方块之后就设定flag值
                防止移动的时候对刚生成的方块进行匹配，从而杜绝这种问题。
                本质上是不往新生成的方块位置移动，例：
                4040
                那么flag就从刚开始的-1更新为1，也就是说，无论后面的方块时多少只能移动到
                第2块
            */
            var flag = -1;
            if(block_score[i][j] == 0) continue;
            var aims = -1;
            for(var k = j-1;k > flag;k--){
                if(block_score[i][k] == 0){
                    aims = k;
                    continue;
                }
                if(block_score[i][k] == block_score[i][j]){
                    aims = k;
                    flag = k;
                    add_score = add_score + 2*block_score[i][k];
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
    update_score(add_score);
    setTimeout("update_board_view()",200);
    setTimeout("get_random()",200);
    return true;
}

var move_right = function(){
    if(can_move_right() == false) return false;
    var add_score = 0;
    for(var i = 0;i < 4;i++){
        // 不同方向判定顺序应该不同，这样保证逻辑正确
        for(var j = 2;j >= 0;j--){
            var flag = 4;
            if(block_score[i][j] == 0) continue;
            var aims = -1;
            for(var k = j+1;k < flag;k++){
                if(block_score[i][k] == 0){
                    aims = k;
                    continue;
                }
                if(block_score[i][k] == block_score[i][j]){
                    aims = k;
                    flag = k;
                    add_score = add_score + 2*block_score[i][k];
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
    update_score(add_score);
    setTimeout("update_board_view()",200);
    setTimeout("get_random()",200);
    return true;
}

var move_up = function(){
    if(can_move_up() == false) return false;
    var add_score = 0;
    for(var j = 0;j < 4;j++){
        for(var i = 1;i < 4;i++){
            var flag = -1;
            if(block_score[i][j] == 0) continue;
            var aims = -1;
            for(var k = i-1;k > flag;k--){
                if(block_score[k][j] == 0){
                    aims = k;
                    continue;
                }
                if(block_score[k][j] == block_score[i][j]){
                    aims = k;
                    flag = k;
                    add_score = add_score + 2*block_score[k][j];
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
    update_score(add_score);
    setTimeout("update_board_view()",200);
    setTimeout("get_random()",200);
    return true;
}

var move_down = function(){
    if(can_move_down() == false) return false;
    var add_score = 0;
    for(var j = 0;j < 4;j++){
        for(var i = 2;i >= 0;i--){
            var flag = 4;
            if(block_score[i][j] == 0) continue;
            var aims = -1;
            for(var k = i+1;k < flag;k++){
                if(block_score[k][j] == 0){
                    aims = k;
                    continue;
                }
                if(block_score[k][j] == block_score[i][j]){
                    aims = k;
                    flag = k;
                    add_score = add_score + 2*block_score[k][j];
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
    update_score(add_score);
    setTimeout("update_board_view()",200);
    setTimeout("get_random()",200);
    return true;
}