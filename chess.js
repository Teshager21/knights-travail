const generateGraph=(size)=>{
    let graph=[];
    for(i=0;i<size;i++){
        for(j=0;j<size;j++){
            graph.push( findAdjacentList([i,j],size));
        }  
    }
    return graph;
}

const calculateTreeIndex=(cell,size)=>{
   return cell[0]*(size)+cell[1];
}
 
function findAdjacentList(cell,size){
    const [i,j]=cell;
    let adjacents=[];
    if(i+2<size){
        if(j+1<size) adjacents.push([i+2,j+1]);
        if(j-1>=0) adjacents.push([i+2,j-1]);
    }
   
    if(i-2>0){
        if(j+1<size) adjacents.push([i-2,j+1]);
        if(j-1>=0) adjacents.push([i-2,j-1]); 
    }

    if(j+2<size){
        if(i+1<size) adjacents.push([i+1,j+2]);
        if(i-1>=0) adjacents.push([i-1,j+2]);
    }

    if(j-2>=0){
        if(i+1<size) adjacents.push([i+1,j-2]);
        if(i-1>=0) adjacents.push([i-1,j-2]);
    }
   return adjacents;
}

const graph=generateGraph(8);

const isSubArray=(arr,sub)=>{
    let isSubArray=true;
    for ( item of sub){
        if(!(arr.some(el=>el.join()===item.join()))) isSubArray=false; 
    }
    return isSubArray;  
}

knightMoves_recursive=(start,destination,path=[],prev=Array(64),trace=[])=>{
    if(start.join()===destination.join()) return start; //base case  
    // if(trace.length>0) return trace;
    if(path.length===0) path.push(start); 
    const adjacents=graph[calculateTreeIndex(start,Math.sqrt(graph.length))];
    if(isSubArray(path,adjacents)) return trace;   // if all of the adjacent vertices have been visited,return

    for(ad of adjacents){
        if(prev.some(el=>{return el.join()===ad.join();}))continue;  // if visited skip it 
        prev[calculateTreeIndex(ad,Math.sqrt(graph.length))]=start;
        path.push(ad);
        if(ad.join()===destination.join()){ 
            trace.push(ad);
            trace=tracePath(ad,prev,trace);
            return trace;}
    }
    path.shift();
    for(ad of path){
        trace=knightMoves_recursive(ad,destination,path,prev,trace);
        if(ad.join()===destination.join()) {
            (trace.includes(ad))||trace.push(ad);
            trace=tracePath(ad,prev,trace);
            return trace};
    }
    return trace;
}

const tracePath= (ad,prev)=>{
    let trace=[ad];
    while(ad!==undefined){
        const index=calculateTreeIndex(ad,Math.sqrt(graph.length));
        if(!prev[index]) break;
        if(!trace.includes(prev[index]))trace.unshift(prev[index]);
        ad=[...prev[index]];
    }  
    return trace; 
}

const knightMoves=(start,destination)=>{
    let queue=[];
    let visited={};
    let previous=[];
    const graphSize=Math.sqrt(graph.length);
    queue.push(start);
    visited[start]=true;
    while(queue.length){
        const currentVertex= queue.shift();
        visited[currentVertex]=true;
        const adjacents=graph[calculateTreeIndex(currentVertex,graphSize)]
        for(const adjacent of adjacents){
             if(!visited[adjacent]) {
                queue.push(adjacent);
                previous[calculateTreeIndex(adjacent,graphSize)]=currentVertex;
                if(adjacent.join()===destination.join()) return  tracePath(adjacent,previous)
             }
        }
        
    }

}



console.log(knightMoves([7,7],[0,0]))
// console.log(knightMoves_recursive([7,7],[0,0]))

 