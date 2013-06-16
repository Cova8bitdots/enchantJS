enchant();
window.onload = preload;


var game,scene;
var player,ENEMY;
var Img_Ary;
var map;

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

    map = new Map(32,32);
    map.image=game.assets['./img/ColorTile.png'];
    var BackGroundMap = [
		     [3,1,1,1,1,1,1,0,1,1],
		     [1,1,0,1,1,4,1,1,1,0],
//		     [1,1,1,1,0,1,1,0,0,1],
//		     [1,4,1,1,1,0,1,1,1,1],
//		     [1,1,0,1,1,1,1,1,1,1],
		     [1,1,1,1,0,1,4,1,1,0],
		     [0,1,1,4,1,1,1,1,0,0],
		     [1,1,0,1,1,1,1,1,0,1],
		     [1,1,1,1,0,1,1,1,1,1],
		     [0,1,1,1,1,1,1,1,1,2]

    ];
    map.loadData(BackGroundMap);

    var CollisionMap= new Array();
    for(var j=0; j<BackGroundMap.length; j++){
	CollisionMap[j] = new Array(BackGroundMap[j].length);
	for(var i =0; i<BackGroundMap[j].length; i++)
	    CollisionMap[j][i] = BackGroundMap[j][i] ==  0  ? 1 :0;
    }
    
    map.collisionData = CollisionMap;
    

    scene.addChild(map);


    player = new Array();
    ENEMY = new Array();
    var Len=3;

    for(var i=0; i<Len; i++){
	/* CHARACTER( x, y, image, frame)*/
	player[i] = new CHARACTER((2*i)*32,(2*i)*32,game.assets['./img/chara5.png'],i%8);
	ENEMY[i] = new CHARACTER(game.width-(3-i)*32,game.height - 32*(i+1),
				 game.assets['./img/chara7.png'],i%8);

	player[i].addEventListener(Event.TOUCH_START,IS_SELECTED);
	player[i].addEventListener(Event.TOUCH_MOVE,TRACE_TRAJECTORY);
	player[i].addEventListener(Event.TOUCH_END,END_TRAJECTORY);
	player[i].addEventListener(Event.ENTER_FRAME,DRAW_TRAJECTORY);
	player[i].addEventListener(Event.ENTER_FRAME,CHECK_MAPTILE);
	
	ENEMY[i].addEventListener(Event.TOUCH_START,IS_SELECTED);
	ENEMY[i].addEventListener(Event.TOUCH_MOVE,TRACE_TRAJECTORY);
	ENEMY[i].addEventListener(Event.TOUCH_END,END_TRAJECTORY);
	ENEMY[i].addEventListener(Event.ENTER_FRAME,DRAW_TRAJECTORY);
	ENEMY[i].addEventListener(Event.ENTER_FRAME,CHECK_MAPTILE);
	
	
	//For debug
	player[i].addEventListener(Event.ENTER_FRAME,DEBUG);
	//player[i].addEventListener(Event.ENTER_FRAME,CHECK_COLLISION);

 
	scene.addChild(player[i]);
	//scene.addChild(ENEMY[i]);
    }

    main();
}//end of initialize()
   
function main(){

}

