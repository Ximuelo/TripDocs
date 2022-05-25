export const api = {
    ip: "http://51.103.128.156:5000/tripdocs"
}

export const http = {
    ip: "http://51.103.128.156/imgs"
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

export const deleProfile = async() => {
  // console.log(user.selectedProfile)
  let response = await fetch(api.ip+"/profile/delete", {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+auth.token
  },
  body: JSON.stringify({
    _id: user.selectedProfile['_id']
  })
})
if(response.status==200){
    return true;
} else {
    return false;
}
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

  if(response.status==200){
    let responseJSON = await response.json()
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

export const upgrade = async() => {
  let response = await fetch(api.ip+"/upgrade", {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+auth.token
  }
})
let responseJSON = await response.json()
// console.log(responseJSON)
return responseJSON
// if(response.status==200){
//     return responseJSON;
// } else {
//   console.log(response.status)
//   console.log(responseJSON)
//     return false;
// }

}

export const createDocument = async(name:string,collectionIndex:number, effective_date:string, img_base64:string) => {
  let response = await fetch(api.ip+"/document/create", {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+auth.token
  },
  body: JSON.stringify({
    profile_id: user.selectedProfile['_id'],
    name: name,
    collectionIndex: collectionIndex,
    effective_date: effective_date,
    img_base64: img_base64
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

export const updateDocument = async(_id:string, name:string, collectionIndex:number, effective_date:string, img_base64:string) => {
  
  let response = await fetch(api.ip+"/document/update", {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+auth.token
  },
  body: JSON.stringify({
    _id: _id,
    profile_id: user.selectedProfile['_id'],
    name: name,
    collectionIndex: collectionIndex,
    effective_date: new Date(effective_date),
    img_base64: img_base64
  })
})
// let responseJSON = await response.json()

if(response.status==200){
    return true;
} else {
  console.log(response.status)
  console.log(response.body)
  // console.log(responseJSON)
    return false;
}

}

export const deleteDocument = async(_id:string) => {
  
  let response = await fetch(api.ip+"/document/delete", {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+auth.token
  },
  body: JSON.stringify({
    _id: _id
  })
})
// let responseJSON = await response.json()

if(response.status==200){
    return true;
} else {
  console.log(response.status)
  console.log(response.body)
  // console.log(responseJSON)
    return false;
}

}

export const updateProfile = async(_id:string,name:string,characters:string) => {
  let response = await fetch(api.ip+"/profile/update", {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+auth.token
  },
  body: JSON.stringify({
    _id: _id,
    name: name,
    characters: characters
  })
})
let responseJSON = await response.json()

if(response.status==200){
    return responseJSON;
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