
var show_animate = function(var x,var y,var score){
	var show_block = $('#b-' + x + '-' + y);
	show_block.removeClass();
    show_block.addClass("con-block");
    show_block.addClass("block-"+block_score[i][j]+"-color");
    show_block.text(score);
}

// direc 表示移动方向：左上右下，分别为1 2 3 4
var show_move_animate = function(var x,var y,var aims_x,var aims_y){
	var nowblock = $('#b-' + i + '-' + j);
	
}