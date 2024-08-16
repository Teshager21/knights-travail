class Chess{
    constructor(size){
        this.AdjacenyList={}
        this.generateAdjacenyList(size);
    }
findAdjacents=(cell,size)=>{
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
    generateAdjacenyList=(size)=>{
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++) this.AdjacenyList[`${i}${j}`]=(this.findAdjacents([i,j],size));
        }
    }

    tracePath= (vertex,prev)=>{
        let trace=[vertex];
        while(vertex){
            const key=vertex.join('');
            if(!prev[key]) break;
            if(!trace.includes(prev[key]))trace.unshift(prev[key]);
            vertex=[...prev[key]];
        }  
        return trace; 
    }

 knightMoves=(start,destination)=>{
        let queue=[];
        let visited={};
        let previous={};
        queue.push(start);
        visited[start]=true;
        while(queue.length){
            const currentVertex= queue.shift();
            visited[currentVertex]=true;
            const adjacents=this.AdjacenyList[currentVertex.join('')]
            for(const adjacent of adjacents){
                 if(!visited[adjacent]) {
                    queue.push(adjacent);
                    previous[adjacent.join('')]=currentVertex;
                    if(adjacent.join()===destination.join()) return  this.displayResult(this.tracePath(adjacent,previous));
                 }
            }
            
        }
    
    }

    displayResult=(trace)=>{
        console.log(`> You made it in ${trace.length} moves. Here is you path: `)
        trace.map(v=>console.log(v))
    }

    isSubArray=(arr,sub)=>{
        let isSubArray=true;
        for ( let item of sub)  if(!(arr.some(el=>el.join()===item.join()))) isSubArray=false; 
        return isSubArray;  
    }

    knightMoves_recursive=(start,destination,path=[],prev={},trace=[])=>{
    if(start. join()===destination.join()) return start; //base case  
    if(path.length===0) path.push(start); 
    const adjacents=this.AdjacenyList[start.join('')];
    if(this.isSubArray(path,adjacents)) return trace;   // if all of the adjacent vertices have been visited,return
    for(let ad of adjacents){
        if(prev[ad.join('')])continue;  // if visited skip it 
        prev[ad.join('')]=start;
        path.push(ad);
        if(ad.join()===destination.join()){ 
            trace=this.tracePath(ad,prev);
            return trace;}
    }
    path.shift();
    for(let ad of path){
        if(trace.length>0) return trace;
        trace=this.knightMoves_recursive(ad,destination,path,prev,trace);
    }
    return trace;
}

}




export default Chess;



 