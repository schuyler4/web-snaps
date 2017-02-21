import React, { Component } from 'react'
import Webcam from 'react-user-media'
import { Button } from 'react-bootstrap'
import firebase from './database'
import Canvas from './components/Canvas'
import shortid from 'shortid'

class Camera extends Component {
  constructor() {
    super()
    this.state = {
      snap: null,
      snapTaken: false,
      text: '',
      mode: 'Text',
      image: null,
      loading: true
    }

    this.id = shortid.generate()
  }

  takeSnap() {
    const snap = this.refs.webcam.captureScreenshot()
    this.setState({snap, snapTaken: true})
  }

  getImage(canvas) {
    let image = new Image()
    image.src = canvas.toDataURL('image/png')
    image = image.src.replace('data:image/png;base64,', '')
    this.setState({ image })
  }

  renderImage() {
    if (!this.state.snapTaken) {
      return <Webcam ref="webcam"/>
    } else if (this.state.snapTaken) {
      return <Canvas
        image={ this.state.snap } text={ this.state.text }
        mode={ this.state.mode }
        getImage={(canvas)=> this.getImage(canvas)}
      />
    }
  }

  textOnChange(event) {
    this.setState({ text: event.target.value })
  }

  modeOnClick() {
    if (this.state.mode === 'Text') {
      this.setState({ mode: 'Draw' })
    } else if (this.state.mode === 'Draw') {
      this.setState({ mode: 'Text' })
    }
  }

  sendClicked() {
    const ref = firebase.database().ref('snap')
    const date = new Date()

    ref.push({
      date: date.toString(),
      id: this.id
    })

    const storageRef = firebase.storage().ref()
    const imageRef = storageRef.child(`images/${ this.id }`)
    imageRef.putString(this.state.image,'base64').then((snapshot) => {
      console.log('uploading image')
    })
    this.setState({ snapTaken: false })
  }

  renderButtons() {
    if (!this.state.snapTaken) {
      return <button onClick={this.takeSnap.bind(this)}>Snap</button>
    } else if (this.state.snapTaken) {
      return (
        <div>
          <Button onClick={ this.sendClicked.bind(this) } bsSize="large" active>
            Send
          </Button>
          <Button
            onClick={ ()=> this.setState({ snapTaken: false }) }
            bsSize="large" active>
            Reject
          </Button>
          <h4>Text</h4>
          <input
            onChange={ this.textOnChange.bind(this) }
            value={ this.state.texts }
          />
        <button onClick={ this.modeOnClick.bind(this) }>
          { this.state.mode }
        </button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        { this.renderImage() }
        { this.renderButtons() }
      </div>
    )
  }
}

export default Camera
