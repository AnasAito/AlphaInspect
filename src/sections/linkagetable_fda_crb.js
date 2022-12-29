import {useState} from 'react'
import ForceGraph2D from 'react-force-graph-2d';


  const generate_data = (pairs) =>{
    console.log(pairs[0])
return {
  'nodes' : pairs.map(pair=>{return {'id': pair[0]}}).concat( pairs.map(pair=>{return {'id': pair[1]}})),
  'links' :  pairs.map(pair=>{return  {
  "source": pair[0],
  "target": pair[1],

}}),
}}
const pairs = [['test1','test2'],['test3','test4']]
const data =generate_data(pairs)

  export default function Graph({edge_id,setEdge_id , node_id,setNodeid}) {

    return (
        <ForceGraph2D
        height={600}
        width = {600}
   // backgroundColor={'red'}
        graphData={data}
        linkWidth = {3}
       linkColor = {(e)=>{
        const is_clicked = (e.id == edge_id)
        
        return is_clicked?'red':'grey'
       }}
      
      
        nodeCanvasObject={(node, ctx, globalScale) => {
          
            const label = node.id;
            const fontSize = 15/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle ='grey'
            ctx.fillText(label, node.x, node.y);

            node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
          }}
      />
    );
  }
  