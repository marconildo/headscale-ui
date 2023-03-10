import { APIKey, PreAuthKey } from "./classes";

const getAPIKeys = async (): Promise<APIKey[]> => {
  let headscaleURL = localStorage.getItem("headscaleURL") || "";
  let headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";

  let endpointURL = "/api/v1/apikey";
  let apiKeysResponse = new Response();
  let apiKeys = [new APIKey()];

  await fetch(headscaleURL + endpointURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${headscaleAPIKey}`
    }
  })
    .then((response) => {
      if (response.ok) {
        apiKeysResponse = response;
      } else {
        console.log(response);
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

  await apiKeysResponse.json().then((data) => {
    apiKeys = data.apiKeys;
  });
  return apiKeys;
};

const getPreauthKeys = async (userName: string): Promise<PreAuthKey[]> => {
  let headscaleURL = localStorage.getItem("headscaleURL") || "";
  let headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";

  let endpointURL = "/api/v1/preauthkey";

  let headscalePreAuthKey = [new PreAuthKey()];
  let headscalePreAuthKeyResponse: Response = new Response();

  await fetch(headscaleURL + endpointURL + "?user=" + userName, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${headscaleAPIKey}`
    }
  })
    .then((response) => {
      if (response.ok) {
        headscalePreAuthKeyResponse = response;
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

  await headscalePreAuthKeyResponse.json().then((data) => {
    headscalePreAuthKey = data.preAuthKeys;
  });
  return headscalePreAuthKey;
};

const newPreAuthKey = async (
  userName: string,
  expiry: string,
  reusable: boolean,
  ephemeral: boolean
): Promise<any> => {
  let headscaleURL = localStorage.getItem("headscaleURL") || "";
  let headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";

  let endpointURL = "/api/v1/preauthkey";

  await fetch(headscaleURL + endpointURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${headscaleAPIKey}`
    },
    body: JSON.stringify({
      user: userName,
      expiration: expiry,
      reusable: reusable,
      ephemeral: ephemeral
    })
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

const removePreAuthKey = async (userName: string, preAuthKey: string): Promise<any> => {
  let headscaleURL = localStorage.getItem("headscaleURL") || "";
  let headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";

  let endpointURL = "/api/v1/preauthkey/expire";

  await fetch(headscaleURL + endpointURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${headscaleAPIKey}`
    },
    body: JSON.stringify({
      user: userName,
      key: preAuthKey
    })
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

export { getAPIKeys, getPreauthKeys, newPreAuthKey, removePreAuthKey };
