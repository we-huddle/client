import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicHome from "./scenes/PublicHome";
import LoginRedirect from "./components/LoginRedirect";
import { Profile } from "./types/Profile";
import { API, TOKEN_KEY } from "./constants";
import { UserServices } from "./services/userServices";
import UserContext from "./types/UserContext";
import Layout from "./components/Layout";
import TasksView from "./scenes/TasksView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<Profile | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      API.TOKEN = token;
      const profile = await UserServices.fetchSelf();
      setLoggedInUser(profile);
    }
  };

  return (
    <div>
      <UserContext.Provider value={loggedInUser}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path={"/login/success"} element={<LoginRedirect />} />
              <Route path={"/"} element={<PublicHome />} />
              <Route path={"/profile"} />
              <Route path={"/badges"} />
              <Route path={"/sprints"} />
              <Route path={"/tasks"} element={<TasksView  isAgentView={false} />}/>
              <Route path={"/agent/tasks"} element={<TasksView isAgentView={true} />}/>
              <Route path={"/leaderboard"} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
