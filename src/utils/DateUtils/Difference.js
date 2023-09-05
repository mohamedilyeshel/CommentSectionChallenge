const Difference = (createdAt) => {
  let commentDate = createdAt.getTime();
  let nowStamps = Date.now();
  let diff = new Date(Math.abs(nowStamps - commentDate));
  return [
    diff.getFullYear() - 1970,
    diff.getMonth() + 1,
    diff.getDate() - 1,
    diff.getHours() - 1,
    diff.getMinutes(),
    diff.getSeconds(),
  ];
};

export default Difference;
