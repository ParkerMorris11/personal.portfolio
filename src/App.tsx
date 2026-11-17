import { BrowserRouter, Route, Routes } from "react-router-dom";
import CommandPalette from "./components/site/CommandPalette";
import Index from "./pages/Index.tsx";
import Term from "./pages/Term.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <BrowserRouter>
    <CommandPalette />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/term" element={<Term />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
