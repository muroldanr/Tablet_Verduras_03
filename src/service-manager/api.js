import axios from 'axios';


/*    headers:[{"Content-Type" : "application/json"},
             {"Access-Control-Allow-Origin" : "*"},
             {"Access-Control-Allow-Methods" : "DELETE, POST, GET, OPTIONS"},
             {"Access-Control-Allow-Headers" : "Content-Type, Access-Control-Allow-Heade"}
            ]
});*/

/*const instanceAuth = (token) => {
    const currentToken = token || localStorage.getItem("token")
    return axios.create({
        headers: {"Content-Type" : "application/json", "Authorization": `Bearer ${currentToken}`}
    })
} */

/*const multipartInstanceAuth = (token) => {
    const currentToken = token || localStorage.getItem("token")
    return axios.create({
        headers: {"Content-Type" : "multipart/form-data", "Authorization": `Bearer ${currentToken}`}
    })
}*/
//const  qs  =  require ( 'query-string' )

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const instanceForm = axios.create({
    headers:{"Content-Type" : "multipart/form-data"}
});

function regeneraInstancia() {
  //var token = localStorage.getItem('token');
  var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IldFQiIsIm5iZiI6MTY1NzA0OTI0NiwiZXhwIjoxNzQ3MDQ5MjQ2LCJpYXQiOjE2NTcwNDkyNDYsImlzcyI6IkFQSSBSRVNUIiwiYXVkIjoiTUFTIEVSUCJ9.rJLpCM9Fw2AGOlvrAydEN4FI9RuC7gBvkd1rma98Jv0";
  return axios.create({
        headers:{"Authorization":"Bearer " + token}
  });
}

class ApiManager{

    loginUser(path, data){
        return new Promise((resolve, reject) => {
            regeneraInstancia().post(path,data)
                .then(response => {
                    console.log("AuthToken: " + response.data.AuthToken)
                    console.log("RefreshToken: " + response.data.RefreshToken)
                    console.log("RefreshTokenExpiry: " + response.data.RefreshTokenExpiry)

                    
                    resolve(response.data)
                })
                .catch(error => {
                    
                   reject(error.response)
                }).finally(function () {

                });
        })
    }

    getData(path){
        return new Promise((resolve, reject) => {
            regeneraInstancia().get(path,{timeout: 60000})
                .then(response => {resolve(response)})
                .catch(error => { 
                  reject(error.response)
                 })
                .finally(function () {

                });
            })
    }

    postData(path,data) {
        return new Promise((resolve, reject) => {
            regeneraInstancia().post(path, data,{timeout: 60000})
            .then(response => {resolve(response.data)})
            .catch(
              error => {
                reject(error.response)
                })
            .finally(function () {

          });
        })
    }

    postDataForm(path, data) {
      return new Promise((resolve, reject) => {
          instanceForm.post(path, data)
          .then(response => {resolve(response.data)})
          .catch(error => {
             
              reject(error.response)
          })
          .finally(function () {
            
          });
      });
    }
/*
    postDataFormUrlencoded(path, data) {
      return new Promise((resolve, reject) => {
          axios.post(path, qs.stringify(data),config)
          .then(response => {resolve(response.data)})
          .catch(error => {
              reject(error.response)
          })
          .finally(function () {
            
          });
      });
    }*/
}

export default new ApiManager()

/*async function callApi(endpoint, options = {}) {
  await simulateNetworkLatency();

  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}


    postPromise(parameters){
        return new Promise((resolve, reject) => {
            instanceAuth(this.token).post(parameters, {})
                .then(response => {resolve(response.data)})
                .catch(error => reject(error.response.data))
        })
    }

const api = {
  badges: {
    list() {
      return callApi('/badges');
    },
    create(badge) {
      return callApi(`/badges`, {
        method: 'POST',
        body: JSON.stringify(badge),
      });
    },
    read(badgeId) {
      return callApi(`/badges/${badgeId}`);
    },
    update(badgeId, updates) {
      return callApi(`/badges/${badgeId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
    remove(badgeId) {
      return callApi(`/badges/${badgeId}`, {
        method: 'DELETE',
      });
    },
  },
};

export default api;*/