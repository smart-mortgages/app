#!/bin/bash

source ./load_envs.sh

if [ -z "$PRIVATE_KEY" ]; then
    echo "Error: PRIVATE_KEY environment variable is not set"
    exit 1
fi

forge script ../script/SmartMortgageManager.s.sol:SmartMortgageManagerScript --slow --multi --broadcast --private-key "$PRIVATE_KEY" --verify