// Created by Rohit Kumar Chaurasiya

const selectElement = document.getElementById("Algorithms");
selectElement.addEventListener("click", () => {
  updateExplanation();
});

function updateExplanation() {
  const selectedValue = selectElement.value;

  const explanationDiv = document.getElementById("Explanation");
  let content = '';
  switch (selectedValue) {
    case 'bubble':
      content = `   <h2>Bubble Sort</h2>
      <p>
        Bubble Sort is a simple sorting algorithm that repeatedly compares
        adjacent elements in a list and swaps them if they are in the wrong
        order. The process continues until no swaps are needed, indicating that
        the list is sorted. During each pass, the largest unsorted element
        "bubbles up" to its correct position at the end of the list. This
        continues until the entire list is sorted.
      </p>
      <h3>Time Complexity:</h3>
      <ul>
        <li>Worst-Case Time Complexity: O(n²)</li>
        <li>Average Time Complexity: O(n²)</li>
        <li>
          Best-Case Time Complexity: O(n)<br />
          ----The array is already sorted
        </li>
      </ul>

      <h3>Space Complexity - O(1)</h3>

      <h3>Algorithm:</h3>
      <ol>
        <li>Start with the first element of the array.</li>
        <li>Repeat the following steps until the array is sorted:</li>
        <ol>
          <li>For each pair of adjacent elements:</li>
          <ol>
            <li>If the first element is greater than the second, swap them.</li>
          </ol>
          <li>Move to the next pair of adjacent elements.</li>
          <li>Continue until the end of the array is reached.</li>
        </ol>
        <li>
          After each full pass, the largest unsorted element will be in its
          correct position.
        </li>
        <li>
          Repeat the process until no swaps are needed, indicating the array is
          sorted.
        </li>
      </ol>

      <a href="https://www.geeksforgeeks.org/bubble-sort-algorithm/">Bubble Sort (GFG)</a>
    `;
      break;
    case 'selection':
      content = `<h2>Selection Sort</h2>
<p>
  Selection Sort is a simple comparison-based sorting algorithm that divides the input list into two parts: a sorted part and an unsorted part. It repeatedly selects the smallest (or largest) element from the unsorted part and moves it to the end of the sorted part. This process continues until the entire array is sorted.
</p>
<h3>Time Complexity:</h3>
<ul>
  <li>Worst-Case Time Complexity: O(n²)</li>
  <li>Average Time Complexity: O(n²)</li>
  <li>Best-Case Time Complexity: O(n²)</li>
</ul>

<h3>Space Complexity:</h3>
<p>O(1) (in-place sorting)</p>

<h3>Algorithm:</h3>
<ol>
  <li>Start with the first element as the minimum.</li>
  <li>Compare this minimum with the next element in the array.</li>
  <li>If a smaller element is found, update the minimum.</li>
  <li>After each pass, swap the minimum with the first unsorted element.</li>
  <li>Repeat until the entire array is sorted.</li>
</ol>

<a href="https://www.geeksforgeeks.org/selection-sort/">Selection Sort (GFG)</a>
`;
      break;
    case 'insertion':
      content = `<h2>Insertion Sort</h2>
<p>
  Insertion Sort is a simple and intuitive sorting algorithm that builds a sorted array one element at a time. It works by dividing the array into a sorted and an unsorted part. The algorithm takes each element from the unsorted part and inserts it into the correct position in the sorted part. This process continues until all elements are sorted.
</p>
<h3>Time Complexity:</h3>
<ul>
  <li>Worst-Case Time Complexity: O(n²)</li>
  <li>Average Time Complexity: O(n²)</li>
  <li>
    Best-Case Time Complexity: O(n)<br />
    ----The array is already sorted
  </li>
</ul>

<h3>Space Complexity:</h3>
<p>O(1) (in-place sorting)</p>

<h3>Algorithm:</h3>
<ol>
  <li>Start from the second element, considering the first element as sorted.</li>
  <li>Take the current element and compare it with the sorted part.</li>
  <li>Shift all larger elements to the right to make space for the current element.</li>
  <li>Insert the current element at its correct position in the sorted part.</li>
  <li>Repeat until the entire array is sorted.</li>
</ol>

<a href="https://www.geeksforgeeks.org/insertion-sort/">Insertion Sort (GFG)</a>
`;
      break;
    case 'quick':
      content = `<h2>Quick Sort</h2>
<p>
  Quick Sort is a highly efficient sorting algorithm that utilizes a divide-and-conquer approach. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays: those less than the pivot and those greater than the pivot. The sub-arrays are then sorted recursively. This process continues until the entire array is sorted.
</p>
<h3>Time Complexity:</h3>
<ul>
  <li>Worst-Case Time Complexity: O(n²)</li>
  <li>Average Time Complexity: O(n log n)</li>
  <li>Best-Case Time Complexity: O(n log n)</li>
</ul>

<h3>Space Complexity:</h3>
<ul>
  <li>Worst-Case Space Complexity: O(n) (due to recursion stack in case of unbalanced partitions)</li>
  <li>Average Space Complexity: O(log n) (due to recursion stack in case of balanced partitions)</li>
  <li>Best-Case Space Complexity: O(log n) (similar to average case)</li>
</ul>

<h3>Algorithm:</h3>
<ol>
  <li><strong>Select a pivot:</strong> Choose an element from the array as the pivot. This can be the first, last, middle, or a random element.</li>
  <li><strong>Partition the array:</strong> Rearrange the array so that all elements less than the pivot come before it, and all elements greater come after it. The pivot is now in its final position.</li>
  <li><strong>Recursively apply Quick Sort:</strong> Apply the same process to the sub-arrays formed on either side of the pivot.</li>
  <li><strong>Base case:</strong> If a sub-array has one or no elements, it is already sorted.</li>
  <li><strong>Combine:</strong> No additional work is needed to combine; the array is sorted in place as the recursive calls return.</li>
</ol>

<a href="https://www.geeksforgeeks.org/quick-sort/">Quick Sort (GFG)</a>
`;
      break;
    default:
      content = '';
  }
  explanationDiv.innerHTML = content;
}