# login-firebase

This repository for study about firebase

## Prepare

### Firebase Config File

Create config file at `/client/src/Library/Firebase/config.js`

```
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

export default firebaseConfig
```

## Make

After `git clone`, run `npm i` and `npm run build-prod;node app`