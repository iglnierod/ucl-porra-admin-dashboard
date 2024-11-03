import { Routes, Route } from "react-router-dom";
import { MenuBar } from "./components/utils/MenuBar";
import { Matches } from "./components/matches/Matches";

function App() {
  return (
    <main className="py-4 px-4 w-full flex flex-col items-center">
      <MenuBar />
      <Routes>
        <Route path="/" element={<Matches />} />
        {/* <Route path="/" element={<Standings />} /> */}
        {/* <Route path="/predictions" element={<Predictions />} /> */}
      </Routes>
    </main>
  );
}

export default App;
