resource "aws_key_pair" "santra_key" {
  key_name   = "santrakey"
  public_key = file("santra.pub")

}

resource "aws_instance" "santra_instance" {
  ami                    = var.AMIS[var.REGION]
  instance_type          = "t2.micro"
  availability_zone      = var.ZONE1
  key_name               = aws_key_pair.santra_key.key_name
  vpc_security_group_ids = ["sg-0f09daaf0ac28abae"]
  tags = {
    Name    = "Terraform Demo"
    Project = "Terraform Provisioning"
  }

  provisioner "file" {
    source      = "web_setup.sh"
    destination = "/tmp/web_setup.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/web_setup.sh",
      "sudo /tmp/web_setup.sh"
    ]

  }

  connection {
    user        = var.USER
    private_key = file(var.PRIVATE_KEY)
    host        = self.public_ip
  }
}

output "aws_public" {
  value = aws_instance.santra_instance.public_ip
}

output "aws_private" {
  value = aws_instance.santra_instance.private_ip
}