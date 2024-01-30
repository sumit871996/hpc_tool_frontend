import { Route, Routes } from "react-router-dom";
import AboutView from "../views/AboutView";
import HomeView from "../views/HomeView";
import SignupView from "../views/SignupView";
import FinaldockerfileOpenMPI from "../components/OutputWindow/FinaldockerfileOpenMPI";
import FinaldockerfileIntelMPI from "../components/OutputWindow/FinaldockerfileIntelMPI";
import FinaldockerfileMPICH from "../components/OutputWindow/FinaldockerfileMPICH";
import ConsoleViewV2 from "../components/OutputWindow/ConsoleView_v2";
import ContactView from "../views/ContactView";
import { ImageForm } from "../components/ImageForm";
import HomePageView from "../views/HomePageView";
import { ContainerizationFormView } from "../views/multistepform/ContainerizationFormView";
import { DockerFileView } from "../views/multistepform/DockerFileView";
import { MultiStepFormView } from "../views/multistepform/MultiStepFormView";
import { PushToHubForm } from "../views/multistepform/PushToHubForm";

const AppRouting = () => {
  return (
    <Routes >
      <Route path="/form" element={<HomeView />} />
      <Route path="/test" element={<ConsoleViewV2 />} />
      <Route path="/about" element={<AboutView />} />
      <Route path="/signup" element={<SignupView />} />
      <Route path="/contact" element={<ContactView />} />
      <Route path="/ImagePage" element={<ImageForm />} />
      <Route
        path="/dockerfileOpenMPI/show"
        element={<FinaldockerfileOpenMPI />}
      />
      <Route path="/dockerfileMPICH/show" element={<FinaldockerfileMPICH />} />
      <Route
        path="/dockerfileIntelMPI/show"
        element={<FinaldockerfileIntelMPI />}
      />
      <Route path="/" element={<HomePageView/>}/>
      <Route path="/formPage" element={<ContainerizationFormView/>} />
      <Route path="/displayDockerFile" element={<DockerFileView/>}/>
      <Route path="/multistage" element={<MultiStepFormView/>}/>
      <Route path="/dockerlogin" element={<PushToHubForm />}/>
    </Routes>
  );
};

export default AppRouting;
