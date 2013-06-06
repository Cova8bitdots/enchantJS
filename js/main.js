enchant();
window.onload = preload;


var game,scene,player;
var Img_Ary;

function preload(){
     game = new Game(320,320);
     game.fps=30;
    Img_Ary=['./img/chara1.png',
	     './img/chara2.png',
	     './img/chara3.png',
	     './img/chara4.png',
	     './img/chara5.png',
	     './img/chara6.png',
	     './img/chara7.png',
	     './img/ColorTile.png'
	    ];
     
    game.preload(Img_Ary);    
     game.onload = initialize;
     game.start();
}



function initialize(){
    
    scene = new Scene();
    scene.backgroundColor = '#ffffff';
    game.pushScene(scene);

    var map = new Map(32,32);
    map.image=game.assets['./img/ColorTile.png'];
    map.loadData([
		     [1,0,0,0,0,1],
		     [0,1,2,3,4,0],
		     [0,2,3,4,5,0],
		     [0,5,4,7,6,0],
		     [0,5,3,2,1,0],
		     [1,0,0,0,0,1]
		 ]);
    scene.addChild(map);


    player = new Array();
    var Len=5;
    
    for(var i=0; i<Len; i++){
	player[i] = new Sprite(32,32);
	player[i].image = game.assets['./img/chara5.png'];
	player[i].frame= i%8;
	player[i].x=i*32;
	player[i].y=i*32;
	player[i].addEventListener(Event.TOUCH_START,INTER_RECT);
	/*
	 * player[i].addEventListener(Event.TOUCH_MOVE,MOVE);
	 * player[i].addEventListener(Event.TOUCH_END,STOP_MOVE);
	 * player[i].addEventListener(Event.ENTER_FRAME,DRAW_MOVING);
	 */
	player[i].addEventListener(Event.TOUCH_MOVE,TRACE_TRAJECTORY);
	player[i].addEventListener(Event.TOUCH_END,END_TRAJECTORY);
	player[i].addEventListener(Event.ENTER_FRAME,DRAW_TRAJECTORY);

 
	scene.addChild(player[i]);
    }
    main();
}//end of initialize()
   
var dx=0,dy=0;
function main(){
   
}

