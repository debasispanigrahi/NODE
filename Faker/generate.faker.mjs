import { faker } from '@faker-js/faker';
import fs from "fs"
const data=[]

function generate(n){
  const user={
    full_name:faker.name.fullName(),
    email:faker.internet.email(),
    number:faker.phone.number('##########'),
    password:faker.datatype.string(10)
  }
  data.push(user)
  if(n!=1){
    generate(n-1)
  }
}
generate(1)

let filePath=import.meta.url.replace("file:///","").replace("generate.faker.mjs","fetch.json")

fs.writeFileSync(filePath,JSON.stringify(data),(err,suc)=>{
  console.log(err,suc)
})