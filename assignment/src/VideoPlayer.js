import React from 'react';
import videojs from 'video.js'
import '../node_modules/video.js/dist/video-js.css'

export default class VideoPlayer extends React.Component {
  
  constructor(props) {
    super(props)
    this.handleFiles = this.handleFiles.bind(this)
    this.dragenter = this.dragenter.bind(this)
    this.dragover = this.dragover.bind(this)
    this.drop = this.drop.bind(this)
  }

  componentDidMount() {
    var videoFrame = document.getElementById("videoFrame");
    videoFrame.addEventListener("dragenter", this.dragenter, false);
    videoFrame.addEventListener("dragover", this.dragover, false);
    videoFrame.addEventListener("drop", this.drop, false);
  }

  dragenter(e) {
    console.log('DrageEnter called')
    e.stopPropagation();
    e.preventDefault();
  }
  
  dragover(e) {
    console.log('DrageOver called')
    e.stopPropagation();
    e.preventDefault();
  }
  
  drop(e) {
    this.componentWillUnmount()
    while (this.videoFrame.hasChildNodes()) {
      this.videoFrame.removeChild(this.videoFrame.lastChild);
    }
    e.stopPropagation();
    e.preventDefault();
    var dt = e.dataTransfer;
    var files = dt.files;
    this.handleFiles(files)
  }

  handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      const video = document.createElement("video")
      const file = files[i]
      video.file = file;
      this.videoFrame.appendChild(video);
      var reader = new FileReader();
      reader.onload = ((aVideo) => (e) => { 
        this.player = videojs(aVideo, { "controls": true, "autoplay": true, "preload": "auto" }).src({ type: "video/mp4", src: e.target.result})
      })(video);
      reader.readAsDataURL(file);
    }
  }

  componentWillUnmount() {
    if(this.player) {
      this.player.dispose()
    }
  }

  getStyle() {
    return ({
      videoDiv: {
        height: 200,
        width: 200,
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid'
      }
    })
  }
  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const { videoDiv } = this.getStyle()
    return (
      <div id="videoFrame" data-vjs-player style={videoDiv} ref={(frame) => this.videoFrame = frame}>
      </div>
    )
  }
}