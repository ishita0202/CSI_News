import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/header/Navbar';

import PageRender from './customRouter/pageRender';
import PrivateRouter from './customRouter/PrivateRouter';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  const isLogin = localStorage.getItem('firstLogin');
  return (
    <Router>
      <div className="App">
      {isLogin && <Navbar />}
        <div className="main"> 
          {!isLogin &&
            <>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
            </>
          }
          <Route exact path="/" component={Home} />
          <div className="wrap-page">
            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
