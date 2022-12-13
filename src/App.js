import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const App = () => {
  const options = {
    timeout: 5000,
    positions: positions.TOP_CENTER,
  };

  console.log("aula de jenkins");

  return (
    <BrowserRouter>
      <Provider template={AlertTemplate} {...options}>
        <Routes />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
