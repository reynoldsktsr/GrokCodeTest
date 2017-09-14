var sum = 0;
var running = false;
var loopPrimes;

function findPrimes(form) {
	sum = 0;
	document.getElementById('playerToggle').innerHTML = "Pause";
	document.getElementById('playerToggle').setAttribute('onclick', 'pause()');
	document.getElementById('playerStart').disabled = true;
	running = true;
	// initD3();
	// console.log(form);
	// var end = form.elements.end.value;
	var end = document.getElementById('endValue').value;
	console.log(end);
	var array = [];
	var primes = [];
	for (var i = 0; i < end; i++) {
		array.push(true);
	}
	for (var i = 2; i <= Math.sqrt(end); i++) {
		if (array[i]) {
			for (var j = i*i; j < end; j += i) {
				array[j] = false;
			}
		}
	}
	// for (var i = 2; i < end; i++) {
	// 	if (array[i]) {
	// 		primes.push(i);
	// 		// push to table
	// 		processPrime(i);
	// 	}
	// }
	var i = 2;
	loopPrimes = function() {
		if(running) {
			var timeout = setTimeout(function() {
				if (i < end) {
					if (array[i]) {
						primes.push(i);
						processPrime(i);
					}
					loopPrimes();
				}
				i++;
			}, array[i - 1] ? 100 : 0);
		} else {
			return;
		}
	}
	loopPrimes();
	// console.log(primes);
	// return false;
}
function processPrime(prime) {
	// Add Prime to Table
	// Add to running sum
	// Add sum to table
	var row = document.createElement('tr');
	var item = document.createElement('td');
	item.innerHTML = '<td>' + prime + '</td>';
	row.appendChild(item);
	// console.log(row);
	item = document.createElement('td');
	sum += prime;
	item.innerHTML = '<td>' + sum + '</td>';
	row.appendChild(item);
	document.getElementById('primeTable').appendChild(row);
	// Update Graph
	updateData({'prime':prime, 'sum': sum});
}

function reset() {
	d3.selectAll('.dot').remove();
	document.getElementById('primeTable').innerHTML = '<tr><td>Prime</td><td>Sum</td></tr>';
	data = [];
	document.getElementById('playerStart').disabled = false;
	running = false;

}

function pause() {
	document.getElementById('playerToggle').innerHTML = "Resume";
	document.getElementById('playerToggle').setAttribute('onclick', 'resume()');
	running = false;
}
function resume() {
	document.getElementById('playerToggle').innerHTML = "Pause";
	document.getElementById('playerToggle').setAttribute('onclick', 'pause()');
	running = true;
	loopPrimes();
}