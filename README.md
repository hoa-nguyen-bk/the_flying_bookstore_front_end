# The Flying Bookstore

A [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 📚 Table of Contents

- [Achievements](#-achievements)
- [Demo Links](#-demo-links)
- [Thesis Documentation](#-thesis-documentation)
- [Getting Started](#-getting-started)
- [Setup on New Machine](#-setup-on-new-machine)
- [Test Data](#-test-data)

## 🏆 Achievements

- **51 features** implemented within 3 months
- **18 stars** and **10 forks** on the front-end GitHub repository
- **10,000+ views** and **2,700+ unique visitors** to the website (measured by Vercel Analytics as of December 20, 2024)
- **9.5/10 score** for thesis defense with the strictest faculty committee, achieving the highest score among 5 groups in the defense session

## 🌐 Demo Links

### User Application
[The Flying Bookstore Demo](https://the-flying-bookstore.vercel.app/)

### Admin Dashboard
[The Flying Bookstore Dashboard Demo](https://the-flying-bookstore-dashboard-fe.vercel.app/)

## 📖 Thesis Documentation

### Thesis Defense Presentation Video
[10-minute presentation video](https://youtu.be/u2odpuOnYXM?si=bDP40r_lyNHou5Vz)

### Thesis Defense Slides
[View slides on Canva](https://www.canva.com/design/DAGaTryMbeo/dhtiewJRc8LQIwYTFBWGKg/edit?utm_content=DAGaTryMbeo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

### Thesis Report
[Full report (DOCX, PDF, and grading sheet)](https://github.com/hoa-nguyen-bk/report-final-project)

### Additional Resources
[Other thesis defense and review recordings](https://www.youtube.com/watch?v=mRBKgb8Xkqk&list=PL8cNucQ_sYRMHg8cbBJXI0oW_-90JdvAv)

## 🚀 Getting Started

### Installation

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔧 Setup on New Machine

### Prerequisites
- Docker
- Java JDK 21
- Git
- Ngrok

### Backend Setup

1. Clone the backend repository using Git

2. Run local YAML to create Docker images, volumes, and containers

3. Build with Gradle:
```bash
./gradlew build
```

4. Navigate to `build/libs` directory and run:
```bash
java -jar base-api-0.0.1-SNAPSHOT.jar
```

5. Install and configure Ngrok on your machine

## 🧪 Test Data

### Payment Test Data (VNPay)

```
Bank: NCB
Card Number: 9704198526191432198
Cardholder Name: NGUYEN VAN A
Issue Date: 07/15
OTP Password: 123456
```

For more test card information, visit:
[VNPay Sandbox Documentation](https://sandbox.vnpayment.vn/apis/vnpay-demo/#th%C3%B4ng-tin-th%E1%BA%BB-test)

### Sample Voucher Code

```
Green Recycle
GREEN40
```

### Sample Personal Information

```
Name: Nguyen Le Xuan Hoa
Email: hoa.nguyen_bk@hcmut.edu.vn
Date of Birth: 14/04/1999
Phone: 0905909909
Address 1: 12 Ly Tu Trong, Ward 1, District 1, Ho Chi Minh City
Address 2: 12 Cao Thang, Ward 1, District 1, Ho Chi Minh City
```

### Sample Book Information

```
Title: Don Quixote - The Ingenious Nobleman of La Mancha
Category: Classic
Author: Miguel de Cervantes Saavedra
Publisher: Van Hoc Publishing House
Dimensions: 2.4 x 13.5 cm
Pages: 603
ISBN: 8935095607914
Publication Date: 2010-12-12
Language: en

Description:
Since its publication, the novel Don Quixote - The Ingenious Nobleman of La Mancha has captivated readers both domestically and internationally. Brand new book with beautiful cover at great price.
```
