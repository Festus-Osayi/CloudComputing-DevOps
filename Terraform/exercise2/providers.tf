provider "aws" {
  region = var.REGION
}

resource "aws_instance" "var_instance" {
  ami = var.AMIS[var.REGION]

  instance_type = "t2.micro"
  key_name      = "Terraform_key"
  vpc_security_group_ids = ["sg-0f09daaf0ac28abae"
  ]
  availability_zone = var.ZONE1
  tags = {
    Name    = "Terraform Demo"
    Project = "Terraform Variables"
  }
}
