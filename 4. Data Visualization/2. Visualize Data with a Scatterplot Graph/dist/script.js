const url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
d3.json(url).
then(function (data) {

  // Variables
  const dataset = data;
  const width = 850;
  const height = 600;
  const padding = 60;

  // Get the years from the data
  let years = dataset.map(d => {
    let year = new Date(d.Year, 0, 1, 0, 00, 00);
    d.parsedYear = d.Year; // New attr
    d.Year = year;
    return year;
  });

  // Add 2016 to widen the x axis
  years.push(new Date(2016, 0, 1, 0, 00, 00));

  // Get the times from the data
  let times = dataset.map(d => {
    let time = new Date();
    let [mm, ss] = d.Time.split(":");
    time.setMinutes(mm);
    time.setSeconds(ss);
    //console.log('time: ' + time);
    d.Time = time; // New attr
    d.parsedTime = mm + ":" + ss;
    return time;
  });

  // Create an SVG element
  const svg = d3.select('body').
  append('svg').
  attr('width', width).
  attr('height', height).
  attr('class', 'scatterplot-graph');

  // Create x scale
  const xScale = d3.scaleTime().
  domain(d3.extent(years)).
  range([padding, width - padding]);

  // Create y scale
  const yScale = d3.scaleTime().
  domain(d3.extent(times)).
  range([height - padding, padding]);

  // Create x axis
  const xAxis = d3.axisBottom(xScale);

  // Append x axis to svg element
  svg.append('g').
  attr('id', 'x-axis').
  attr("transform", "translate(0," + (height - padding) + ")").
  call(xAxis);

  // Create y axis - timeFormat will display min:sec
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

  // Append y axis to svg element
  svg.append('g').
  attr('id', 'y-axis').
  attr("transform", "translate(" + padding + ",0)").
  call(yAxis);

  // Add circles
  svg.selectAll("circle").
  data(dataset).
  enter().
  append("circle").
  attr("class", "dot").
  attr("cx", d => xScale(d.Year)).
  attr("cy", d => yScale(d.Time)).
  attr("r", 5).
  attr("data-xvalue", d => d.Year).
  attr("data-yvalue", d => d.Time).
  style('fill', d => {
    if (d.Doping) {
      return '#fc8210';
    } else {
      return '#007892';
    }
  }).
  on("mouseover", d => {
    tooltipOn(d);
    d3.select("#tooltip").
    style("left", d3.event.pageX - 50 + "px").
    style("top", d3.event.pageY + 20 + "px");
  }).
  on("mouseout", () => tooltipOff());



  // Add legend
  svg.append("circle").attr("cx", 600).attr("cy", 330).attr("r", 6).style("fill", '#fc8210');
  svg.append("circle").attr("cx", 600).attr("cy", 360).attr("r", 6).style("fill", '#007892');
  svg.append("text").attr("x", 620).attr("y", 330).text("Riders With Doping Allegations").style("font-size", "15px").attr("alignment-baseline", "middle");
  svg.append("text").attr("x", 620).attr("y", 360).attr("id", "legend").text("No Doping Allegations").style("font-size", "15px").attr("alignment-baseline", "middle");

  // Tooltip
  function tooltipOn(d) {
    d3.select("body").
    append("div").
    attr("id", "tooltip").
    attr("data-year", d.Year).
    style("position", "absolute").
    html(d.Name + ": " + d.Nationality + "<br>" + "Year: " + d.parsedYear + ", Time: " + d.parsedTime + "<br>" + d.Doping);
  }

  function tooltipOff() {
    d3.select("#tooltip").remove();
  }

}).catch(function (error) {
  console.log(error);
});