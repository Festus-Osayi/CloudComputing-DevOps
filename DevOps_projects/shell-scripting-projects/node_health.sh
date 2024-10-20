#!/bin/bash

###################################

# Author: Festus Osayi
# Date: 10/15/2024
# Purpose: A basic script to check node/system health.

###################################

set -x # Debug mode
set -e # Exit script when there's an error
set -o pipefail 

df -h

free -m

nproc 

ps -ef | grep vagrant | awk '{print $2}'
