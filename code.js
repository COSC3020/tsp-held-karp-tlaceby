/**
 * @param {number[][]} distances adj matrix
 * @returns {number}
 */
function tsp_hk(distances) {
  const n = distances.length;
  const cache = new Map();

  // The distance from any point to iteself is 0. Cannot call with n < 2
  if (n <= 1) {
    return 0;
  }
  
  /**
   * TODO: Visualize best path
   * @param {Set} cities
   * @param {number} start
   * @returns {number}
   */
  function heldKarp(cities, start) {
    // Base case
    if (cities.size === 1) {
      const remainingCity = Array.from(cities)[0];
      return distances[start][remainingCity];
    }

    let minTourLength = Infinity;
    const key = `${Array.from(cities).join('-')}-${start}`;

    if (cache.has(key)) {
      return cache.get(key);
    } 

    // Base case
    if (cities.size === 1) {
      const remainingCity = Array.from(cities)[0];
      return distances[start][remainingCity];
    }

    // go through each unvisited city
    for (const city of cities) {
      if (city !== start) {
        const newCities = new Set(cities);
        newCities.delete(city);
        
        // tourLength = (start -> city) + (city -> .. -> tourEnd)
        const tourLength = heldKarp(newCities, city) + distances[start][city];
        minTourLength = Math.min(minTourLength, tourLength);
      }
    }

    cache.set(key, minTourLength);
    return minTourLength;
  }


  let minTourLength = Infinity;

  // Attempt with each city as a start.
  for (let start = 0; start < n; start++) {
    const cities = new Set([...Array(n).keys()].filter((c) => c !== start));
    const tourLength = heldKarp(cities, start);
    
    minTourLength = Math.min(minTourLength, tourLength);
  }

  cache.clear();
  return minTourLength;
}

module.exports = {
  tsp_hk,
};
