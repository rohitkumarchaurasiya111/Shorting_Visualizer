// The lerp function, short for "linear interpolation," is used to calculate a value that is a weighted average between two points. It’s commonly used in animations and graphics to create smooth transitions.


function lerp(start, end, t){
    return (1 - t) * start + t * end;
}

// Parameters
// start: The starting value (e.g., the current position).
// end: The ending value (e.g., the target position).
// t: A parameter that ranges from 0 to 1, representing the interpolation factor.
// If t = 0, the result is equal to start.
// If t = 1, the result is equal to end.
// Values between 0 and 1 give you points along the line connecting start and end.
