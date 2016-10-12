// NOTE: taken from http://networkx.github.io/
var w = 300,
    h = 300,
    fill = d3.scale.category20();

var vis = d3.select("#chart")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h);

// d3.json("js/force.json", function(json) {
json = {
  "nodes": [
    {
      "group": 2,
      "name": "0"
    },
    {
      "group": 2,
      "name": "1"
    },
    {
      "group": 2,
      "name": "2"
    },
    {
      "group": 2,
      "name": "3"
    },
    {
      "group": 0,
      "name": "4"
    },
    {
      "group": 0,
      "name": "5"
    },
    {
      "group": 0,
      "name": "6"
    },
    {
      "name": "7"
    },
    {
      "name": "8"
    },
    {
      "name": "9"
    },
    {
      "name": "10"
    }
  ],
  "links": [
    {
      "source": 0,
      "target": 1
    },
    {
      "source": 0,
      "target": 2
    },
    {
      "source": 0,
      "target": 3
    },
    {
      "source": 1,
      "target": 2
    },
    {
      "source": 1,
      "target": 3
    },
    {
      "source": 2,
      "target": 3
    },
    {
      "source": 3,
      "target": 4
    },
    {
      "source": 4,
      "target": 5
    },
    {
      "source": 5,
      "target": 6
    },
    {
      "source": 6,
      "target": 7
    },
    {
      "source": 7,
      "target": 8
    },
    {
      "source": 7,
      "target": 9
    },
    {
      "source": 7,
      "target": 10
    },
    {
      "source": 8,
      "target": 9
    },
    {
      "source": 8,
      "target": 10
    },
    {
      "source": 9,
      "target": 10
    }
  ]
}




  var force = d3.layout.force()
      .charge(-120)
      .linkDistance(30)
      .nodes(json.nodes)
      .links(json.links)
      .size([w, h])
      .start();

  var link = vis.selectAll("line.link")
      .data(json.links)
    .enter().append("svg:line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  var node = vis.selectAll("circle.node")
      .data(json.nodes)
    .enter().append("svg:circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 5)
      .style("fill", function(d) { return fill(d.group); })
      .call(force.drag);

  node.append("svg:title")
      .text(function(d) { return d.name; });

  vis.style("opacity", 1e-6)
    .transition()
      .duration(1000)
      .style("opacity", 1);

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
// });
