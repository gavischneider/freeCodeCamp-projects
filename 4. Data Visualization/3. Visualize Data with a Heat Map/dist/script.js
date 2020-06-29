const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

d3.json(url).
then(function (data) {

  // Variables
  const dataset = data.monthlyVariance;
  const width = 1400;
  const height = 600;
  const padding = 70;
  const colors = ['#00405C', '#56508C', '#5443FF', '#64C7F9', '#65C2A5', '#FCE08B', '#FEA704', '#FE6464', '#ED3358', '#C71639', '#800700'];

  // Allows us to spread the colors on the map
  const colorScale = d3.scaleQuantile().
  domain([d3.min(dataset, function (d) {return d.variance;}), d3.max(dataset, function (d) {return d.variance;})]).
  range(colors);

  // Extract years for the x axis
  const years = dataset.map(d => {
    return d.year;
  });

  // Extract months for y axis
  const months = dataset.map(d => {
    return d.month;
  });

  // Format time
  let formatTime = d3.timeFormat("%B");
  let formatMonth = function (month) {
    return formatTime(new Date(2000, month - 1));
  };

  // Create an SVG element
  const svg = d3.select('body').
  append('svg').
  attr('width', width).
  attr('height', height).
  attr('class', 'heat-map');

  // Create x scale
  const xScale = d3.scaleLinear().
  domain(d3.extent(years)).
  range([padding, width - padding]);

  // create y scale
  const yScale = d3.scaleBand().
  domain([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]).
  range([height - padding, padding]);
  //.padding(0.05);   

  // Create x axis
  const xAxis = d3.axisBottom(xScale).
  ticks(20).
  tickFormat(d3.format(""));

  // Append x axis to svg element
  svg.append('g').
  attr('id', 'x-axis').
  attr("transform", "translate(0," + (height - padding) + ")").
  call(xAxis);

  // Create y axis
  const yAxis = d3.axisLeft(yScale).
  tickFormat(formatMonth);

  // Append y axis to svg element
  svg.append('g').
  attr('id', 'y-axis').
  attr("transform", "translate(" + padding + ",0)").
  call(yAxis);

  // Create rectangles
  svg.selectAll("rect").
  data(dataset).
  enter().
  append("rect").
  attr('class', 'cell').
  attr('data-month', d => d.month).
  attr('data-year', d => d.year).
  attr('data-temp', d => d.variance).
  attr("x", d => xScale(d.year)).
  attr("y", d => yScale(d.month)).
  attr("width", d => (width - padding) / (2015 - 1753)).
  attr("height", d => (height - padding) / 12).
  style('fill', d => {
    return colorScale(d.variance);
  }).
  on("mouseover", d => {
    tooltipOn(d);
    d3.select("#tooltip").
    style("left", d3.event.pageX - 50 + "px").
    style("top", d3.event.pageY + 20 + "px").
    style("stroke", "black").
    style("fill", "black").
    style('border', '1px solid black');
  }).
  on("mouseout", () => tooltipOff());

  // Tooltip
  function tooltipOn(d) {
    d3.select("body").
    append("div").
    attr("id", "tooltip").
    attr("data-year", d.year).
    style("position", "absolute").
    html(formatMonth(d.month) + ", " + d.year + "<br>" + Math.round(d.variance + 8.66) + '℃' + "<br>" + 'Var: ' + d.variance + '℃');
  }

  function tooltipOff() {
    d3.select("#tooltip").remove();
  }

  // Legend
  let legend = svg.append('g').
  attr('id', 'legend').
  attr("transform", "translate(" + 535 + "," + (height - 50) + ")");

  colors.forEach(function (color, i) {
    legend.append("rect").
    attr("width", 30).
    attr("height", 30).
    attr("x", 30 * i).
    attr("y", 20).
    style("fill", color);

    const legendNums = [0, 2.8, 3.9, 5, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8];

    legend.append("text").
    text(legendNums[i]).
    attr("x", 30 * i + 3).
    attr("y", 40).
    attr("class", "legend-text");
  });
}).catch(function (error) {
  console.log(error);
});