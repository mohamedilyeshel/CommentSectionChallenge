const TransformCreatedAtDate = (createdAt) => {
  let indexOfT = createdAt.indexOf("T");
  let datePart = createdAt.substring(0, indexOfT);
  let TimePart = createdAt.substring(indexOfT + 1);
  const dateArr = [...datePart.split("-"), ...TimePart.split(":")];
  return new Date(...dateArr);
};

export default TransformCreatedAtDate;
