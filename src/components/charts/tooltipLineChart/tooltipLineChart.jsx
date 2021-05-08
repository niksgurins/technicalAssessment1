import * as d3 from "d3";
import { useEffect } from "react";

const TooltipLineChart = ({id, data}) => {
    const renderGraph = () => {
        d3.select(`#${id}`).selectChildren().remove();
        const width = 758;
        const height = 150;
        const margin = ({top: 10, right: 0, bottom: 20, left: 0});
        const color = "steelblue";

        let svg = d3.select(`#${id}`)
            .append("svg")
                .attr("viewBox", [0, 0, width + margin.right + margin.left, height + margin.top + margin.bottom])
            //     .attr("width", width + margin.left + margin.right)
            //     .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    `translate(${margin.left}, ${margin.top})`);
        
        data = data.map(d => {
            return { date: new Date(d.date), value: d.value};
        })

        // Add X axis
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => { return d.date; }))
            .range([0, width])
        // svg.append("g")
        //     .attr("transform", `translate(0, ${height})`)
        //     .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    
        // Add Y axis
        const y = d3.scaleLinear()
            .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]).nice()
            .range([height, 0])
        // svg.append("g")
        //     .call(d3.axisLeft(y))
        //     .call(g => g.select(".domain").remove())
        //     .call(g => g.select(".tick:last-of-type text").clone()
        //         .attr("x", 3)
        //         .attr("text-anchor", "start")
        //         .attr("font-weight", "bold")
        //         .text(data.y))

        // Colour in the area beneath the line
        const curve = d3.curveMonotoneX;

        // Add the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
                .defined(d => !isNaN(d.value))
                .x(d => x(d.date))
                .y(d => y(d.value))
                .curve(curve)
            )
    
        // Colour in the area beneath the line
        const area = d3.area()
            .curve(curve)
            .x(d => x(d.date))
            .y0(y(0))
            .y1(d => y(d.value));

        svg.append("path")
            .datum(data)
            .attr("fill", "steelblue")
            .attr("fill-opacity", 0.2)
            .attr("d", area);

        // Tooltip adapted from http://www.d3noob.org/2014/07/my-favourite-tooltip-method-for-line.html
        const bisectDate = d3.bisector(d => { return d.date; }).left;
        const mousemove = (e) => {
            var x0 = x.invert(d3.pointer(e, this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    
            focus.select("circle.y")
                .attr("transform", `translate(${x(d.date)}, ${y(d.value)})`);

            focus.select(".y")
                .attr("transform", `translate(${x(d.date)}, ${0})`)
                .attr("y2", height + margin.top + margin.bottom);
        }

        let focus = svg.append("g")
            .style("display", "none"); 
        
        // Append the Y line
        focus.append("line")
            .attr("class", "y")
            .style("stroke", color)
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0)
            .attr("y2", height);

        // Append the circle over the line
        focus.append("circle")
            .attr("class", "y")
            .style("fill", color)
            .attr("stroke-width", 2)
            .style("stroke", "white")
            .attr("r", 6); 
        
        // Append the rectangle to capture mouse events
        svg.append("rect")
            .attr("width", width)
            .attr("height", height + margin.top + margin.bottom)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", () => { focus.style("display", null); })
            .on("mouseout", () => { focus.style("display", "none"); })
            .on("mousemove", mousemove);
    }

    useEffect(() => {
        renderGraph();
    })
    
    return (
        <div id={id}>
        </div>
    );
}

export default TooltipLineChart;