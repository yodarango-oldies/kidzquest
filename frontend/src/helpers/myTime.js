const myTime = () => {
  const today = new Date()
  const month = today.getMonth()
  const day = today.getDate()
  const year = today.getFullYear()
  const hour = today.getHours()
  const minutes = today.getMinutes()
  const seconds = today.getSeconds()

  return `${month + 1}/${day}/${year} ${hour}:${minutes}:${seconds}`
}

export default myTime
