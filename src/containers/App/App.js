import CommentSection from "../CommentSection/CommentSection";
import { GeneralProvider } from "../../Context/GeneralContext";

function App() {
  return (
    <GeneralProvider>
      <CommentSection />
    </GeneralProvider>
  );
}

export default App;
