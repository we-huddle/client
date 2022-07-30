import { Navbar, Button, Dropdown, Avatar } from "flowbite-react/lib/esm/components";
import {API, TOKEN_KEY} from "../../constants";
import {useContext} from "react";
import UserContext from "../../types/UserContext";
import {SessionService} from "../../services/sessionService";

function PublicHome() {
  const userProfile = useContext(UserContext);
  const authUrl = `${API.BASE}/authorize`

  const handleLogout = async () => {
    await SessionService.destroySession();
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/";
  }

  return (
    <div className="mx-auto md:mx-12">
      <Navbar>
        <Navbar.Brand href="#">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">We huddle</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {userProfile ? (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={<Avatar alt="User profile" img={userProfile.photo} rounded={true}/>}
            >
              <Dropdown.Header>
                <span className="block text-sm">{userProfile.name}</span>
                <span className="block truncate text-sm font-medium">{userProfile.githubUsername}</span>
              </Dropdown.Header>
              <Dropdown.Item onClick={handleLogout}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Button href={authUrl}>
              Login using github
            </Button>
          )}
          <Navbar.Toggle />
        </div>
      </Navbar>
    </div>
  )
}

export default PublicHome;
