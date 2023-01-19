// //DEPENDENCY
// const crypt = require("crypto");
// const z002=require("pino")({
//     transport:{
//         target:"pino-pretty"
//     }
// })

// //FUNCTION DECLARATION
// const z000 = (): string => crypt.randomUUID()
// const z001 = (max: number = 10, min: number = 0): number => crypt.randomInt(min, max)

// //RANDOM NUMBER APPLIER
// /**
//    * Returns truly random value.
//    *
//    * @remarks
//    * This method is part of the global object.
//    *
//    * @param max - Maximum Value, default:10
//    * @param min - Minimum Value,default:0
//    * @returns Generate random value between `max` and `min`
// */
// var random: (max?: number, min?: number) => number
// global.random = z001

// //GLOBAL OBJECT TYPE DECLARTION
// interface Custom {
// /**
//    * @remarks
//    * This method is part of the global custom object.
//    * @returns Cryptobased unique uuid
// */
//     generateUuid: () => string,
// }
// //GLOBAL OBJECT DATA IMPLEMENTATION
// var custom: Custom
// global.custom = {
//     generateUuid: z000
// }

// var Logger:{}
// global.Logger=z002
