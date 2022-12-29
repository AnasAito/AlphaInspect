import {useState} from 'react'
import ForceGraph2D from 'react-force-graph-2d';
const data ={
    "nodes": [ 
        { 
          "id": "crb",
          "name": "Crunchbase",
          "val": 1 
        },
        { 
          "id": "gpt",
          "name": "Google patents",
          "val": 1
        },
        { 
            "id": "alex",
            "name": "Open alex",
            "val": 1 
          },
          { 
            "id": "fda",
            "name": "Fda",
            "val": 1
          },
         
        
  
    ],
    "links": [
        {'id':'gpt_alex' , 
            "source": "gpt",
            "target": "alex"
        },
        {'id':'gpt_crb' , 
            "source": "gpt",
            "target": "crb"
        },
        {'id':'gpt_fda' , 
            "source": "gpt",
            "target": "fda"
        },
        {'id':'crb_alex' , 
            "source": "alex",
            "target": "crb"
        },
        {'id':'alex_fda' , 
            "source": "alex",
            "target": "fda"
        },
        {'id':'crb_fda' , 
            "source": "crb",
            "target": "fda",
            'color' : 'red'
        },
    ]
}

  
  export default function Graph({edge_id,setEdge_id , node_id,setNodeid}) {

    return (
        <ForceGraph2D
        height={300}
        width = {300}
    //backgroundColor={'red'}
        graphData={data}
        linkWidth = {3}
       linkColor = {(e)=>{
        const is_clicked = (e.id == edge_id)
        
        return is_clicked?'red':'grey'
       }}
      
       onLinkClick = {
        (e,event) => {
          setNodeid('')
          setEdge_id(e.id)}
       }
       onNodeClick = {
        (n,event) =>{
          setEdge_id('')
          setNodeid(n.id)}
       }
        nodeCanvasObject={(node, ctx, globalScale) => {
          const is_clicked = (node.id == node_id)
            const label = node.name;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle =(is_clicked?'red':'grey')
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
  