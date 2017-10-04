import React from 'react';
import videojs from 'video.js'
import '../node_modules/video.js/dist/video-js.css'

export default class VideoPlayer extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      videoFlag: false
    }
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
    e.stopPropagation();
    e.preventDefault();
  }
  
  dragover(e) {
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
    const video = document.createElement("video")
    video.setAttribute("style" , "height: auto !important; width: 100% !important; ")
    const file = files[0]
    video.file = file;
    this.videoFrame.appendChild(video);
    var reader = new FileReader();
    var self = this
    reader.onload = ((aVideo) => (e) => { 
      this.player = videojs(aVideo, { 
        "controls": true, 
        "autoplay": true,
        "preload": "auto"
      }, 
      function ready() {
        self.prevTime = 0
        this.on('timeupdate', function () {
          self.currentTime = this.currentTime()
          const reversed = (self.currentTime - self.prevTime) < 0
          if(!reversed) {
            const currViewPercentage = self.currentTime/this.duration()
            const prevViewPercentage = self.prevTime/this.duration()
            if(((self.currentTime - self.prevTime) * 1000) < 1000 * this.playbackRate()) {
              if((prevViewPercentage > 0 && prevViewPercentage < .25) && 
                (currViewPercentage >= .25 && currViewPercentage < .5)) {
                self.props.handleLog('25%', file.name)
                // console.log('25%')
              }
              else if((prevViewPercentage > .25 && prevViewPercentage < .5) && 
                (currViewPercentage >= .5 && currViewPercentage < .75)) {
                self.props.handleLog('50%', file.name)
                // console.log('50%')
              }
              else if((prevViewPercentage > .5 && prevViewPercentage < .75) && 
                (currViewPercentage >= .75 && currViewPercentage < 1)) {
                self.props.handleLog('75%', file.name)
                // console.log('75%')
              }
              else if((prevViewPercentage >= .75 && prevViewPercentage < 1) && 
                currViewPercentage === 1) {
                self.props.handleLog('100%', file.name)
              }
            }
          }
          self.prevTime = self.currentTime
        })
      }).src({ type: "video/mp4", src: e.target.result})
    })(video);
    reader.readAsDataURL(file);
    this.setState({
      videoFlag: true
    })
  }

  componentWillUnmount() {
    if(this.player) {
     this.player.dispose()
    }
  }

  getStyle() {
    return ({
      videoDivActive: {
        height: '100%',
        width: '100%',
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'dotted',
        textAlignment: 'center'
      },
      videoDivHidden: {
        border: 'none'
      }
    })
  }
  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  render() {
    const { videoDivActive, videoDivHidden } = this.getStyle()
    let videoDiv = {}
    this.state.videoFlag ? (videoDiv = videoDivHidden) : (videoDiv = videoDivActive)
    return (
      <div id="videoFrame" style={videoDiv} ref={(frame) => this.videoFrame = frame}>
        <p style={{paddingTop:30}}>Drag and Drop Video Here</p>
      </div>
    )
  }
}