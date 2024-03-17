import SidebarWrapper from "./SidebarWrapper";
import Navigation from "./Navigation";
import Trigger from "./Trigger";

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Trigger />
      <Navigation />
    </SidebarWrapper>
  );
};

export default Sidebar;
