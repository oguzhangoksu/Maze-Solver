//Djkstra
function Djkstra(array, current, target, row) {
    let q = [];
    let path=[];
    let vis =array.map(row => [...row]);
    let currentrow=Math.floor(current/row);
    let currentcol=current%row;
    var dRow = [-1, 0, 1, 0 ];
    var dCol = [0, 1, 0, -1 ];
    let cost=Array.from(Array(row*row).fill(0));
    let time=0;
    q.push([currentrow, currentcol]);

    vis[currentrow][currentcol] = 1;
    while (q.length!=0) {
        var cell=q[0]
        var x=cell[0]
        var y =cell[1]
        q.shift();
        for(var i=0;i<4;i++){
            var adjx=x+dRow[i]
            var adjy=y+dCol[i]
            
            if(DjkstraisValid(adjx,adjy,vis,row)){
                if(cost[(adjx*row)+adjy]>cost[(x*row)+y]+1 || cost[(adjx*row)+adjy]===0){
                cost[(adjx*row)+adjy]=cost[(x*row)+y]+1;
                path[(adjx*row)+adjy]=(x*row)+y;
                }
                time+=25;
                vis[adjx][adjy]=1;
                q.push([adjx,adjy]);
                addClass(adjx,adjy,row,time);
      
            }
            else if(adjx>0 || adjy>0 || adjx<4 || adjy<4 && vis[adjx][adjy]===1){
                time+=25;
                if(cost[(adjx*row)+adjy]>cost[(x*row)+y]+1){
                cost[(adjx*row)+adjy]=cost[(x*row)+y]+1;
                path[(adjx*row)+adjy]=(x*row)+y;
                }
            
            }
            if((adjx*row)+adjy===target){
              return {
                  path:DjkstraBacktrack(path,target,current),
                  cost:cost[target],
                  visitednum:time/25,
              }
            }
            
        }
    } 

   
    return{failed:"no path"}

  }
    
  function DjkstraBacktrack(path,endpoint,startpoint){
    let result=[];
    if(path[endpoint]!==undefined){
      while(endpoint!=startpoint){
        result.push(endpoint);
        endpoint=path[endpoint];
      }
      result.push(startpoint);
      return result;
    }
    
    return result;
  }
  

function addClass(adjx,adjy,row,time){
  return new Promise((resolve, reject) => {
      setTimeout(function(){
        
      resolve(document.getElementById((adjx*row)+adjy).className="visited")
        
      }, 1000+time)
  })
}
    
  
function DjkstraisValid(adjx, adjy,vis,row) {
    //out of the bounds //üst sınır
    if(adjx<0 || adjy<0 || adjx>=row || adjy>=row){
      return false;
    }
    if(vis[adjx][adjy]===1){
      return false;
    }
    return true;

}


export {Djkstra}