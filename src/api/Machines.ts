import { Machine } from "./classes";

const getMachines = async (): Promise<any> => {
  let headscaleURL = localStorage.getItem("headscaleURL") || "";
  let headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";
  let endpointURL = "/api/v1/machine";

  let headscaleMachines = [new Machine()];
  let headscaleMachineResponse: Response = new Response();

  await fetch(headscaleURL + endpointURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${headscaleAPIKey}`
    }
  })
    .then((response) => {
      if (response.ok) {
        headscaleMachineResponse = response;
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

  await headscaleMachineResponse.json().then((data) => {
    headscaleMachines = data.machines;
    //headscaleMachines = sortMachines(headscaleMachines);
  });
  // set the stores
  //apiTestStore.set("succeeded");
  //machineStore.set(headscaleMachines);
  // filter the store
  //filterMachines();

  return headscaleMachines;
};

const newMachine = async (key: string, userName: string): Promise<any> => {
  let headscaleURL = localStorage.getItem("headscaleURL") || "";
  let headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";
  let endpointURL = "/api/v1/machine/register";

  await fetch(headscaleURL + endpointURL + "?user=" + userName + "&key=" + key, {
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

const moveMachine = async (machineID: string, user: string): Promise<any> => {
  let headscaleURL = localStorage.getItem("headscaleURL") || "";
  let headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";
  let endpointURL = "/api/v1/machine/" + machineID + "/user?user=" + user;

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

const renameMachine = async (machineID: string, name: string): Promise<any> => {
  let headscaleURL = localStorage.getItem("headscaleURL") || "";
  let headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";
  let endpointURL = "/api/v1/machine/" + machineID + "/rename/" + name;

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

const removeMachine = async (machineID: string): Promise<any> => {
  let headscaleURL = localStorage.getItem("headscaleURL") || "";
  let headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";
  let endpointURL = "/api/v1/machine/" + machineID;

  await fetch(headscaleURL + endpointURL, {
    method: "DELETE",
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

export { getMachines, newMachine, moveMachine, renameMachine, removeMachine };
