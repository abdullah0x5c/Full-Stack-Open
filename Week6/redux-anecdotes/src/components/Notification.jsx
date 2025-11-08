import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const notificationMessage = useSelector(state => state.notification)  

  const emptyNotification = ( <></> )
  const notification = (<div style={style}> {notificationMessage} </div>)

  return notificationMessage.length > 0? notification: emptyNotification
}

export default Notification
