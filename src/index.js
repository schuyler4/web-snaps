import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Camera from './Camera'
import Home from './Home'
import NotFound from './NotFound'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={ Home }>
    </Route>
    <Route path="/snap" component={ Camera }>
    </Route>
    <Route path="*" component={ NotFound } >
    </Route>
  </Router>
), document.getElementById('root'))
