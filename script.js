const arrayContainer = document.getElementById('array-container');
const explanationContainer = document.getElementById('explanation');
let array = [];

function setArray() {
    const userInput = document.getElementById('user-array').value;
    array = userInput.split(',').map(Number);
    createBars();
}

function generateRandomArray(size = 10) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    createBars();
}

function createBars() {
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${80 / array.length}%`;

        const barValue = document.createElement('div');
        barValue.classList.add('bar-value');
        barValue.innerText = value;
        bar.appendChild(barValue);

        const pointer = document.createElement('div');
        pointer.classList.add('pointer');
        pointer.id = `pointer-${index}`;
        pointer.style.width = `${80 / array.length}%`;
        pointer.style.textAlign = 'center';
        bar.appendChild(pointer);

        arrayContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function highlightCode(line) {
    const lines = document.querySelectorAll('#code span');
    lines.forEach(line => line.classList.remove('highlight'));
    
    const highlightedLine = document.getElementById(`line-${line}`);
    highlightedLine.classList.add('highlight');
    
    highlightedLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');

    for (let i = 0; i < array.length; i++) {
        highlightCode(2);
        explanationContainer.innerText = `Starting outer loop iteration ${i + 1}`;
        await sleep(500);
        for (let j = 0; j < array.length - i - 1; j++) {
            highlightCode(3);
            explanationContainer.innerText = `Comparing array[${j}] (${array[j]}) with array[${j + 1}] (${array[j + 1]})`;
            await sleep(500);

            document.getElementById(`pointer-${j}`).innerText = 'j';
            document.getElementById(`pointer-${j + 1}`).innerText = 'j+1';

            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            await sleep(500);

            if (array[j] > array[j + 1]) {
                highlightCode(4);
                explanationContainer.innerText = `Swapping array[${j}] (${array[j]}) with array[${j + 1}] (${array[j + 1]})`;
                await sleep(500);

                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;

                bars[j].childNodes[0].innerText = array[j];
                bars[j + 1].childNodes[0].innerText = array[j + 1];

                highlightCode(5);

                await sleep(500);
            }
            bars[j].style.backgroundColor = '#3498db';
            bars[j + 1].style.backgroundColor = '#3498db';

            document.getElementById(`pointer-${j}`).innerText = '';
            document.getElementById(`pointer-${j + 1}`).innerText = '';
        }
    }
    highlightCode(9);
    explanationContainer.innerText = 'Sorting complete!';
}

function startSorting() {
    bubbleSort();
}

// Initialize with a random array
generateRandomArray();
