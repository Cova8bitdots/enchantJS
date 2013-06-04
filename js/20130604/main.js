enchant();


window.onload = preload;
var game;
var scene;
var Field;
var score,combo=0;
var Img_Ary;
var Temp_Text;



 function preload(){
     game = new Game(320,320);
     game.fps=24;
     Img_Ary=['./img/chara1.png',
	      './img/chara2.png',
	      './img/chara3.png',
	      './img/chara4.png',
	      './img/chara5.png',
	      './img/ColorTile.png'
	     ];
     
     game.preload(Img_Ary);     
     game.onload =initialize;
     game.start();
}

var img_w=32,img_h=32;

function initialize(){

    scene = new Scene();
    scene.backgroundColor = '#2e8b57';
    game.pushScene(scene);

    //const number
    var COL=5,ROW=6;
    
    //local variables
    var rnd;
    Field=new Array();
    
    
    for(var j=0; j<COL; j++){	Field[j] = new Array();
	for(var i=0; i<ROW; i++){
	    Field[j][i] = new Sprite(img_w,img_h);
	    Field[j][i].image = game.assets['./img/ColorTile.png'];

	    rnd = Math.floor(Math.random()*100) % 5+1;
	    
	    // Field[j][i].image= rnd == 0 ? game.assets['./img/chara1.png']
	    // 	:rnd == 1 ? game.assets['./img/chara2.png']
	    // 	:rnd == 2 ? game.assets['./img/chara3.png']
	    // 	:rnd == 3 ? game.assets['./img/chara4.png']
	    // 	:game.assets['./img/chara5.png'];
	    
	    Field[j][i].frame = rnd;

	    Field[j][i].x = img_w*(i+1);
	    Field[j][i].y = img_h*(j+1);
	    scene.addChild(Field[j][i]);
	}}
    
    //Score label
    score = new Label();
    score.color="#FC9";
    score.font="normal normal 15px/1.0 monospace";
    score.text="00000"+"   :   "+combo+"combo";
    scene.addChild(score);

    Temp_Text = new Label();
    scene.addChild(Temp_Text);


    main();
}//end of initialize()
    

function swap(i,j,prev_i,prev_j){
    var temp;
    if(prev_i != null || prev_j != null){
	temp = Field[j][i].image;
	Field[j][i].image = Field[prev_j][prev_i].image;
	Field[prev_j][prev_i].image = temp;
    }
}


function main(){
     for(var j=0; j<Field.length; j++){
	for(var i=0; i<Field[0].length; i++){
	    Field[j][i].addEventListener(Event.TOUCH_START,touchstart);
	    Field[j][i].addEventListener(Event.TOUCH_MOVE,touchmove);
	    Field[j][i].addEventListener(Event.TOUCH_END,touchend);
	}
     }
}//end of main function


function touchstart(e){
    var text = "  x :"+Math.floor(e.x)+"  y :"+Math.floor(e.y);
    score.text=text;
}

function touchmove(e){
    var text = "  x :"+Math.floor(e.x)+"  y :"+Math.floor(e.y);
    Temp_Text.text="Moving ..." + text;
}

function touchend(e){
    for(var j=0; j<Field.length; j++)
	for(var i=0; i<Field[0].length; i++)
	    {
		//消化処理を終えている物はチェックから除外
		if(Field[j][i].frame ==0 )continue;
		var I = i, J= j;
		
		//横の確認
		var dx =1,xlen=0;
		while( 0 <= I-dx || I+dx < Field[0].length){
		    if( 0<= I-dx && Field[j][I].frame== Field[j][I-dx].frame)xlen++;
		    if(  I+dx<Field[0].length &&
			 Field[j][I].frame== Field[j][I+dx].frame)xlen++;
		    dx++;
		    }

		//縦の確認
		var dy =1,ylen=0;
		while( 0 <= J-dy || J+dy < Field.length){
		    if( 0<= J-dy && Field[J][i].frame == Field[J-dy][i].frame)ylen++;
		    if(  J+dy<Field.length &&
			 Field[J][i].frame== Field[J+dy][i].frame)ylen++;
		    dx++;
		    }
		
		//消化確認
		if(2 < xlen){
		    var len =0;
		    while(len <= xlen){
			if( 0 <= i-len)	              Field[j][i-len].frame = 0;
			if( i+len < Field[j].length)  Field[j][i+len].frame = 0;
			len++;
		    }}
		if(2 < ylen){
		    var len =0;
		    while(len <= ylen){
			if( 0 <= j-len)	              Field[j-len][i].frame = 0;
			if( j+len < Field.length)  Field[j+len][i].frame = 0;
			len++;
		    }
		}
	    }
        score.text="00000"+"   :   "+combo+"combo";
}
