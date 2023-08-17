
//BFS
function BFSisValid(vis,row, col,boundry) {
    //out of the bounds //üst sınır
    if(row<0 || col<0 || row>=boundry || col>=boundry){
    return false;
    }
    if(vis[row][col]===1){
    return false;
    }
    return true;

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




function BFS(array,current,target,row){
    var vis=array.map(row => [...row]);
    
    var dRow = [-1, 0, 1, 0 ];
    var dCol = [0, 1, 0, -1 ];
    let q = [];
    let path=[];
    let currentrow=Math.floor(current/row);
    let currentcol=current%row;
    let cost=Array.from(Array(row*row).fill(0));
    q.push([currentrow, currentcol]);
    vis[currentrow][currentcol] = 1;
    let count=0;
    let time=0
    while(q.length!=0){
        
        var cell=q[0];
        var x=cell[0];
        var y=cell[1];
        q.shift();
        for(let i=0;i<4;i++){
            var adjx=x+dRow[i];
            var adjy=y+dCol[i];

            if(BFSisValid(vis,adjx,adjy,row)){
                time+=50;
                q.push([adjx,adjy]);
                path[(adjx*row)+adjy]=(x*row)+y;
                cost[(adjx*row)+adjy]=cost[(x*row)+y]+1;
                vis[adjx][adjy]=1;
                addClass(adjx,adjy,row,time);

                if((adjx*row)+adjy===target){
                    return {
                        path:backtrack(path,target,current),
                        cost:cost[target],
                        visitednum:time/50,
                    }
                    
                }
            }
        }
        count++;
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



export {BFS}