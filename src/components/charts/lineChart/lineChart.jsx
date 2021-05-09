import React, { useEffect } from "react";
import * as d3 from "d3";

const LineChart = ({ id, data }) => {
    const renderGraph = () => {
        d3.select(`#${id}`).selectChildren().remove();
        const width = 350;
        const height = 50;
        const margin = ({ top: 10, right: 10, bottom: 20, left: 10 });
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
            .range([margin.left, width - margin.right])

        // Draw the X axis
        // svg.append("g")
        //     .attr("transform", `translate(0, ${height})`)
        //     .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]).nice()
            .range([height, 0])

        // Draw the Y axis
        // svg.append("g")
        //     .call(d3.axisLeft(y))
        //     .call(g => g.select(".domain").remove())
        //     .call(g => g.select(".tick:last-of-type text").clone()
        //         .attr("x", 3)
        //         .attr("text-anchor", "start")
        //         .attr("font-weight", "bold")
        //         .text(data.y))

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
                .curve(d3.curveMonotoneX)
            )
    }

    useEffect(() => {
        renderGraph();
    })

    return (
        <div id={id} />
    );
}

export default LineChart;