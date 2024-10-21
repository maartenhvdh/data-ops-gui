import { mainMenu } from "../utils/navigation";
import { Menu } from "./menu/Menu";

const Home: React.FC = () => {
  return (
    <>
      <h2>Select an Action</h2>
      <div className="menu">
        <Menu actions={[...mainMenu]} />
      </div>
    </>
  );
};

export default Home;
