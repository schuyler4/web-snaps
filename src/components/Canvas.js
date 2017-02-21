import React, { Component } from 'react'

class Canvas extends Component {
  constructor() {
    super()
    this.state = {texts: []}
  }

  componentDidMount() {
    this.showCanvas()
    this.getImage(this.props.getImage)
  }

  showCanvas() {
    const ctx = this.refs.canvas.getContext('2d')
    const image = new Image()
    image.src = this.props.image

    ctx.drawImage(image, 0, 0);
  }

  canvasClicked(event) {
    const ctx = this.refs.canvas.getContext('2d')
    const text = {
      x: event.clientX,
      y: event.clientY,
      text: this.props.text
    }

    if (this.props.mode === 'Text') {
      ctx.font = "30px Arial"
      ctx.fillText(text.text, text.x, text.y)
    } else if (this.props.mode === 'Draw') {
      ctx.arc(text.x, text.y, 5, 0, Math.PI*2, true);
      ctx.fill();
    }
  }

  getImage(callback) {
    callback(this.refs.canvas)
  }

  render() {
    return (
      <canvas ref="canvas" width={640} height={480}
        onClick={this.canvasClicked.bind(this)} />
    )
  }
}

export default Canvas
