variable REGION {
  default = "us-east-1"
}

variable ZONE1 {
  default = "us-east-1a"
  
}

variable AMIS {
  type = map
    default = {
        us-east-1 = "ami-0fff1b9a61dec8a5f"
        us-west-2 = "ami-0d081196e3df05f4d"
    }
}