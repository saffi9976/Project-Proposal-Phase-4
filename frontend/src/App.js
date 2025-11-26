// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import CreateJob from './pages/CreateJob';
// import EditJob from './pages/EditJob';
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/create" element={<CreateJob />} />
//         <Route path="/edit/:id" element={<EditJob />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateJob from './pages/CreateJob';
import EditJob from './pages/EditJob';
import "./App.css";

function App() {
  return (
    <Router>
      <header className="navbar">
        <h2>Job Board</h2>
        <div>
          <a href="/">Home</a>
          <a href="/create">Create</a>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateJob />} />
        <Route path="/edit/:id" element={<EditJob />} />
      </Routes>
    </Router>
  );
}

export default App;
