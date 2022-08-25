const onlyOne=(a,body,field)=>{
    if(![undefined].includes(a) && ![undefined].includes(body[field])) return Promise.reject(`Parameter Error!!! For This Field Do Not Include ${field}`);
    return true
}
module.exports={onlyOne}