# First script to launch an EC2 instance

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "terraform_demo" {
  ami           = "ami-0fff1b9a61dec8a5f"
  instance_type = "t2.micro"
  key_name      = "Terraform_key"
  vpc_security_group_ids = ["sg-0f09daaf0ac28abae"
  ]
  availability_zone = "us-east-1a"
  tags = {
    Name    = "Terraform Demo"
    Project = "Terraform"
  }

}