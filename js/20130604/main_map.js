enchant();


window.onload = preload;
var game;
var scene;
var map;
var score,combo=0;
var Img_Ary;



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

function initialize(){

    scene = new Scene();
    scene.backgroundColor = '#2e8b57';
    game.pushScene(scene);
    

    //init Map
    var map = new Map(32,32);
    map.image=game.assets['./img/ColorTile.png'];
    map.loadData([
		     [2,3,4,5,6,7],
		     [1,1,1,1,1,1],
		     [1,1,1,1,1,1],
		     [1,1,1,1,1,1],
		     [1,1,1,1,1,1],
		     [0,0,0,0,0,0]
		 ]);
    scene.addChild(map);
    


    //Score label
    score = new Label();
    score.color="#FC9";
    score.font="normal normal 15px/1.0 monospace";
    score.text="00000"+"   :   "+combo+"combo";
    scene.addChild(score);

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
	    Field[j][i].addEventListener(Event.TOUCH_MOVE,touchmove);
	    Field[j][i].addEventListener(Event.TOUCH_END,touchend);
	}
	// map..addEventListener(Event.TOUCH_MOVE,touchmove);
	// map..addEventListener(Event.TOUCH_MOVE,touchend);
     }
}//end of main function

function touchmove(e){
    var text = "  x :"+Math.floor(e.x)+"  y :"+Math.floor(e.y);
    score.text="00000"+"   :   "+combo+"combo" + text;
}

function touchend(e){
    score.text="00000"+"   :   "+combo+"combo";
}