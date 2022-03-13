import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageRender from './PageRender';
import { Home, Login, Register } from './pages';

const App = () => {
  return (
    <Router>
      <input type='checkbox' id='theme' />
      <div className='app'>
        <div className='main'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/:page' element={<PageRender />} />
            <Route path='/:page/:id' element={<PageRender />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
