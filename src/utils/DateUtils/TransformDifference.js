const TransformDifference = (differenceArr) => {
  const stringToBeReturned = {
    0: "years",
    1: "months",
    2: "days",
    3: "hours",
    4: "minutes",
    5: "seconds",
  };

  let lastZeroIndex = differenceArr.lastIndexOf(0);

  if (lastZeroIndex === -1) {
    return `${differenceArr[0]} ${stringToBeReturned[0]} ago`;
  }

  if (lastZeroIndex + 1 === 6) {
    return "Just now";
  }

  return `${differenceArr[lastZeroIndex + 1]} ${
    stringToBeReturned[lastZeroIndex + 1]
  } ago`;
};

export default TransformDifference;
