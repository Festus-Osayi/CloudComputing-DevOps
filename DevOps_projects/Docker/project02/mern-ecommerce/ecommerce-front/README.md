# E-Commerce Frontend

Welcome to the E-Commerce Frontend! This project is built using Next.js, Node.js, styled-components, MongoDB, next-auth, Context Provider, Google Cloud Console, Stripe, and lazy loading.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Festus-Osayi/Assets.git
cd Assets/ecommerce-front
```

2. Set up your MongoDB connection string, Google Secret and Google ID, and AWS S3 Bucket credentials in .env file:

```
MONGODB_URI = your_mongodb_uri
STRIPE_PK = your_stripe_pk
STRIPE_SK = your_stripe_sk
PUBLIC_URL = your_public_url
NEXT_PUBLIC_URL = your_next_public_url
NEXTAUTH_URL = your_next_auth_url
STRIPE_ENDPOINT_SK = your_stripe_endpoint_sk
GOOGLE_FRONT_ID = your_google_id
GOOGLE_FRONT_SECRET = your_google_secret
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

This project uses Styled-Components [`Poppins`](https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic) to automatically optimize and load Poppins font, a custom Google Font.

## About

The E-Commerce Frontend is a modern web application that provides users with a seamless shopping experience. It offers a wide range of products, secure authentication, smooth checkout process, and integration with Google Cloud Console for analytics.

## Features

- User authentication and authorization using next-auth.
- Context Provider for managing global state across components.
- Integration with Google Cloud Console for analytics and reporting.
- Stripe integration for secure payment processing.
- Responsive design using styled-components.
- Lazy loading for optimized performance.
- Dynamic routing and navigation with Next.js.
- Integration with the [E-Commerce](https://github.com/Festus-Osayi/Assets/tree/master/ecommerce-admin) Admin Dashboard for seamless management of products, categories, inventory, and orders.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js
- MongoDB (or any preferred database)
- Google Cloud Console project set up
- Stripe account with API keys configured

## Usage

- Browse through product categories and listings.
- Add products to the shopping cart.
- Proceed to checkout and complete the purchase using Stripe.
- Sign in or create an account to access order history and preferences.
- View analytics and reports from Google Cloud Console.
- View order history and add product to wishlist
- Comprehensive search and filter functionality

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


This README.md file provides comprehensive information about the E-Commerce Frontend project, including features, installation instructions, usage guidelines, how to contribute, and licensing details. Customize the content as needed to fit your project's specifics.

```
