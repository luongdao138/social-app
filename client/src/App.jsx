import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Alert } from './components';
import PageRender from './PageRender';
import { Home, Login, Register } from './pages';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshToken } from './redux/actions';

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(auth.token);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <input type='checkbox' id='theme' />
      <div className='app'>
        <div className='main'>
          <Routes>
            <Route path='/' element={auth.token ? <Home /> : <Login />} />
            <Route path='/:page' element={<PageRender />} />
            <Route path='/:page/:id' element={<PageRender />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
