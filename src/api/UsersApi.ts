
// export async function getUsers() {
//   // variables in local storage
//   let headscaleURL = localStorage.getItem('headscaleURL') || '';
//   let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

//   // endpoint url for getting users
//   let endpointURL = '/api/v1/user';

//   //returning variables
//   let headscaleUsers = [new User()];
//   let headscaleUsersResponse: Response = new Response();

//   await fetch(headscaleURL + endpointURL, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       Authorization: `Bearer ${headscaleAPIKey}`
//     }
//   })
//     .then((response) => {
//       if (response.ok) {
//         // return the api data
//         headscaleUsersResponse = response;
//       } else {
//         return response.text().then((text) => {
//           apiTestStore.set('failed');
//           throw text;
//         });
//       }
//     })
//     .catch((error) => {
//       apiTestStore.set('failed');
//       throw error;
//     });

//   await headscaleUsersResponse.json().then((data) => {
//     headscaleUsers = data.users
//     // sort the users
//     headscaleUsers = sortUsers(headscaleUsers);
//   });
//   // Set the store
//   apiTestStore.set('succeeded');
//   userStore.set(headscaleUsers);
//   // Filter the store
//   filterUsers();
// }

// export async function editUser(currentUsername: string, newUsername: string): Promise<any> {
//   // variables in local storage
//   let headscaleURL = localStorage.getItem('headscaleURL') || '';
//   let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

//   // endpoint url for editing users
//   let endpointURL = '/api/v1/user/' + currentUsername + '/rename/' + newUsername;

//   await fetch(headscaleURL + endpointURL, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       Authorization: `Bearer ${headscaleAPIKey}`
//     }
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response;
//       } else {
//         return response.text().then((text) => {
//           throw JSON.parse(text).message;
//         });
//       }
//     })
//     .catch((error) => {
//       throw error;
//     });
// }
