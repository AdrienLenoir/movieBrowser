import {NavLink} from "react-router-dom";
import {FaHome, FaSearch, FaUserAlt} from "react-icons/all";

const Navigation = () => {
  return (
    <nav className="app-navigation">
      <ul>
        <li className="app-navigation-item">
          <NavLink to="/" activeClassName="app-navigation-item-active" exact={true}>
            <FaHome/>
          </NavLink>
        </li>
        <li className="app-navigation-item">
          <NavLink to="/discover" activeClassName="app-navigation-item-active" className="app-navigation-item-search">
            <FaSearch/>
          </NavLink>
        </li>
        <li className="app-navigation-item">
          <NavLink to="/user" activeClassName="app-navigation-item-active">
            <FaUserAlt/>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
