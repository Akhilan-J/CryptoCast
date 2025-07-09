import Landing from "./Pages/Landing";
import MainPage from "./Pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<MainPage />} path="/Main" />
        <Route element={<Terms />} path="/Terms" />
        <Route element={<Privacy />} path="/Privacy" />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
