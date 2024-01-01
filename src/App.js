import { Routes, Route } from "react-router-dom";
import { Home, About, Errorpage } from "./pages";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about/:slug" element={<About />}></Route>
      <Route path="*" element={<Errorpage />}></Route>
    </Routes>

  );
}

export default App;
