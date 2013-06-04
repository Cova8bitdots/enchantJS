enchant();
window.onload = preload;


var game;


function preload(){
     game = new Game(320,320);
     game.fps=30;
    
     game.preload('Chara1.png');     
     game.onload = initialize();
     game.start();
}

function initialize(){
    
    var scene = new Scene();
    scene.backgroundColor = '#f68845';
    game.pushScene(scene);

    
    var player = new Sprite(32,32);
    player.image = game.assets['Chara1.png'];
    player.x=0;
    player.y=10;

    game.rootScene.addChild(player);
}//end of initialize()
   


