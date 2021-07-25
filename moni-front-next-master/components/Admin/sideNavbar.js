import React from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";

const navbar = () => {
  return (
    <SideNav className="sidebar" onSelect={(selected) => {}}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem className="mt-5" eventKey="home">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Panel de administración</NavText>
        </NavItem>
        <NavItem className="mt-2" eventKey="charts">
          <NavIcon>
            <i
              className="fa fa-fw fa-line-chart"
              style={{ fontSize: "1.75em" }}
            />
          </NavIcon>
          <NavText>Operaciones</NavText>
        </NavItem>
        <NavItem className="mt-2" eventKey="charts/linechart">
          <NavIcon>
            <i
              className="ml-1 fa fa-fw fa-user"
              style={{ fontSize: "1.75em" }}
            />
          </NavIcon>
          <NavText>Los usuarios</NavText>
        </NavItem>
        <NavItem className="mt-2" eventKey="charts/barchart">
          <NavIcon>
            <i className=" fa fa-fw fa-bell" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Enviar notificación</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default navbar;
