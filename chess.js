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
            if(!trace.includes(prev[key])) trace.unshift(prev[key]);
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
          
            const adjacents=this.AdjacenyList[currentVertex.join('')]
            for(const adjacent of adjacents){
                 if(!visited[adjacent]) {
                    queue.push(adjacent);
                    previous[adjacent.join('')]=currentVertex;
                    visited[currentVertex]=true;
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

knightMoves_recursive=(start,destination,queue=[],prev={},trace=[],visited={})=>{
    if(start. join()===destination.join()){
        trace=this.tracePath(start,prev);
        return trace;  
    }  //base case  
    const adjacents=this.AdjacenyList[start.join('')];
    adjacents.map(ad=>{if(!visited[ad])queue.push(ad)});
    queue.shift();
    
    visited[start.join('')]=true;
    if(queue.length){
        const currentVertex=queue[0];
        if(!visited[currentVertex.join('')]) prev[currentVertex.join('')]=start;
        trace=this.knightMoves_recursive(currentVertex,destination,queue,prev,trace,visited);
    }else return trace;
    return trace;
}

}




export default Chess;



 