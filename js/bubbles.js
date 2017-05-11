//
function bubbles() {

    //local variables/defaults for example
    var width = 960,
        height = 960,
        columnForColors = "columnsForColors",
        columnForRadius = "columnsForRadius",
        identifer = "id_or_desciber";
    strength = -50,
        range = [5, 30]
    title = "Insert title";

    //function to create graph
    function chart(selection) {
        var data = selection.enter().data();
        console.log(data);
        var div = selection,
            svg = div.selectAll('svg'),
            head = div.selectAll('head');
        var head = selection
            .append('div')
            .style("color", "black")
            .text(title)
            .style("left", "100px")
            .style("top", "100px")
            .style("position", "absolute")
            .style("font-size", "100px");
        svg.attr('width', width).attr('height', height);

        //set up hover over
        var tooltip = selection
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "#626D71")
            .style("border-radius", "6px")
            .style("text-align", "center")
            .style("font-family", "monospace")
            .style("width", "400px")

        //create force push on bubbles
        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength(strength))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .on("tick", ticked);

        function ticked(e) {
            node.attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                });
        }

        var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
        var scaleRadius = d3.scaleLinear().domain([d3.min(data, function(d) {
            return +d[columnForRadius];
        }), d3.max(data, function(d) {
            return +d[columnForRadius];
        })]).range(range)

        //build circles
        var node = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr('r', function(d) {
                return scaleRadius(d[columnForRadius])
            })
            .style("fill", function(d) {
                return colorCircles(d[columnForColors])
            })
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            .on("mouseover", function(d) {
                tooltip.html(columnForColors + ": " + d[columnForColors] + "<br>" + identifer + ": " + d[identifer] +
                    "<br>" + columnForRadius + ": " + d[columnForRadius]);
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function() {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function() {
                return tooltip.style("visibility", "hidden");
            });
    }


    //getter/setter methods
    chart.strength = function(value) {
        if (!arguments.length) {
            return strength;
        }
        strength = value;
        return chart;
    };

    chart.identifer = function(value) {
        if (!arguments.length) {
            return identifer;
        }
        identifer = value;
        return chart;
    };


    chart.title = function(value) {
        if (!arguments.length) return title;
        title = value;
        return chart;
    };

    chart.columnForRadius = function(value) {
        if (!arguments.length) return columnForRadius;
        columnForRadius = value;
        return chart;
    };

    chart.columnForColors = function(value) {
        if (!arguments.length) return columnForColors;
        columnForColors = value;
        return chart;
    };



    chart.range = function(value) {
        if (!arguments.length) {
            return range;
        }
        range = value;
        return chart;
    };

    chart.width = function(value) {
        if (!arguments.length) {
            return width;
        }
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) {
            return height;
        }
        height = value;
        return chart;
    };

    return chart;
}
