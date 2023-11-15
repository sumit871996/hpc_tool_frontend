import { Route, Routes } from "react-router-dom";
import AboutView from "../views/AboutView";
import HomeView from "../views/HomeView";
import SignupView from "../views/SignupView";
import FinaldockerfileOpenMPI from "../components/OutputWindow/FinaldockerfileOpenMPI";
import FinaldockerfileIntelMPI from "../components/OutputWindow/FinaldockerfileIntelMPI";
import FinaldockerfileMPICH from "../components/OutputWindow/FinaldockerfileMPICH";
import ConsoleViewV2 from "../components/OutputWindow/ConsoleView_v2";
import ContactView from "../views/ContactView";
const AppRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/test" element={<ConsoleViewV2 />} />
      <Route path="/about" element={<AboutView />} />
      <Route path="/signup" element={<SignupView />} />
      <Route path="/contact" element={<ContactView />} />

      <Route
        path="/dockerfileOpenMPI/show"
        element={<FinaldockerfileOpenMPI />}
      />
      <Route path="/dockerfileMPICH/show" element={<FinaldockerfileMPICH />} />
      <Route
        path="/dockerfileIntelMPI/show"
        element={<FinaldockerfileIntelMPI />}
      />
    </Routes>
  );
};

export default AppRouting;
