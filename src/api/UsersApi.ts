import { User } from "./classes";

const getUsers = async (): Promise<any> => {
  let headscaleURL = localStorage.getItem("headscaleURL") || "";
  let headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";

  let endpointURL = "/api/v1/user";
  let headscaleUsers = [new User()];
  let headscaleUsersResponse: Response = new Response();

  await fetch(headscaleURL + endpointURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${headscaleAPIKey}`
    }
  })
    .then((response) => {
      if (response.ok) {
        headscaleUsersResponse = response;
      } else {
        return response.text().then((text) => {
          if (typeof text === "object") throw JSON.parse(text).message;
          else
            throw {
              status: response.status,
              statusText: response.statusText,
              message: text
            };
        });
      }
    })
    .catch((error) => {
      throw error;
    });

  await headscaleUsersResponse.json().then((data) => {
    headscaleUsers = data.users;
    // sort the users
    //headscaleUsers = sortUsers(headscaleUsers);
  });
  // Set the store
  //apiTestStore.set('succeeded');
  //userStore.set(headscaleUsers);
  // Filter the store
  //filterUsers();

  return headscaleUsers;
};

const editUser = async (currentUsername: string, newUsername: string): Promise<any> => {
  let headscaleURL = localStorage.getItem("headscaleURL") || "";
  let headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";

  let endpointURL = "/api/v1/user/" + currentUsername + "/rename/" + newUsername;
  await fetch(headscaleURL + endpointURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${headscaleAPIKey}`
    }
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        return response.text().then((text) => {
          if (typeof text === "object") throw JSON.parse(text).message;
          else
            throw {
              status: response.status,
              statusText: response.statusText,
              message: text
            };
        });
      }
    })
    .catch((error) => {
      throw error;
    });
};

export { getUsers, editUser };
