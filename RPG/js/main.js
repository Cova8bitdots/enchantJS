enchant();
window.onload = preload;


var game,scene,player;
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
		     [1,1,1,1,1,1],
		     [1,1,0,1,1,1],
		     [1,1,1,1,0,1],
		     [1,1,1,1,1,1],
		     [1,1,0,1,1,1],
		     [1,1,1,1,0,1],
		     [3,3,3,3,3,3]
    ];
    map.loadData(BackGroundMap);

    var CollisionMap= new Array();
    for(var j=0; j<BackGroundMap.length; j++){
	CollisionMap[j] = new Array(BackGroundMap[j].length);
	for(var i =0; i<BackGroundMap[j].length; i++)
	    CollisionMap[j][i] = BackGroundMap[j][i] % 2 ==1? 0 :1;
    }
    
    map.collisionData = CollisionMap;
    

    scene.addChild(map);


    player = new Array();
    var Len=3;
    
    for(var i=0; i<Len; i++){
	/* CHARACTER( x, y, image, frame)*/
	if(i==0)player[i] = new CHARACTER((2*i)*32,(2*i)*32,game.assets['./img/ColorTile.png'],i%8);
	else if(i==1)player[i] = new CHARACTER((2*i)*32,(2*i)*32,game.assets['./img/chara5.png'],i%8);
	else player[i] = new CHARACTER((2*i)*32,(2*i)*32,game.assets['./img/ColorTile.png'],i%8);
	player[i].addEventListener(Event.TOUCH_START,IS_SELECTED);
	player[i].addEventListener(Event.TOUCH_MOVE,TRACE_TRAJECTORY);
	player[i].addEventListener(Event.TOUCH_END,END_TRAJECTORY);
	player[i].addEventListener(Event.ENTER_FRAME,DRAW_TRAJECTORY);
	
	
	//For debug
	player[i].addEventListener(Event.ENTER_FRAME,DEBUG);
	//player[i].addEventListener(Event.ENTER_FRAME,CHECK_COLLISION);

 
	scene.addChild(player[i]);
    }

    main();
}//end of initialize()
   
function main(){

}

