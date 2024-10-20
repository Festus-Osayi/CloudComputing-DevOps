terraform {
  backend "s3" {
    bucket = "terraform-states123"
    key    = "terraform/backend"
    region = "us-east-1"
  }
}