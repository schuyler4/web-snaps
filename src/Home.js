import React, { Component } from 'react'
import firebase from 'firebase'
import { Button } from 'react-bootstrap'

class Home extends Component {
  constructor() {
    super()
    this.state = { data: [], index: 0, loading: true }
  }

  componentWillMount() {
    this.getData()
    this.getImage()
  }

  getData() {
    let data = []
    const ref = firebase.database().ref('snap')

    ref.on('value', snap => {
      snap.forEach(child => {
        data.push(child.val())
        this.setState({ data })
      })
      this.setState({ loading: false })
    })
  }

  getImage(id) {
    const storage = firebase.storage()
    const imageRef = storage.ref(`images/B1sdkSKKe`)

    imageRef.getDownloadURL().then(url => {
      let xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = (event) => {
        const blob = xhr.response
      }
      xhr.open('GET', url)
      xhr.send()

      console.log(url)
    })
  }

  nextClicked() {
    if(this.state.index < this.state.data.length - 1) {
      this.setState({ index: this.state.index + 1 })
    }
  }

  backClicked() {
    if(this.state.index > 0) {
      this.setState({ index: this.state.index - 1 })
    }
  }

  renderSlides() {
    this.getImage(this.state.data[this.state.index].id)
    if(this.state.data.length > 0) {
      console.log('rendered this one')
      return (
        <div>
          <h1>{ this.state.data[this.state.index].date }</h1>
          <Button onClick={ this.backClicked.bind(this) }>
            Last
          </Button>
          <Button onClick={ this.nextClicked.bind(this) }>
            Next
          </Button>
        </div>
      )
    } else {
      console.log('rendered this two')
      return (
        <h1>Nothing found</h1>
      )
    }
  }

  render() {
    if(!this.state.loading) {
      return this.renderSlides()
    } else {
      return <h1>Loading...</h1>
    }
  }
}

export default Home
