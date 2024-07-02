import { Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const isLoggedIn: boolean = false;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        {!isLoggedIn && (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </>
        )}
        {isLoggedIn && <Route path='/profile' element={<Profile />} />}
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
