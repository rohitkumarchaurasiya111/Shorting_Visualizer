//Assessing the Element Canvas from HTML file
const myCanvas = document.getElementById("myCanvas");

//Set the size of canvas
myCanvas.width = 400;
myCanvas.height = 300;

const margin = 30;  //Margin 

const n = 20;
const array = [];
let moveDetails = []; //Stores the swapping and comparison details
const cols = [];

//Spacing means the width of Circle
const spacing = (myCanvas.width - margin * 2) / n;

// The getContext() method returns an object with tools (properties and methods) for drawing:
const ctx = myCanvas.getContext("2d");
const maxColumnHeight = 200;

init();  //So, that when we first open the page, we will see array elements

//To play with start and stop 
let start = document.querySelector("#start");
let reset = document.querySelector("#reset");

start.addEventListener("click", () => {
    reset.innerText = "Stop";
    start.style.display = "none";
})


reset.addEventListener("click", () => {
    if (reset.innerText == "Stop") {
        reset.innerText = "Reset Elements";
        start.style.display = "inline-block";
    }
})


//All these codes has been written to integrate audio with our animation
let audioCtx = null; // 

function playNode(freq, type) {
    if (audioCtx == null) {
        audioCtx = new (
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const dur = 0.2;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.type = type;
    osc.stop(audioCtx.currentTime + dur);

    const node = audioCtx.createGain();
    node.gain.value = 0.4;
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
    osc.connect(node);
    node.connect(audioCtx.destination);

}


//Declaration of init function as we made buttons with init function()
//This init function makes new array and it's column in screen
function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    moveDetails = [];

    //Fills cols[] array with all the details of individual cylinders 
    for (let i = 0; i < array.length; i++) {

        const x = i * spacing + spacing / 2 + margin;  //Center of Circle - x
        const y = myCanvas.height - margin - i * 3; //Center of Circle - y
        //Here, i*3 is subtracted to make the cylinders look like 3D like they are going apart as we go ahead;


        //3 is subtracted to give spacing between two cylinders
        const width = spacing - 3;

        //height = (total height - up and down margin) * array -> so that the height is synced with array values

        // const height = (myCanvas.height - margin * 2) * array[i];
        //This was occupying more height

        //So, We specified the maxColumnHeight so that if array value is max i.e. 1 then it will occupy the Maximum Height else the height will be smaller

        const height = (maxColumnHeight) * array[i];

        cols[i] = new Column(x, y, width, height);
        //We don't need to draw here as animation will do the drawing part now
    }
}

function play() {
    const selectElement = document.getElementById("Algorithms");
    const selectedValue = selectElement.value;
    switch (selectedValue) {
        case 'bubble':
            moveDetails = BubbleSort(array);
            break;
        case 'selection':
            moveDetails = SelectionSort(array);
            break;
        case 'insertion':
            moveDetails = InsertionSort(array);
            break;
        case 'quick':
            moveDetails = QuickSort(array);
            break;
    }
    //moveDetails variable will get an array which stores all the swapped and comparison data
}

animate();

let animationSpeed = 15; // Default speed

function updateSpeed() {
    const speedInput = document.getElementById("speed");
    animationSpeed = speedInput.value; // Get the current value of the range input
    document.getElementById("speedValue").innerText = animationSpeed; // Display the current speed
}


function animate() {

    //This clears or make transparent rectangle
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    let changed = false; //Here, to track if change is occuring then we don't do other changes

    for (let i = 0; i < cols.length; i++) {
        changed = cols[i].draw(ctx) || changed; //Gives the value to change
    }


    //If move array has some values i.e. BubbleSort has been called
    //If changes is true i.e. change is occuring then it will not work on other array to change
    if (!changed && moveDetails.length > 0) {
        const move = moveDetails.shift(); //remove the first element from an array and return that element

        const [i, j] = move.indices;  //returns the indices which you have kept into the array during shorting

        ////just to play the sound
        const waveformType = move.swap ? "square" : "sine";
        playNode(cols[i].height + cols[j].height, waveformType);

        const speedInput = document.getElementById("speed");
        animationSpeed = speedInput.value; // Get the current value of the range input

        if (move.swap) { //If the swapping is done
            cols[i].moveTo(cols[j], animationSpeed);
            //This will create the animation to cylinders to move form i to j and j to i;
            cols[j].moveTo(cols[i], animationSpeed, -1);
            //Here, -1 make the cylineder move kind of backward creating the swapping effect

            [cols[i], cols[j]] = [cols[j], cols[i]];
            //Since cols[i] and cols[j] has been swapped in screen. so, we swap there values in our array also
        } else {
            //Comparisons

            cols[i].jump(animationSpeed);
            cols[j].jump(animationSpeed);
            //This jump() function is defined under column.js and is applied to show the jump effect whenever two values are compared

        }
    }
    if (moveDetails.length == 0) {
        start.style.display = "inline-block";
        reset.innerText = "Reset Elements";
    }

    requestAnimationFrame(animate);
    // This method is a way to ask the browser to run a specific function just before it redraws (or repaints) the screen. When you use this method, you're telling the browser, "Hey, I want to do some animation work, so please call this function before you refresh what the user sees."
}


//All Sorting Algorithms are implemented here

//1. Bubble Sort Algorithm
function BubbleSort(array) {
    const moves = [];
    //Moves store all the swaps and comparisons done by algorithm to demostrate on our screen

    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                swapped = true;
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
                //using array destructuring in JavaScript to swap two elements in an array

                moves.push({ indices: [i - 1, i], swap: true });
                //moves storing the swapped elements

            } else {
                moves.push({ indices: [i - 1, i], swap: false });
                //Moves storing the comparisons
            }
        }
    } while (swapped);
    return moves;
}

