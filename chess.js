const generateGraph=(size)=>{
    let graph=[];
    for(i=0;i<7;i++){
        for(j=0;j<7;j++){
            graph.push( findAdjacentList([i,j],size));
        }
       
    }
    return graph;
}

const calculateTreeIndex=(cell,size)=>{
   return cell[0]*(size)+cell[1];
}

// console.log(calculatePosition([7,0],8));

function findAdjacentList(cell,size){
    const [i,j]=cell;
    let adjacents=[];
    if(i+2<size){
        if(j+1<size) adjacents.push([(i+2),j+1]);
        if(j-1>0) adjacents.push([(i+2),j-1]);
    }
    if(i-2>0){
        if(j+1<size) adjacents.push([(i-2),j+1]);
        if(j-1>0) adjacents.push([(i-2),j-1]); 
    }
    if(j+2<size){
        if(i+1<size) adjacents.push([i+1,j+2]);
        if(i-1>0) adjacents.push([i-1,j+2]);
    }
    if(j-2>0){
        if(i+1<size) adjacents.push([i+1,j-2]);
        if(i-1>0) adjacents.push([i-1,j-2]);
    }
   return adjacents;
}

const graph=generateGraph(9);
console.log(graph[calculateTreeIndex([0,1],graph.length)]);
console.log(calculateTreeIndex([0,1],graph.length))