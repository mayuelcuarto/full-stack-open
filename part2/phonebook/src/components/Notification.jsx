const Notification = ({ messageType, message }) => {
  if (messageType===null || message === null) {
    return null
  }

  console.log(message)

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

export default Notification