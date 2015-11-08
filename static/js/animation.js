var colors = []
colors[0] = '#0093DA';
colors[1] = '#1400E0';
colors[1] = '#000';

var actor_colors = []
actor_colors[0]='#44C2FF';
actor_colors[1]='#3BFF3B';
actor_colors[2]='#6555FF'
actor_colors[3]='#'+(Math.random()*0xFFFFFF<<0).toString(16);



function random_from_array(arr){
  var item = arr[Math.floor(Math.random()*arr.length)];
  return item
}

function create_adj_matrix(){
  var max_modes = 8
  var nodes_amount = Math.floor(Math.random()*max_modes) + 2

  var weights = [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,3];

  var adj_matrix = []
  for (var i=0;i<nodes_amount;i++){
    adj_matrix[i] = []
    for (var j=0;j<nodes_amount;j++){
      adj_matrix[i][j] = 0
    }
  }

  for (var i=0;i<nodes_amount;i++){
    for (var j=0;j<nodes_amount;j++){
      if (i!=j){
        adj_matrix[i][j] = random_from_array(weights)
        adj_matrix[j][i] = random_from_array(weights)
      }
    }
  }

  return adj_matrix;
}

function create_node(index){
    var rad = 6;
    var margin = 5*rad;
    var x_modifier = Math.random()*rad*rad/2;
    var y_modifier = Math.random()*rad*rad;
    var x = rad+(index % 2)*index*(rad/2+Math.random()*2*margin)+rad*x_modifier+(index % 5)*rad*Math.random();
    var y = rad+!(index % 2)*index*(rad/2+Math.random()*2*margin)+rad*y_modifier+(index % 5)*rad*Math.random();
    var drift_mod = 0.02
    var driftx = Math.random()*rad*drift_mod - rad*drift_mod/2 
    var drifty = Math.random()*rad*drift_mod - rad*drift_mod/2
    var rgba = random_from_array(colors);
  var node = {index:index, vtx:{}, rgba:rgba, rad:rad, x:x, y:y, driftx:driftx, drifty:drifty};
  return node
}

function create_vtx(aindex, bindex, weight){
  var vtx = {source:aindex,target:bindex, weight:weight};
  return vtx
}

function create_actor(){
  var actor = {};
  actor.rad = 4;
  actor.x = 0;
  actor.y = 0;
  actor.rgba = random_from_array(actor_colors);//'#'+(Math.random()*0xFFFFFF<<0).toString(16);//"#FF0000"
  actor.pos = 0;//node index
  actor.speed = 0.02;
  actor.mov = 0;
    actor.target = -1;

  var d = new Date();
  var n = d.getTime();
  var delay = 4000;
  actor.moves_at = n+Math.random()*delay;
  return actor;
}

function create_actors(actors, nodes){
  var taken_pos = [];
  var actors_arr = [];
  for(var i = 0;i < actors; i++){ 
    var actor = create_actor();
    for (var j = 0;j < nodes.length; j++){ 
      if (!(taken_pos.indexOf(j) > -1)){
        if (nodes[j].vtx.length > 0){
          taken_pos.push(j)
          actor.pos = j;
          actor.x = nodes.x
          actor.y = nodes.y
        }
      }
      if (!(taken_pos.indexOf(actor.pos) > -1) ){
        actors_arr.push(actor);
        break;
      }
    }
    
  }
  return actors_arr;
}


function move_actor(actor, posx, posy, towards_x, towards_y){
  actor.mov = actor.mov + actor.speed
  actor.x = posx+(towards_x-posx)*actor.mov
  actor.y = posy+(towards_y-posy)*actor.mov
  //console.log(actor.x, actor.y)
  if (actor.x == towards_x && actor.y == towards_y || actor.mov >= 1){
    actor.pos = actor.target
    actor.mov = 0
    var d = new Date();
    var n = d.getTime();
    delay = 2000
    actor.moves_at = n+Math.random()*delay+delay/5;
    actor.target = -1;
  }
  return actor
}

function Graph(){  
    this.nodes = []
    //this.vtx = {} // {node_index: [ {source:node_index, target:node_linked, weight:vertex_weight}  }]
    this.adj_matrix = []
}

