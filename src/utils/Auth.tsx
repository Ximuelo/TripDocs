export const api = {
    ip: "http://192.168.1.139:3000/tripdocs"
}

export const http = {
    ip: "http://192.168.1.139/imgs"
}

export const auth = {
    token: ""
}

export const user = {
  email: "",
  subscription: "",
  profiles: "",
  selectedProfile:"",
  documents:""
}

export const register = async(email:string,password:string) => {
  let response = await fetch(api.ip+"/register", {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: email,
    password: password
  })
})
if(response.status==201){
    return true;
} else {
    return false;
}

}

export const login = async(email:string,password:string) => {
    let response = await fetch(api.ip+"/login", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: email,
      password: password
    })
  })
  let responseJSON = await response.json()

  if(response.status==200){
    auth.token=responseJSON['token']
    user.email=responseJSON['user']['username']
    user.subscription=responseJSON['user']['subscription']
      return true;
  } else {
      return false;
  }
  
}

export const getProfiles = async() => {
    let response = await fetch(api.ip+"/profile/get", {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+auth.token
    }
  })
  let responseJSON = await response.json()
  if(response.status==201){
      return responseJSON;
  } else {
      return false;
  }
  
}

export const createProfile = async(name:string,characters:string) => {
  let response = await fetch(api.ip+"/profile/create", {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+auth.token
  },
  body: JSON.stringify({
    name: name,
    characters: characters
  })
})
let responseJSON = await response.json()

if(response.status==201){
    return true;
} else {
  console.log(response.status)
  console.log(responseJSON)
    return false;
}

}

export const getDocuments = async() => {
  // console.log(api.ip+"/document/get?profile_id="+user.selectedProfile['_id'])
  let response = await fetch(api.ip+"/document/get?profile_id="+user.selectedProfile['_id'], {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+auth.token
  }
})
let responseJSON = await response.json()
if(response.status==201){
    return responseJSON;
} else {
    return false;
}

}