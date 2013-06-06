
var MoveFlag=0,selected=0;

var pre_x=0,pre_y=0;
function MOVE(e){
    var diffx = (e.x-this.x),diffy =(e.y-this.y);
    if(MoveFlag){
	this.x=e.x-dx;
	this.y=e.y-dy;
	if(Math.abs(diffx) < Math.abs(diffy)){
	if(diffy>0) this.frame = 28 + this.frame %3;//down
	else if (diffy<0)this.frame = 0 + this.frame %3;//up
	}
	else
	{
 	if(diffx>0) this.frame = 19 + this.frame %3;//right
	else if (diffx<0)this.frame = 10 + this.frame %3;//left
	}
	
    }
}


function STOP_MOVE(e){
    this.frame = this.frame %3 == 0 ? ++this.frame
	:this.frame %3 == 2 ? --this.frame
	:this.frame;
    this.opacity=1.0;
}

var dist_x=0,dist_y=0;


var direction;
function MOVEto(e){
    MoveFlag=1;
    dist_x=Math.round(e.x) -dx ;
    dist_y=Math.round(e.y) -dy;
    if(dist_x - this.x < 0){
	this.frame=10;
	direction=-1;
    }
    else{
	this.frame=19;
	direction=-1;
    }
    this.opacity=0.8;
}

function DRAW_MOVING(e){
    if( (selected==1) && (MoveFlag ==1) &&(this.opacity == 0.8)){
	// Moving
	if( Math.round(Math.abs(this.x - dist_x)) > Math.round(Math.abs(this.y - dist_y)) ){//horizontal moving
	    if(dist_x-this.x <0 )
	    {//Move left
		this.x--;
		if( ( Math.round(Math.abs(this.x - dist_x)) %5 ==0) )
		{
		    if( (this.frame<9) || (11<this.frame))this.frame=10;
		    if(this.frame == 9)direction=1;
		    else if(this.frame==11)direction=-1;
		    this.frame += direction;
		}
	    }else if (dist_x - this.x > 0 ){//Move Right
		this.x++;

		if( ( Math.round(Math.abs(this.x - dist_x)) %5 ==0) ){
		    if( (this.frame<18) || (20<this.frame))this.frame=19;
		    if(this.frame == 18)direction=1;
		    else if(this.frame==20)direction=-1;
		    this.frame += direction;
		}
	    }
	}else{ //vertical Moving
	    if(dist_y-this.y <0 )//Move up
	    {
		this.y--;
		if( ( Math.round(Math.abs(this.y - dist_y)) %5 ==0) )
		{
		    if( (this.frame<27) || (29<this.frame))this.frame=28;
		    if(this.frame == 27)direction=1;
		    else if(this.frame==29)direction=-1;
		    this.frame += direction;
		}
		
	    }else if (dist_y - this.y > 0 ){//Move Right
		this.y++;
		if( ( Math.round(Math.abs(this.y - dist_y)) %5 ==0) ){
		    if( (this.frame<0) || (2<this.frame))this.frame=1;
		    if(this.frame == 0)direction=1;
		    else if(this.frame==2)direction=-1;
		    this.frame += direction;
		}
	    }
	}

	if( ( Math.round(Math.abs(this.x - dist_x)) < 1) && ( Math.round(Math.abs(this.y - dist_y)) < 1) )
	{//Object arrived at distination ,thus Moving ended.
	    this.frame =  this.frame%3==0? this.frame+1
		:this.frame %3 == 2 ? this.frame-1
		: this.frame; 
	    selected=0;
	    MoveFlag=0;	
	    this.opacity=1.0;
	}
    }
}

