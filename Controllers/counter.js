const {delay} = require("@root/Helpers/utilty")
exports.start = async (req, res) => {
    let answer;
    await delay(1000).then(() => {
        answer = 'I have Waited for you';
    })
    res.status(200).json({
        status: true,
        message: answer
    })
}