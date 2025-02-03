const areStringArraysEqual = (array1: string[], array2: string[]): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  const sortedArr1 = [...array1].sort();
  const sortedArr2 = [...array2].sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
};

export { areStringArraysEqual };
