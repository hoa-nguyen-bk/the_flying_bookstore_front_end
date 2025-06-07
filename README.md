This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Link demo hệ thống: 
- Link người dùng
[The Flying Bookstore demo](https://the-flying-bookstore-front-end.vercel.app/)
- Link admin:
[The Flying Bookstore Dashboard demo](https://the-flying-bookstore-dashboard-fe.vercel.app/)

## Getting Started

Install
```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

## Chạy trên máy mới
cài docker và java jdk 21 và git

cài git và clone backend về

Xong chạy local yaml trước để tạo image và volumn và container trên docker

Xong chạy build gradle bằng lệnh

```
./gradlew build
```
vào thư mục build/libs chạy lệnh 
```
java -jar base-api-0.0.1-SNAPSHOT.jar
```
cài ngrok vào máy

## Data Test
```
Ngân hàng	NCB
Số thẻ	9704198526191432198
Tên chủ thẻ	NGUYEN VAN A
Ngày phát hành	07/15
Mật khẩu OTP	123456
```
xem thêm thông tin thẻ test tại
[vnpay](https://sandbox.vnpayment.vn/apis/vnpay-demo/#th%C3%B4ng-tin-th%E1%BA%BB-test)


## Voucher mẫu
Green Recycle
GREEN40

## thông tin cá nhân mẫu
Nguyễn Lê Xuân
Hòa
hoa.nguyen_bk@hcmut.edu.vn
14/04/1999
0905909909
12 Lý Tự Trọng, p.1, q.1, tp.HCM
12 Cao Thắng, p.1, q.1, tp.HCM

## thông tin sách mẫu
Đôn Kihôtê - Nhà quý tộc tài ba xứ Mantra
Kinh điển
Miguel de Cervantes Saavedra
NXB Văn học
2.4 x 13.5
603
8935095607914
2010-12-12
en

Từ khi ra đời, cuốn tiểu thuyết Đôn Kihôtê - Nhà quý tộc tài ba xứ Mantra đã chinh phục dư luận người đọc trong nước cũng như ngoài nước. Sách bìa mới cóng đẹp giá tốt
