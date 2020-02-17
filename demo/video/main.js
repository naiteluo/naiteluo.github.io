const constraints = {
  audio: false,
  video: { facingMode: "user" }
};
window.onload = function() {
  let btn = this.document.getElementById("connectBtn");
  let v = document.getElementById("bgVideo");
  let cv = this.document.getElementById("cameraVideo");
  let cameraOpened = false;
  btn.addEventListener("click", e => {
    v.paused ? v.play() : v.pause();
    if (cameraOpened) {
      return;
    }
    navigator.mediaDevices.getUserMedia(constraints).then(
      stream => {
        cameraOpened = true;
        const video = cv;
        const videoTracks = stream.getVideoTracks();
        console.log("Got stream with constraints:", constraints);
        console.log(`Using video device: ${videoTracks[0].label}`);
        window.stream = stream; // make variable available to browser console
        video.srcObject = stream;
      },
      () => {
        if (error.name === "ConstraintNotSatisfiedError") {
          const v = constraints.video;
          errorMsg(
            `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
          );
        } else if (error.name === "PermissionDeniedError") {
          errorMsg(
            "Permissions have not been granted to use your camera and " +
              "microphone, you need to allow the page access to your devices in " +
              "order for the demo to work."
          );
        }
        errorMsg(`getUserMedia error: ${error.name}`, error);
      }
    );
  });
  resize();
};

function resize(e) {
  // IE/Edge still don't support object-fit: cover
  if ("object-fit" in document.body.style) return;

  // Video's intrinsic dimensions
  var w = this.videoWidth,
    h = this.videoHeight;

  // Intrinsic ratio
  // Will be more than 1 if W > H and less if H > W
  var videoRatio = (w / h).toFixed(2);

  // Get the container DOM element and its styles
  //
  // Also calculate the min dimensions required (this will be
  // the container dimentions)
  var container = this.opt.container,
    containerStyles = global.getComputedStyle(container),
    minW = parseInt(containerStyles.getPropertyValue("width")),
    minH = parseInt(containerStyles.getPropertyValue("height"));

  // If !border-box then add paddings to width and height
  if (containerStyles.getPropertyValue("box-sizing") !== "border-box") {
    var paddingTop = containerStyles.getPropertyValue("padding-top"),
      paddingBottom = containerStyles.getPropertyValue("padding-bottom"),
      paddingLeft = containerStyles.getPropertyValue("padding-left"),
      paddingRight = containerStyles.getPropertyValue("padding-right");

    paddingTop = parseInt(paddingTop);
    paddingBottom = parseInt(paddingBottom);
    paddingLeft = parseInt(paddingLeft);
    paddingRight = parseInt(paddingRight);

    minW += paddingLeft + paddingRight;
    minH += paddingTop + paddingBottom;
  }

  // What's the min:intrinsic dimensions
  //
  // The idea is to get which of the container dimension
  // has a higher value when compared with the equivalents
  // of the video. Imagine a 1200x700 container and
  // 1000x500 video. Then in order to find the right balance
  // and do minimum scaling, we have to find the dimension
  // with higher ratio.
  //
  // Ex: 1200/1000 = 1.2 and 700/500 = 1.4 - So it is best to
  // scale 500 to 700 and then calculate what should be the
  // right width. If we scale 1000 to 1200 then the height
  // will become 600 proportionately.
  var widthRatio = minW / w;
  var heightRatio = minH / h;

  // Whichever ratio is more, the scaling
  // has to be done over that dimension
  if (widthRatio > heightRatio) {
    var new_width = minW;
    var new_height = Math.ceil(new_width / videoRatio);
  } else {
    var new_height = minH;
    var new_width = Math.ceil(new_height * videoRatio);
  }
  debugger;
  this.style.width = new_width + "px";
  this.style.height = new_height + "px";
}
