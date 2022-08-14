import { Navbar, Button, Dropdown, Avatar } from "flowbite-react/lib/esm/components";
import {API, TOKEN_KEY} from "../../constants";
import {useContext} from "react";
import UserContext from "../../types/UserContext";
import {SessionService} from "../../services/sessionService";

function PublicHome() {

  return (
    <div className="mx-auto md:mx-12">
      Public Home
    </div>
  );
}

export default PublicHome;
