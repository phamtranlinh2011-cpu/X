# CONTENT_AUDIT — NETLAB v1.3.0

## Phạm vi cập nhật

- Nâng ngân hàng từ 600 lên **800 câu**.
- 4 chương × 200 câu; 40 chủ đề/chương; mỗi chủ đề có 5 dạng đặt câu hỏi.
- Tạo **8 đề cố định × 100 câu**, mỗi đề có đúng 25 câu/chương.
- Chế độ random lấy 100/800 câu, cân bằng 25 câu/chương và không lặp chủ đề trong một lượt.
- Giữ mức nhập môn: câu hỏi tình huống, nhận diện, chức năng, lựa chọn phương án và subnetting cơ bản.
- Loại các prompt hỏi chung chung kiểu “trong chương này, chủ đề X là gì”; dùng câu hỏi trực tiếp hoặc tình huống.

## Nội dung lấy định hướng từ đề mẫu người học cung cấp

Đề mẫu có phong cách hỏi tình huống và lựa chọn giải pháp: topology, Client-Server/P2P, VLAN, VPN, LAN/WAN, miền va chạm, thiết bị mạng, OSI, TCP handshake, PDU, Ethernet/Wi-Fi, IP class, private IP, APIPA và chuyển đổi nhị phân/thập lục phân. Dự án đưa các nội dung phù hợp phạm vi nhập môn vào ngân hàng, không sao chép nguyên văn toàn bộ đề và không khẳng định đây là đề chính thức TDTU.

## Các kiểm tra đã chạy

- `node --check app.js`
- `node --check questions.js`
- `npm run check`
- Kiểm tra 800 câu, ID và nội dung không trùng.
- Kiểm tra 200 câu/chương và 40 chủ đề/chương.
- Kiểm tra 8 đề, mỗi đề 100 câu, 25 câu/chương, 25 đáp án đúng mỗi vị trí A/B/C/D.
- Mô phỏng 100 lượt random, mỗi lượt 100 câu và 25 câu/chương.
- Kiểm tra mỗi chủ đề có 5 biến thể ở 5 đề khác nhau và đáp án/lời giải nhất quán.
- Kiểm tra hồi quy OSI, TCP/IP, IP Stack, PDU, TCP/UDP, port, IPv4/IPv6, subnet/VLSM, đổi nhị phân/thập phân/hex, WEP/WPA/WPA2, Firewall, IDS/IPS, NAT, SPI.

## Giới hạn xác minh

Validator kiểm tra cấu trúc, dữ liệu, cân bằng đề và các đáp án hồi quy đã định trước; nó không thể tự chứng minh mọi câu hỏi/ngữ nghĩa đều hoàn hảo. Cần đối chiếu thêm với slide giảng viên và kiểm tra bản deploy thực tế trên Vercel. Câu hỏi do dự án biên soạn theo đề cương, ghi chú và đề mẫu người học gửi; không xác nhận là câu thi từng xuất hiện tại TDTU.

## Kiểm tra giao diện và triển khai

- Đã kiểm tra tham chiếu asset cục bộ trong `index.html`, cấu hình `package.json`, `.gitignore` và `vercel.json`.
- Đã thử mở website bằng Chromium qua localhost trong môi trường hiện tại; trình duyệt trả `ERR_BLOCKED_BY_ADMINISTRATOR`, nên không thể hoàn tất kiểm thử thao tác UI trong phiên này. Không ghi nhận đây là lỗi của website; cần xác nhận lại bằng local trên máy người dùng hoặc URL Vercel sau deploy.