function create_graph(adj_matrix){
  var graph = new Graph;
  graph.adj_matrix = adj_matrix;
  var nodes_amount = adj_matrix.length;
  for(var i = 0;i < nodes_amount; i++){
    graph.nodes.push(create_node(i));
  }

  for(var i = 0;i < nodes_amount; i++){
    var node = graph.nodes[i]; 
    for(var j = 0;j < adj_matrix[i].length; j++){
      var node2 = graph.nodes[j];
      if (adj_matrix[i][j]!=0){
        if (!node.vtx[j]){
          node.vtx[j] = create_vtx(i,j,adj_matrix[i][j]);
        }
        if (!node2.vtx[i]){
          node2.vtx[i] = create_vtx(j,i,adj_matrix[j][i]);
        }
      }
    }
  }
  return graph
}

function init_canvas(canvas, w, h){
  if (!w){
    w = window.innerWidth;
  }
  if (!h){
    h = window.innerHeight;
  }
  canvas.width = w
  canvas.height = h
}

function draw_graph(ctx, w, h, graph, actors){
    
  ctx.clearRect(0, 0, w, h);

      
      for(var i = 0;i < graph.nodes.length; i++){
      var node = graph.nodes[i];

            node.x = node.x + node.driftx
            node.y = node.y + node.drifty
            var rad = node.rad;
            if (node.x>w-rad*2){
                node.x=w-rad*2;
                node.driftx = -node.driftx;
            }
            if (node.x<0+rad*2){
                node.x=0+rad*2;
                node.driftx = -node.driftx;
            }
          
          if (node.y>h-rad*2){
                node.y=w-rad*2;
                node.drifty = -node.drifty;
            }
            if (node.y<0+rad*2){
                node.y=0+rad*2;
                node.drifty = -node.drifty;
            }
          
          
      ctx.fillStyle = node.rgba;
      ctx.strokeStyle = node.rgba;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.rad, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(node.x, node.y, (node.rad+0.5*node.rad), 0, Math.PI*2, true);
      ctx.stroke();
      ctx.closePath();
      for (var connected_node_ind in node.vtx) {
                
        var vtx = node.vtx[connected_node_ind];
        var connected_node = graph.nodes[connected_node_ind]
                
                
        ctx.strokeStyle = node.rgba;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(connected_node.x, connected_node.y);
              ctx.stroke();
      }
    }
    for (var actor_ind in actors){
        var actor = actors[actor_ind]; 
      actor.x = graph.nodes[actor.pos].x
      actor.y = graph.nodes[actor.pos].y
        var d = new Date();
    var n = d.getTime();
        if (actor.target == -1){
            
            var connected_nodes = Object.keys(graph.nodes[actor.pos].vtx);
            var random_item = connected_nodes[Math.floor(Math.random()*connected_nodes.length)];
            actor.target = random_item
            //console.log(connected_nodes, actor.target)
            //console.log(connected_nodes, actor.target)
        }
        if (actor.moves_at <= n){  
            var target = graph.nodes[actor.target];
            var pos = graph.nodes[actor.pos];
          if (pos && target){
          actor = move_actor(actor, pos.x, pos.y, target.x, target.y);
        }
        else{
          //console.log(pos, target)
          actors.splice(actor_ind, 1);
        }
        }
      ctx.fillStyle = actor.rgba;
    ctx.strokeStyle = actor.rgba;
      ctx.beginPath();
    ctx.arc(actor.x, actor.y, actor.rad, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
    }
    
}

function simulate(){
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d')
  var w = window.innerWidth, h = window.innerHeight;
  canvas = init_canvas(canvas, w, h);

  // var adjacency_matrix = [
  //  [0,1,0,1],
  //  [1,0,1,0],
  //  [0,0,1,1],
  //  [0,1,0,0],
 //        [0,1,0,0]
  // ]

  var adjacency_matrix = create_adj_matrix();
  var actors_num = Math.ceil(adjacency_matrix.length/5)
  
  var graph = create_graph(adjacency_matrix);
  var actors = create_actors(actors_num, graph.nodes);
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();
  
  function loop(){
      draw_graph(ctx, w, h, graph, actors);
      requestAnimFrame(loop);
  }

  loop()

}

document.addEventListener("DOMContentLoaded", function(event) { 
  if (window.innerWidth > 1400){
  simulate()
}
});

