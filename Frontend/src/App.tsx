import Landing from "./Pages/Landing";
import MainPage from "./Pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<MainPage />} path="/Main" />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
