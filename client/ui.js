function onVolumeButtonClick() {
  let className = document.getElementById("volume-button-icon").className;
  if (className === "volume up icon") {
    document.getElementById("volume-button-icon").className = "volume off icon";
  } else {
    document.getElementById("volume-button-icon").className = "volume up icon";
  }
}