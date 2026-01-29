const testController = (req, res) => {
    res.status(200).send({
        message: "Welcome to Test Route",
        success: true
    });
};

module.exports = { testController };