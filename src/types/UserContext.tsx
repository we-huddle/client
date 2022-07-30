import React from "react";
import {Profile} from "./Profile";

const UserContext = React.createContext<Profile | null>(null);

export default UserContext;
