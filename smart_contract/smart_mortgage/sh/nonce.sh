#!/bin/bash

source ./load_envs.sh

cast nonce $ACCOUNT --rpc-url $RPC
cast balance $ACCOUNT --rpc-url $RPC
cast wallet address $PRIVATE_KEY
