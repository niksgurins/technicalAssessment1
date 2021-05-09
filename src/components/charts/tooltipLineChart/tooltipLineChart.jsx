import * as d3 from "d3";
import { useEffect } from "react";

const TooltipLineChart = ({ id, data }) => {
    const renderGraph = () => {
        d3.select(`#${id}`).selectChildren().remove();
        const width = 758;
        const height = 151;
        const margin = ({ top: 10, right: 0, bottom: 20, left: 0 });
        const color = "steelblue";

        let svg = d3.select(`#${id}`)
            .append("svg")
            .attr("viewBox", [0, 0, width + margin.right + margin.left, height + margin.top + margin.bottom])
            .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);

        data = data.map(d => {
            return { date: new Date(d.date), value: d.value };
        })

        // Add X axis
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => { return d.date; }))
            .range([0, width]);

        // Draw the X axis
        // svg.append("g")
        //     .attr("transform", `translate(0, ${height})`)
        //     .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]).nice()
            .range([height, 0]);

        // Draw the Y axis
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
            );

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

            const tooltipHeight = 50;
            const tooltipWidth = 140;
            const tooltipMargin = 10;
            const tooltipYValue = height - y(d.value) < tooltipHeight + tooltipMargin ? height - (tooltipHeight + tooltipMargin) : y(d.value) + tooltipMargin;
            const tooltipXValue = x(d.date) + tooltipWidth + tooltipMargin > width ? x(d.date) - (tooltipWidth + tooltipMargin) : x(d.date) + tooltipMargin;
            focus.select("rect.tooltip")
                .attr("transform", `translate(${tooltipXValue}, ${tooltipYValue})`)
                .text(d.value);

            focus.select("text.tooltip-date")
                .attr("transform", `translate(${tooltipXValue}, ${tooltipYValue})`)
                .text(d.date.toDateString().slice(4));

            focus.select("text.tooltip-orders")
                .attr("transform", `translate(${tooltipXValue}, ${tooltipYValue})`)
                .text("Orders:");

            focus.select("text.tooltip-value")
                .attr("transform", `translate(${tooltipXValue}, ${tooltipYValue})`)
                .text(d.value);

            focus.select("circle.tooltip-circle")
                .attr("transform", `translate(${tooltipXValue + 20}, ${tooltipYValue + 53})`)
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

        let tooltipGradient = svg.append('linearGradient')
            .attr('id', 'tooltip-gradient')
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", y(2240))
            .attr("x2", 0).attr("y2", y(0));
        // Create the stops of the main gradient. Each stop will be assigned
        // a class to style the stop using CSS.
        tooltipGradient.append("stop")
            .attr("class", "stop-top")
            .attr("offset", "0%");
        tooltipGradient.append("stop")
            .attr("class", "stop-top")
            .attr("offset", "50%");
        tooltipGradient.append("stop")
            .attr("class", "stop-border")
            .attr("offset", "50%");
        tooltipGradient.append("stop")
            .attr("class", "stop-bottom")
            .attr("offset", "50.1%");

        focus.append("rect")
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("class", "tooltip")
            .style("stroke", "#e8e8e8")
            .attr("stroke-width", 1);

        focus.append("text")
            .attr("class", "tooltip-date")
            .style("stroke", "gray")
            .style("stroke-width", "0.8px")
            .style("opacity", 0.8)
            .attr("dx", "1rem")
            .attr("dy", "2.3rem");

        focus.append("circle")
            .attr("class", "tooltip-circle")
            .style("fill", color)
            .attr("r", 6);

        focus.append("text")
            .attr("class", "tooltip-orders")
            .style("stroke", "gray")
            .style("stroke-width", "0.8px")
            .style("opacity", 0.8)
            .attr("dx", "4rem")
            .attr("dy", "5.7rem");

        focus.append("text")
            .attr("class", "tooltip-value")
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .style("opacity", 0.8)
            .attr("dx", "9rem")
            .attr("dy", "5.7rem");

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
        <div id={id} style={{ "height": "17.8rem" }}>
        </div>
    );
}

export default TooltipLineChart;