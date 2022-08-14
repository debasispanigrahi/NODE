const  moduleAlias=require('module-alias')

//ADD MODULE ALIAS HERE
moduleAlias.addAliases({
    "@root": __dirname,
    "@helper": __dirname+"/Helpers",
    "@controllers": __dirname+"/Controllers",
    "@middleware": __dirname+"/Middleware",
    "@data": __dirname+"/Data"
})

//MODULE-ALIAS INITIALIZE
moduleAlias()