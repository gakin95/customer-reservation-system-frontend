import { store } from "react-notifications-component";

function notification(title, message, type) {
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      click: true,
      duration: 10000,
      onScreen: true,
      pauseOnHover: true,
    },
  });
}

const successNotification = (message, title = "Success") => {
  notification(title, message, "success");
};

const errorNotification = (message, title = "Error") => {
  notification(title, message, "danger");
};

const warningNotification = (message, title = "Validation Error") => {
  notification(title, message, "warning");
};

export { successNotification, errorNotification, warningNotification };
