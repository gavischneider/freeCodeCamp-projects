const url = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

d3.json(url).
then(function (data) {

  const dataset = data.children;
  const width = 1200;
  const height = 1000;
  const padding = 60;

  // Extract genres
  const genres = dataset.map(d => {
    return d.name;
  });

  // Create an SVG element
  const svg = d3.select('body').
  append('svg').
  attr('width', width).
  attr('height', height).
  attr('class', 'tree-map').
  append("g");

  let root = d3.hierarchy(data).
  sum(d => d.value).
  sort((a, b) => b.height - a.height || b.value - a.value);

  d3.treemap().
  size([width, height - 3 * padding]).
  paddingTop(5).
  paddingRight(5).
  paddingInner(2)(
  root);

  let category = new Set(root.leaves().map(d => d.data.category));

  // color scale
  let color = d3.scaleOrdinal().
  domain(category).
  range(["#00405C", "#56508C", "#BB5191", "#FE6464", "#FEA704", "#F9B38F", "#88D8B0"]);

  let cell = svg.selectAll("g").
  data(root.leaves()).
  enter().
  append("g").
  attr("class", "group").
  attr("transform", function (d) {return "translate(" + d.x0 + "," + d.y0 + ")";});

  // Add rectangles:
  let tile = cell.append("rect").
  attr("id", function (d) {return d.data.id;}).
  attr("class", "tile").
  attr("width", function (d) {return d.x1 - d.x0;}).
  attr("height", function (d) {return d.y1 - d.y0;}).
  attr("data-name", function (d) {
    return d.data.name;
  }).
  attr("data-category", function (d) {
    return d.data.category;
  }).
  attr("data-value", function (d) {
    return d.data.value;
  }).
  attr("fill", function (d) {
    return color(d.data.category);
  }).
  on("mouseover", d => {
    tooltipOn(d);
    d3.select("#tooltip").
    style("left", d3.event.pageX - 50 + "px").
    style("top", d3.event.pageY + 20 + "px");
  }).
  on("mouseout", () => tooltipOff());

  // Tooltip
  function tooltipOn(d) {
    d3.select("body").
    append("div").
    attr("id", "tooltip").
    attr("data-value", d.data.value).
    style("position", "absolute").
    html(d.data.name + "<br>" + d.data.category + "<br>" + "Value: " + d.data.value);
  }

  function tooltipOff() {
    d3.select("#tooltip").remove();
  }

  // Text labels
  cell.append("text").
  attr('class', 'tile-text').
  selectAll("tspan").
  data(function (d) {return d.data.name.split(/(?=[A-Z][^A-Z])/g);}) //.split(/(?=[A-Z][^A-Z])/g)
  .enter().append("tspan").
  attr("x", 4).
  attr("y", function (d, i) {return 13 + i * 10 + 3;}).
  text(function (d) {return d;}).
  style('fill', 'white').
  style('font-size', 12).
  style('margin', '5px');

  // add legend   
  const legend = svg.append("g").
  attr("class", "legend").
  attr("height", 150).
  attr("width", 100).
  attr('transform', 'translate(-550, 850)').
  attr('id', 'legend');

  legend.selectAll('rect').
  data(genres).
  enter().
  append("rect").
  attr("x", width - 65).
  attr("y", function (d, i) {return i * 20;}).
  attr("width", 10).
  attr("height", 10).
  attr('class', 'legend-item').
  style("fill", function (d) {
    return color(genres.indexOf(d));
  });

  legend.selectAll('text').
  data(genres).
  enter().
  append("text").
  attr("x", width - 52).
  attr("y", function (d, i) {return i * 20 + 9;}).
  text((d, i) => genres[i]);

}).
catch(function (error) {
  console.log(error);
});