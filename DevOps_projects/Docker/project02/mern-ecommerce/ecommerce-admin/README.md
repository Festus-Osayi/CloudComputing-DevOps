# E-Commerce Admin Dashboard

Welcome to the E-Commerce Admin Dashboard! This project is built using Next.js, Node.js, Tailwind CSS, MongoDB, next-auth, AWS S3 Bucket, Google Cloud Console, SweetAlert, and lazy loading.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Festus-Osayi/Assets.git
cd Assets/ecommerce-admin
```

2. Set up your MongoDB connection string, Google Secret and Google ID, and AWS S3 Bucket credentials in .env file:

```
GOOGLE_ID = your_google_i
GOOGLE_SECRET = your_google_secret
MONGODB_URI = your_mongodb_connection_string
S3_ACCESS_KEY = your_aws_access_key
S3_SECRET_ACCESS_KEY = your_aws_secret_access_key
SECRET = your_aws_secret
```

3. Make sure you have [NodeJS](http://nodejs.org/) installed on your machine,

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses tailwind [`tailwind css`](https://tailwindcss.com/docs/font-family) to automatically optimize and load font, a custom Tailwind Font.

## About

The E-Commerce Admin Dashboard provides administrators with a comprehensive tool-set to manage various aspects of an e-commerce platform. From managing products and inventory to handling user orders and analytics, this dashboard empowers administrators to efficiently run their online store.

## Features

- User authentication and authorization using next-auth.
- Product management, including CRUD operations for products and categories.
- Inventory management to track product availability and stock levels.
- Order management to process and fulfill customer orders.
- Integration with AWS S3 Bucket for storing product images.
- Integration with Google Cloud Console for analytics and reporting.
- Responsive design using Tailwind CSS.
- SweetAlert for user-friendly alerts.
- Lazy loading for improved performance.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js
- MongoDB (or any preferred database)
- AWS account with S3 Bucket configured
- Google Cloud Console project set up

## Usage

- Log in using your administrator credentials.
- Manage products by adding, editing, or removing them.
- Track inventory levels and update stock quantities.
- Process and fulfill customer orders.
- View analytics and reports from Google Cloud Console.
- Configure settings and preferences for the admin dashboard.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

```

This README.md file provides comprehensive information about the E-Commerce Admin Dashboard project, including features, installation instructions, usage guidelines, how to contribute, and licensing details. Customize the content as needed to fit your project's specifics.

```
