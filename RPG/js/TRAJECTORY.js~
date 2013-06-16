var MoveFlag=0,selected=0;
/*
 * CheckPoint = (this.x,this.y),(CP1.x,CP1.y),(CP2.x,CP2.y), ... ,(dist.x,dist.y) 
 */
var CheckPoint = new Array();

function INTER_RECT(e){
    if((this.x -16<= e.x) &&(e.x<= this.x + 40) &&
       (this.y -16<= e.y) &&(e.y<= this.y + 40) 
      ){
	  selected=1;
	  dx = Math.floor(e.x)-this.x;
	  dy = Math.floor(e.y)-this.y;

	  //CheckPoint = (this.x,this.y),(CP1.x,CP1.y),(CP2.x,CP2.y), ... ,(dist.x,dist.y) 
	  CheckPoint[0] = new Array();
	  CheckPoint[0]['x'] = Math.round(e.x)-dx;
	  CheckPoint[0]['y'] = Math.round(e.y)-dy;

	  //easy to see being selected
	  this.opacity=0.5;
      }
    else {
	selected=0;
	dx=0;
	dy=0;
    }
}

/*
 * TraceMove catch the trajectory.
 * only pick the point if it leaves
 * "radius" pixel from previous point.
 * 
 * It continue until 'touchend'
 *
 * CheckPoint = (this.x,this.y),(CP1.x,CP1.y),(CP2.x,CP2.y), ... ,(dist.x,dist.y)
 */
var radius = 50;
var index=0;
function TRACE_TRAJECTORY(e){
    var dist =Math.sqrt(Math.pow(CheckPoint[index]['x'] - e.x-dx ,2.0)+ Math.pow(CheckPoint[index]['y'] - e.y-dy ,2.0)); 
                       //       ________________________________
    if( dist > radius){// if ^/(prev.x-e.x)^2 +(prev.y - e.y)^2 > radius
	index++;
	CheckPoint[index] = new Array();
	CheckPoint[index]['x'] = Math.round(e.x)-dx;
	CheckPoint[index]['y'] = Math.round(e.y)-dy;
    }    
}


var direction;
function END_TRAJECTORY(e){
    MoveFlag=1;
    
    index++;
    CheckPoint[index] = new Array();
    CheckPoint[index]['x'] = Math.round(e.x)-dx;
    CheckPoint[index]['y'] = Math.round(e.y)-dy;
    //init index
    index =0;

    if(CheckPoint[index]['x'] - this.x < 0){
	this.frame=10;
	direction=-1;
    }
    else{
	this.frame=19;
	direction=-1;
    }
    this.opacity=0.8;
}



function DRAW_TRAJECTORY(e){
    if( (index < CheckPoint.length) && (selected==1) 
	&& (MoveFlag ==1) &&(this.opacity == 0.8)){
	// Moving
	if( Math.round(Math.abs(this.x - CheckPoint[index]['x'])) >
	    Math.round(Math.abs(this.y - CheckPoint[index]['y'])) ){//horizontal moving
	    if(CheckPoint[index]['x']-this.x <0 )
	    {//Move left
		this.x--;
		if( ( Math.round(Math.abs(this.x - CheckPoint[index]['x'])) %5 ==0) )
		{
		    if( (this.frame<9) || (11<this.frame))this.frame=10;
		    if(this.frame == 9)direction=1;
		    else if(this.frame==11)direction=-1;
		    this.frame += direction;
		}
	    }else if (CheckPoint[index]['x'] - this.x > 0 ){//Move Right
		this.x++;

		if( ( Math.round(Math.abs(this.x - CheckPoint[index]['x'])) %5 ==0) ){
		    if( (this.frame<18) || (20<this.frame))this.frame=19;
		    if(this.frame == 18)direction=1;
		    else if(this.frame==20)direction=-1;
		    this.frame += direction;
		}
	    }
	}else{ //vertical Moving
	    if(CheckPoint[index]['y']-this.y <0 )//Move up
	    {
		this.y--;
		if( ( Math.round(Math.abs(this.y - CheckPoint[index]['y'])) %5 ==0) )
		{
		    if( (this.frame<27) || (29<this.frame))this.frame=28;
		    if(this.frame == 27)direction=1;
		    else if(this.frame==29)direction=-1;
		    this.frame += direction;
		}
		
	    }else if (CheckPoint[index]['y'] - this.y > 0 ){//Move Right
		this.y++;
		if( ( Math.round(Math.abs(this.y - CheckPoint[index]['y'])) %5 ==0) ){
		    if( (this.frame<0) || (2<this.frame))this.frame=1;
		    if(this.frame == 0)direction=1;
		    else if(this.frame==2)direction=-1;
		    this.frame += direction;
		}
	    }
	}

	if( ( Math.round(Math.abs(this.x - CheckPoint[index]['x'])) <= 1)&& 
	    ( Math.round(Math.abs(this.y - CheckPoint[index]['y'])) <= 1) )
	  {
	    index++; 
	  }
	if(index >= CheckPoint.length)
	{//Object arrived at distination ,thus Moving ended.
	    this.frame =  this.frame%3==0? this.frame+1
		:this.frame %3 == 2 ? this.frame-1
		: this.frame; 
	    selected=0;
	    MoveFlag=0;	
	    this.opacity=1.0;
	    CheckPoint.length =0;
	    index=0;
	}
    }
    
}
