
var show_animate = function(x,y,score){
	var show_block = $('#b-' + x + '-' + y);
	show_block.empty();
	show_block.append('<div class="con-block" id="flow-b-'+x+'-'+y+'"></div>');
	add_block = $('#flow-b-'+x+'-'+y);
    add_block.addClass("block-"+block_score[x][y]+"-color");
    add_block.css("height","0px");
    add_block.css("width","0px");
    add_block.css("margin","0px");
	if(score >= 8){
		add_block.css("color","#f9f6f2");
	}else{
		add_block.css("color","#776e65");
	}
    add_block.text(score);
    add_block.animate({
    	height: '100px',
    	width: '100px'
    },200);
}

// direc 表示移动方向：左上右下，分别为1 2 3 4
/*
top,left控制移动，距离临界：10px-340px，每阶段增加110px算法：
	now_top = 110*i+10;
*/
var show_move_animate = function(x,y,aims_x,aims_y){
	alert(x+" "+y+" "+aims_x+" "+aims_y);
	var now_block = $('#flow-b-' + x + '-' + y);
	now_block.css("position","absolute");
	now_block.css("top",110*x+10);
	now_block.css("left",110*y+10);
	now_block.animate({
		top: 110*aims_x,
		left: 110*aims_y
	},500);
}