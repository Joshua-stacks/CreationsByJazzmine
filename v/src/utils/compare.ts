export const compareObjects = (object1: any, object2: any) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  // Verify that the objects have the same number of keys.
  if (keys1.length !== keys2.length) return false;

  // Compare each value at every key.
  for (var key of keys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    // Check if there is a nested object that also needs to be compared.
    const isObjects = typeof value1 === "object" && typeof value2 === "object";

    if (
      (isObjects && !compareObjects(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }

  return true;
};