//2. Insertion Sort Algorithm
function InsertionSort(arr) {

    const moves = [];
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
            moves.push({ indices: [j - 1, j], swap: true });
            j--;
        }
        if (j > 0)
            moves.push({ indices: [j - 1, j], swap: false });
    }
    return moves;
}

//3. Selection Sort Algorithm
function SelectionSort(arr) {
    const moves = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
            moves.push({ indices: [i, j], swap: false });
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            moves.push({ indices: [i, minIndex], swap: true });
        }
    }
    return moves;
}

//4. Quick Sort Algorithm
function QuickSort(arr, left = 0, right = arr.length - 1, moves = []) {
    if (left < right) {
        const pivotIndex = partition(arr, left, right, moves);
        QuickSort(arr, left, pivotIndex - 1, moves);
        QuickSort(arr, pivotIndex + 1, right, moves);
    }
    return moves;
}

function partition(arr, left, right, moves) {
    const pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        moves.push({ indices: [j, right], swap: false }); // Comparison animation
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
            moves.push({ indices: [i, j], swap: true }); // Swap animation
        }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]]; // Place pivot
    moves.push({ indices: [i + 1, right], swap: true }); // Pivot swap animation
    return i + 1;
}

//Merge Sort Algorithm
//To Do Later
// function MergeSort(arr, left = 0, right = arr.length - 1, moves = []) {
//     if (left < right) {
//         const mid = Math.floor((left + right) / 2);

//         // Recursively sort both halves
//         MergeSort(arr, left, mid, moves);
//         MergeSort(arr, mid + 1, right, moves);

//         // Merge the sorted halves
//         merge_arr(arr, left, mid, right, moves);
//     }
//     return moves;
// }

// function merge_arr(arr, start, mid, end, moves) {
//     let i = start;
//     let j = mid + 1;
//     let temp_arr = [];
//     let k = 0;

//     // Merge the two halves into the temporary array
//     while (i <= mid && j <= end) {
//         moves.push({ indices: [i, j], swap: false });  // Comparison animation

//         if (arr[i] < arr[j]) {
//             temp_arr.push({ index: k, swapfrom: i });  // Store index and source
//             i++;
//         } else {
//             temp_arr.push({ index: k, swapfrom: j });  // Store index and source
//             j++;
//         }
//         k++;
//     }

//     // Copy remaining elements from the left half
//     while (i <= mid) {
//         temp_arr.push({ index: k, swapfrom: i });
//         i++;
//         k++;
//     }

//     // Copy remaining elements from the right half
//     while (j <= end) {
//         temp_arr.push({ index: k, swapfrom: j });
//         j++;
//         k++;
//     }

//     // Copy sorted elements back into the original array using temp_arr
//     for (let k2 = 0; k2 < temp_arr.length; k2++) {
//         const { index, swapfrom } = temp_arr[k2];  // Destructure temp_arr entries
//         arr[start + index] = arr[swapfrom];  // Update the original array

//         // Push the final swap animation to moves
//         moves.push({ indices: [start + index, swapfrom], swap: true });
//     }
// }
