/**
 * This is where we compare the shape of two objects
 * @param base one object to compare
 * @param test second object to compare
 */
function compare(base: any, test: any, ignoreArrayOrder?: boolean): boolean {
  //both keys must exist
  //both keys must be of the same type
  //both keys must either be, or not be, an array
  if (
    [base, test].includes(undefined) ||
    typeof base !== typeof test ||
    Array.isArray(base) !== Array.isArray(test)
  ) {
    return false; // negative case
    //If both are arrays, we need to map through
  } else if (test && Array.isArray(test) && Array.isArray(base)) {
    // if arrays are of diff size, not the same shape
    if (base.length !== test.length) {
      return false;
    }
    // We may be doing some splicing later on with this
    let baseList = [...base];
    const result = !test
      .map((elem, i) => {
        // here we need to compare each elem in both arrays
        if (ignoreArrayOrder) {
          const index = baseList.map(e => compare(elem, e)).indexOf(true);
          if (index === -1) {
            // not found
            return false;
          }
          baseList.splice(index, 1); //if found, removes from array to prevent repeats
          return true;
        }
        return compare(elem, base[i]);
      })
      .includes(false); //if false, then bad
    if (ignoreArrayOrder && baseList.length !== 0) {
      return false;
    }
    return result;
    // if it's an object, we go and do a recursive call
  } else if (test && typeof test === 'object') {
    return areObjectsSameShape([test, base], ignoreArrayOrder);
  }
  return true; //if no reason for things to be wrong, all set
}

/**
 * checks to see if objects given as args are of the same shape
 * @param objects Args to take in. Array
 * @param ignoreArrayOrder An optional parameter. If false, it will ignore the order of things in arrays, warning that this has unwanted side effects
 */
export function areObjectsSameShape(
  objects: any[],
  ignoreArrayOrder?: boolean
): boolean {
  if (objects.length < 2) {
    return true;
  }
  const base = objects.pop(); //remove one object to serve as the base
  const baseKeys = Object.keys(base); //we'll use the keys in a few places

  //iterate through all args, compare to base
  for (const obj of objects) {
    const keys = Object.keys(obj); // get keys of current
    const set = new Set([...keys, ...baseKeys]); // create a set of both keys
    if (set.size !== baseKeys.length) {
      //if set size of keys is same as key arr, ok
      return false; //otherwise bad
    }
    for (const key of keys) {
      // here, we'll compare each key, some recursion may happen
      const ok = compare(obj[key], base[key], ignoreArrayOrder);
      if (!ok) {
        //bail if not ok
        return false;
      }
    }
  }
  //this means no negative cases were found
  return true;
}
