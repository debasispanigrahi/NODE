const { delay } = require("@/Helpers/utilty");
const userModel = require("@/Models/user.model");
exports.start = async (req, res) => {
    // let answer;
    // const find = await userModel.find({})
    // await delay(1000).then(() => {
    //     answer = 'I have Waited for you';
    // })
    // res.status(200).json({
    //     status: true,
    //     message: find,
    //     answer: answer
    // })
    res.render('index', {
        locals: {
            title: 'Welcome!', name: [
                'debasish', 'ram', 'shyam', 'sita'
            ]
        }
    })
}