#!/bin/bash

# Launch an AWS EC2 through the command line

aws ec2 run-instances --image-id ami-0fff1b9a61dec8a5f --count 1 --instance-type t2.micro --key-name VPC-key --security-group-ids sg-00599dc2a85152c8c --subnet-id subnet-0b5bac5c34397895f
