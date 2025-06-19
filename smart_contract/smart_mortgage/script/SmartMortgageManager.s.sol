// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import "../src/SmartMortgageManager.sol";

contract SmartMortgageManagerScript is Script {
    SmartMortgageManager public manager;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        manager = new SmartMortgageManager();
        console.log("Smart mortgage manager deployed at:", address(manager));

        vm.stopBroadcast();
    }
}
