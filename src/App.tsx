import "./i18n.ts"; // i18n'ni yuklash
import { Route, Routes, BrowserRouter} from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth.tsx";
import CreateProject from "./pages/CreateProject.tsx";
import MyProjects from "./pages/MyProjects.tsx";
import ShowProject from "./pages/ShowProject.tsx";
import { SearchResults } from "./pages/Search.tsx";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/my-projects" element={<MyProjects />} />
          <Route path="/create-project" element= {<CreateProject />}/>
          <Route path="/project/:id" element={<ShowProject />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
