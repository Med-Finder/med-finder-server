// Sets and delete the "Authorization" header for "axios" req

import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // If logged in apply authorization to all the requests
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete authorization's head
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
