

//Set constants
var w = 420,
    h = 400,
    padding = 30;
var xScale;
var yScale;

var tip = d3.tip() // `d3-tip` won't work yet if you use v4
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        return d.name;
    });
svg = d3.select("svg");
svg.call(tip);




var donne = d3.json("../datasource/foot.json", function (err, json) {

    //Create adaptable scales
    xScale = d3.scale.linear()
        .domain([0, d3.max(json, function (d) {
            return d3.max([d.physicalstrength, d.speed, d.kickingpower, d.leadership]);
        }
        )])
        .range([padding, w - padding]);
    yScale = d3.scale.linear()
        .domain([0, d3.max(json, function (d) { return d.speed; })])
        .range([h - padding, padding]);

    //Set up the axes
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    diag_circles = svg.selectAll("circle");
    diag_circles.data(json)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.physicalstrength) })
        .attr("cy", function (d) { return yScale(d.speed) })
        .attr("r", 10)
        .style("stroke", function (d) { if (d.cluster === 1) { return "#1abc9c"; } else { return "cyan"; } })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

});


// redraw scaling
function reDraw() {
    xVar = document.getElementById("xAxisVar").value;
    yVar = document.getElementById("yAxisVar").value;
    d3.selectAll('circle')
        .transition()
        .duration(1000)
        .attr('cx', function (d) {
            return eval('xScale(d.' + xVar + ');');
        })
        .attr('yx', function (d) {
            return eval('yScale(d.' + yVar + ');');
        });

};
