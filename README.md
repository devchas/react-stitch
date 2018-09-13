# React Stitch

This simple React app demonstrates how to implement basic CRUD functionality using MongoDB's [Stitch](https://www.mongodb.com/cloud/stitch) as a backend

1. Follow the instructions in *Section B* of [this tutorial](https://docs.mongodb.com/stitch/tutorials/build-blog/) to create and configure a MongoDB Stitch application

2. Update the app ID with your Stitch application's ID in src/containers/BlogContainer.js

```javascript
const client = Stitch.initializeDefaultAppClient("<your-app-id>");
```

3. ```$ npm i```

4. ```$ npm start```