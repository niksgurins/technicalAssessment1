import React from "react";
import * as d3 from "d3";

const LineChart = (props) => {
    const renderGraph = () => {
        let data = [...props.data];
        //console.log(document.getElementById("view"));
        const width = 350;
        const height = 50;
        const margin = ({top: 20, right: 10, bottom: 20, left: 10});

        let svg = d3.select(`#${props.id}`)
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        
        data = data.map(d => {
            return { date: new Date(d.date), value: d.value};
        })
        // Add X axis --> it is a date format
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => { 
                return new Date(d.date); 
            }))
            .range([0, width]);
        // svg.append("g")
        //     .attr("transform", `translate(0, ${height})`)
        //     .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
        const color = "steelblue";
    
        // Add Y axis
        const y = d3.scaleLinear()
            .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]).nice()
            .range([height, 0])
        // svg.append("g")
        //     .call(d3.axisLeft(y))
            //.call(g => g.select(".domain").remove())
            // .call(g => g.select(".tick:last-of-type text").clone()
            //     .attr("x", 3)
            //     .attr("text-anchor", "start")
            //     .attr("font-weight", "bold")
            //     .text(data.y))
        
        // Add the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
                .defined(d => !isNaN(d.value))
                .x(d => x(d.date))
                .y(d => y(d.value))
            )
    }
    
    return (
        <div id={props.id}>
            {renderGraph()}
        </div>
    );
}
 
export default LineChart;