


var dRow =  [ 0,1,0,-1]
var dCol = [ -1,0,1,0]

function manhattanDistance(x,y,targetx,targety){
    return Math.abs(x-targetx)+Math.abs(y-targety);

}
function diagonalDistance(x,y,targetx,targety){
    let dx=Math.abs(x-targetx);
    let dy=Math.abs(y-targety);
    return 1*(dx+dy)+(Math.sqrt(2)-2*1)*Math.min(dx,dy);
}
function eucledianDistance(x,y,targetx,targety){
    return Math.sqrt(Math.pow(x-targetx,2)+Math.pow(y-targety,2));
}
function chebysevDistance(x,y,targetx,targety){
    return Math.max(Math.abs(x-targetx),Math.abs(y-targety));
}
//manhattanDistance=0;
//diagonalDistance=1;
//eucledianDistance=2;
//chebysevDistance=3;

var arrayHeuristic=[manhattanDistance,diagonalDistance,eucledianDistance,chebysevDistance]


async function getPathAStar(array,current,target,row,heuristic){
    
    let currentrow=Math.floor(current/row);
    let currentcol=current%row;
    let targetrow=Math.floor(target/row);
    let targetcol=target%row;
    var vis=array.map(row => [...row]);
    let path=[];
    let q = [];
    let cost=Array.from(Array(row*row).fill(0));
    q.push([arrayHeuristic[heuristic](currentrow,currentcol,targetrow,targetcol),[currentrow, currentcol]]);
    vis[currentrow][currentcol] = 1;
    let time=0;
    while(q!=0){
        var cell=q[0];
        var x=cell[1][0];
        var y=cell[1][1];
        
        q.shift();
        let startdistance=arrayHeuristic[heuristic](x,y,targetrow,targetcol)
        for(let i=0;i<4;i++){
            var adjx=x+dRow[i];
            var adjy=y+dCol[i];
            if(isValid(vis,adjx,adjy,row)){
                time=time+50;
                cost[(adjx*row)+adjy]=cost[(x*row)+y]+1;
                path[(adjx*row)+adjy]=(x*row)+y;
               
                startdistance=arrayHeuristic[heuristic](adjx,adjy,targetrow,targetcol)+cost[(adjx*row)+adjy]
                vis[adjx][adjy]=1;
                q.unshift([arrayHeuristic[heuristic](adjx,adjy,targetrow,targetcol)+cost[(adjx*row)+adjy],[adjx,adjy]]);
                
                addClass(adjx,adjy,row,time);
                
            
                    
                
                if(adjx===targetrow && adjy===targetcol){
                    return {
                        path:backtrack(path,target,current),
                        cost:cost[target],
                        visitednum:time/50,
                    }
                }
                

            }
            
            
        }
        q=q.sort(function(a,b){
            return a[0]-b[0];
            
        })
        

    }

    return {failed:"failed"}

}

function addClass(adjx,adjy,row,time){
    return new Promise((resolve, reject) => {
       setTimeout(function(){
         
        resolve(document.getElementById((adjx*row)+adjy).className="visited")
          
       }, 1000+time)
    })
 }

function backtrack(path,endpoint,startpoint){
    let result=[];
    while(endpoint!=startpoint){
    result.push(endpoint);
    endpoint=path[endpoint];
    }
    result.push(startpoint);
    return result;
}


function isValid(vis,row, col,boundry) {
    //out of the bounds 
    if(row<0 || col<0 || row>=boundry || col>=boundry){
    return false;
    }
    if(vis[row][col]===1){
    return false;
    }
    return true;

}




export {getPathAStar};