import { MenuSelection } from "./menu/MenuSelection";
import { SubMenuSelection } from "./menu/SubMenuSelection";

const Home: React.FC = () => {
  return (
    <>
      <h2>Select an Action</h2>
      <div className="menu">
        <MenuSelection />
        <SubMenuSelection />
      </div>
    </>
  );
};

export default Home;
