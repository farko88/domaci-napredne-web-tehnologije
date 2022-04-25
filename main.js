
//ucitavanje podataka sa worldbank-a
$.ajax({url: 'https://api.worldbank.org/v2/countries/USA/indicators/NY.GDP.MKTP.CD?per_page=5000&format=json'}).done(function (result) {

  //ucitavanje JSON podataka
  const dataset = result[1];

  //selektovanje SVG elementa iz index.html
  const svg = d3.select("svg");
  const margin = 250;

  //odredjivanje sirine i visine za D3
  const width = svg.attr("width") - margin;
  const height = svg.attr("height") - margin;

  //definisanje x-ose
  const xScale = d3.scaleTime().domain([new Date(1960, 1, 1, 0), new Date(2020, 1, 1, 0)]).range([0, width]);
  xScale.ticks(d3.timeYear.every(1));

  //odredjivanje maksimuma za y-osu
  const yScale = d3.scaleLinear().domain([0, 23000000000000]).range([height, 0]);

  const g = svg.append("g").attr("transform", "translate(" + 150 + "," + 100 + ")");

  //ispisivanje naslova grafika
  svg.append('text')
    .attr('x', width / 2 + 100)
    .attr('y', 100)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Grafik');

  //ispisivanje teksta ispod x-ose
  svg.append('text')
    .attr('x', width / 2 + 150)
    .attr('y', height + 150)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Godina');

  //ispisivanje teksta levo od y-ose
  svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(30,' + (height + margin) / 2 + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('BDP');

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  //ucitivanje podataka i prikazivanje
  svg.append('g')
    .selectAll("dot")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(new Date(d.date, 1, 1, 0));
    })
    .attr("cy", function (d) {
      return yScale(d.value);
    })
    .attr("r", 3)
    .attr("transform", "translate(" + 150 + "," + 100 + ")")
    //dodavanje klase sa animacijom
    .classed("pulse", "true")
    .style("fill", "#CC0000");

});
