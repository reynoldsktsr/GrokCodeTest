var svg, inner, points;
var data = [];
var xValue, xScale, xMap, xAxis;
var yValue, yScale, yMap, yAxis;

function initD3() {

	// console.log('init');
	svg = d3.select('#graph').append('svg')
		.attr('id', 'd3-svg')
		.attr('width', '100%')
		.attr('height', '100%');

	var margin = {top: 50, right: 50, bottom: 50, left: 50},
		width = document.getElementById('d3-svg').getBoundingClientRect().width - margin.left - margin.right - margin.right,
		height = document.getElementById('d3-svg').getBoundingClientRect().height - margin.top - margin.bottom;

	inner = svg.append('g')
		.attr('id', 'd3-inner')
		.attr('transform', 'translate('+margin.left+','+margin.top+')scale(1)');

	xValue = function(d) { return d['prime']; };
	xScale = d3.scale.linear().domain([0,10000]).range([0,width]);
	xMap = function(d) { 
		return xScale(xValue(d)); 
	};
	xAxis = d3.svg.axis().scale(xScale).orient('bottom');

	yValue = function(d) { return d['sum']; };
	yScale = d3.scale.linear().domain([0,10000]).range([height,0]);
	yMap = function(d) { 
		return yScale(yValue(d)); 
	};
	yAxis = d3.svg.axis().scale(yScale).orient('left');


	inner.append('g')
		.attr('class', 'xAxis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis)
		.append('text')
		.attr('class','label')
		.attr('x', width)
		.attr('y', -6)
		.style('text-anchor', 'end')
		.text('Primes');

	inner.append('g')
		.attr('class', 'yAxis')
		.call(yAxis)
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 15)
		.style('text-anchor', 'end')
		.text('Sum')
	d3.selectAll('.domain').remove();

	points = inner.selectAll('.dot')
		.data(data)
		.enter().append('g')
		.attr('class', 'dot')
		.attr('id', function(d) { return 'prime-' + d.prime; })
		.attr('transform', function(d) {
			return 'translate(' + xScale(xValue(d)) + ',' + yScale(yValue(d)) + ')'
		})
		.append('circle')
		.attr('r', 3.5);
}
function updateData(newData) {
	data.push(newData);
	xScale.domain([d3.min(data, xValue), d3.max(data, xValue)]);
	yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);
	d3.selectAll('g.xAxis').call(xAxis);
	d3.selectAll('g.yAxis').call(yAxis);
	d3.selectAll('.domain').remove();
	// inner.selectAll('.dot')

	var circle = inner.selectAll('.dot')
		.data(data);
	circle.exit().remove();
	circle.enter().append('g')
		.attr('class','dot')
		.attr('id', function(d) { return 'prime-' + d.prime; })
		.append('circle')
		.attr('r', 3.5);

	circle.transition()
		.attr('transform', function(d) {
			return 'translate(' + xScale(xValue(d)) + ',' + yScale(yValue(d)) + ')'
		})
}


$(document).ready(function() {
	initD3();
});