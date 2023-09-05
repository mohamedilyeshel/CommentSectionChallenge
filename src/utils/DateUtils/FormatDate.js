const FormatDate = (timestamp) => {
  let createdNow = new Date(timestamp);
  let createdNowFormated = `${createdNow.getFullYear()}-${createdNow.getMonth()}-${createdNow.getDate()}T${createdNow.getHours()}:${createdNow.getMinutes()}:${createdNow.getSeconds()}`;
  return createdNowFormated;
};

export default FormatDate;
