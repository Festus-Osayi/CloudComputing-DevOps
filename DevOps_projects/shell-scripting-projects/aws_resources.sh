#!/bin/bash

######################################

# Author: Festus Osayi
# Date: 10/15/2024
# Purpose: To check the resources usage in AWS 

######################################

## AWS S3
## AWS EC2
## Lambda
## AWS IAM

set -x # Debug mode
set -e # Exit scripts on any given arror

echo "Printing the list of buckets in AWS S3"
aws s3 ls # | jq ".Users[].UserId"

echo "Printing the list of instances ids in AWS EC2 instance"
aws ec2 describe-instances # | jq "Reservations[].Instances[].InstanceId"

echo "Printing the list of Lambda functions in AWS"
aws lambda list-functions

echo "Printing the list of AWS IAM Users"
aws iam list-users





