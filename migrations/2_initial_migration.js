const MyToken = artifacts.require("Test"); 

module.exports = function (deployer) {
    deployer.deploy(MyToken, 100);
}