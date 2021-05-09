import React, { useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ id, data }) => {
    const renderGraph = () => {
        d3.select(`#${id}`).selectChildren().remove();
        const width = 350;
        const height = 50;
        const margin = ({ top: 10, right: 5, bottom: 10, left: 5 });
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
        const x = d3.scaleBand()
            .domain(data.map(d => { return d.date }))
            .range([margin.left, width - margin.right])
            .padding(0.5);

        // Draw the X axis
        // svg.append("g")
        //     .attr("transform", `translate(0, ${height})`)
        //     .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

        // Add Y axis
        const y = d3.scaleTime()
            .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, 0])

        // Draw the Y axis
        // svg.append("g")
        //     .call(d3.axisLeft(y))
        //     .call(g => g.select(".domain").remove())
        //     .call(g => g.select(".tick:last-of-type text").clone()
        //         .attr("x", 3)
        //         .attr("text-anchor", "start")
        //         .attr("font-weight", "bold")
        //         .text(data.y))

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("fill", color)
            .attr("x", d => { return x(d.date); })
            .attr("y", d => { return y(d.value); })
            .attr("width", x.bandwidth())
            .attr("height", d => { return y(0) - y(d.value); });
    }

    useEffect(() => {
        renderGraph();
    })

    return (
        <div id={id} />
    );
}

export default BarChart;