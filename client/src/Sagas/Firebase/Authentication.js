import firebase from '../../firebase'

export const getToken = (user) => {
  if (!user) return
  return new Promise((resolve) => {
    if (!user) resolve(false)
    user.getIdToken().then((idToken) => resolve(idToken))
  })
}

export const auth = () => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => resolve(user))
  })
}

export const signup = (email, password) => {
  return new Promise((resolve) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
      console.log(response)
      resolve({response})
    }).catch((error) => {
      console.warn(error)
      resolve({error})
    })
  })
}

export const login = (email, password) => {
  return new Promise((resolve) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
      console.log(response)
      resolve({response})
    }).catch((error) => {
      console.warn(error)
      resolve({error})
    })
  })
}

export const logout = () => {
  return new Promise((resolve) => {
    firebase.auth().signOut().then((response) => resolve(response))
  })
}