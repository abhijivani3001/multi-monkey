import { Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import AuthForm from './pages/AuthForm';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';

function App() {
  const isLoggedIn: boolean = false;

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        {isLoggedIn ? (
          <Route path='/' element={<Home />} />
        ) : (
          <Route path='/' element={<AuthForm />} />
        )}
        <Route path='/profile' element={<Profile />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
