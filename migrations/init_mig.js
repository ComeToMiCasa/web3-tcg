const MyToken = artifacts.require("TestToken"); 

module.exports = function (deployer) {
    deployer.deploy(MyToken, 1000000);
}