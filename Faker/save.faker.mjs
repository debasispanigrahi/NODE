import fs from "fs"
import axios from 'axios'
let filePath=import.meta.url.replace("file:///","").replace("save.faker.mjs","fetch.json")

const data = JSON.parse(fs.readFileSync(filePath, "utf8"))
data.forEach(item => {
  var deatils = JSON.stringify({
    ...item
  });
  var config = {
    method: 'post',
    url: 'http://127.0.0.1:8080/web/signup',
    headers: {
      'Content-Type': 'application/json'
    },
    data: deatils
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      i++
    })
    .catch(function (error) {
      console.log(error);
    });

})