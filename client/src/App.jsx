import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import CardList from "./components/card/CardList.jsx";
import CreateCard from "./components/card/CreateCard.jsx";
import CreateTag from "./components/tag/CreateTag.jsx";
import TagList from "./components/tag/TagList.jsx";
import CardDetails from "./components/card/CardDetails.jsx";
import CardByTag from "./components/card/CardByTag.jsx";

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cards" element={<CardList />} />
              <Route path="/create-card" element={<CreateCard />} />
              <Route path="/create-tag" element={<CreateTag />} />
              <Route path="/tags" element={<TagList />} />
              <Route path="/cards/:id" element={<CardDetails />} />
              <Route path="/cards-by-tag/:id" element={<CardByTag />} />
            </Routes>
        </Router>
  )
}

export default App
