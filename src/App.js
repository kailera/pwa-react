import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './container/Home.jsx'
import Post from './container/Post.jsx';

function App() {
  return (
    <main>
      <section>
        <Router>
          <div>
          <Switch>
            <Route path="/:subject/:id">
              <Post/>
            </Route>

            <Route path="/">
              <Home/>
            </Route>

            </Switch>
          </div>
        </Router>
      </section>
    </main>
  );
}

export default App;
