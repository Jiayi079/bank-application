//This file is one -> it have all backend API calls
const BACKEND_APP_URL = "http://localhost:8888";


export const loginUser = (username,password) => {
    return fetch(BACKEND_APP_URL+"/loginUser", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "username":username,
              "password":password
              })
          });
}

export const getUser = (username) => {
  return fetch(BACKEND_APP_URL+"/getUser?username="+username, {
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        });
}

export const registerUser = (username,password) => {
  console.log("register user called"+JSON.stringify({
                  "username":username,
                  "password":password,
                  }));
    return fetch(BACKEND_APP_URL+"/registerUser", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "username":username,
                  "password":password,
              })
          });
}

// export const editUsers = (name, username,password, mobileNumber, accountNumber) => {
//   console.log("register user called"+JSON.stringify({
//                 "name":name,
//                 "username":username,
//                 "password":password,
//                 "cnumber":mobileNumber,
//                 "accNo":accountNumber
//                 }));
//   return fetch(BACKEND_APP_URL+"/editUser?id="+localStorage.getItem("id"), {
//           method: "PUT",
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//                 "name":name,
//                 "username":username,
//                 "password":password,
//                 "cnumber":mobileNumber,
//                 "accNo":accountNumber
//             })
//         });
// }

export const getAllUsers = () => {
    return fetch(BACKEND_APP_URL+"/getAllUsers", {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
          })
          .catch(error=>{
              console.log("Error while getAllUsers");
          })
}

export const savePayment = (account, amount,mode, notes) => {
   return fetch(BACKEND_APP_URL+"/saveTransaction", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
                  "from":localStorage.getItem('username'),
                  "to":account,
                  "amount":amount,
                  "mode":mode,
                  "notes":notes,
                  "userId": localStorage.getItem('id')
                  })
        });
 }

 export const getAllFeeds = () => {
  return fetch(BACKEND_APP_URL+"/allTransactions?username="+localStorage.getItem('username'), {
          method: "GET",
          headers: {'Content-Type': 'application/json'},
        })
        .catch(error=>{
            console.log("Error while getAllUsers");
        })
}