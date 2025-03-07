import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Qiita } from './components/Qiita';
import { CloneCoding } from './components/CloneCoding';
import { Schedule } from './components/Schedule';
import { TodoList } from './components/TodoList';
import { FortuneCookie } from './components/FortuneCookie';
import { Inspiration } from './components/Inspiration';

const App = () => {
  return (
    <Router>
      <header>
        <h1>welcome to lena X again! final 2025⛵️🌊</h1>
      </header>
      <div className='main'>
        <div className='left-main'>
          <Navbar />
        </div>
        <div className='right-main'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/todo' element={<TodoList />} />
            <Route path='/schedule' element={<Schedule />} />
            <Route path='/clone_coding' element={<CloneCoding />} />
            <Route path='/qiita' element={<Qiita />} />
            <Route path='/fortune_cookie' element={<FortuneCookie />} />
            <Route path='/inspiration' element={<Inspiration />} />
          </Routes>
        </div>
      </div>
      <footer>copyright by lena2025</footer>
    </Router>
  );
};

export default App;
