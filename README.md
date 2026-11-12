# NETLAB — Ôn giữa kỳ Nhập môn Mạng máy tính (TDTU)

Website trắc nghiệm tiếng Việt dành cho sinh viên năm nhất. Dự án là static site, không cần backend và có thể đưa thẳng lên GitHub Pages/Vercel.

## Phiên bản ngân hàng câu hỏi đã chỉnh sửa

**NETLAB v1.3.0** — bản cập nhật giao diện trang chủ; ngân hàng câu hỏi và logic làm bài giữ nguyên.

Ngân hàng đã được biên tập lại theo đúng các mục trong đề cương ôn tập người học cung cấp, ưu tiên mức **nhận biết – hiểu – tính toán cơ bản**. Ngân hàng tập trung mức nhập môn: nhận biết, hiểu chức năng, chọn giải pháp trong tình huống đơn giản và tính subnet cơ bản. Một số thuật ngữ trong đề mẫu như VLAN, VPN, hub, switch, Ethernet, SSH/Telnet được đưa vào ở mức cơ bản.

- **800 câu hỏi**, gồm 160 chủ đề trọng tâm × 5 cách đặt câu hỏi; mỗi chương có 40 chủ đề và 200 câu.
- Câu hỏi được ưu tiên đặt theo tình huống sử dụng mạng, nhận diện thiết bị/giao thức, xử lý sự cố đơn giản và bài toán thực tế; không hỏi người học “chương này nói về gì”. Không dùng lại tình huống yêu cầu một đáp án khác với đáp án đang gắn vào câu, tránh lỗi kiểu hỏi một octet IP thuộc lớp nào nhưng đáp án lại là dải octet.
- Vị trí đáp án đúng được cân bằng: mỗi đề cố định có đúng 25 đáp án A, 25 B, 25 C và 25 D.
- Nội dung tập trung vào định nghĩa, chức năng, nguyên lý cơ bản, giao thức/port, OSI 7 tầng, TCP/IP 4 tầng, IP Stack 5 tầng, PDU, TCP/UDP header, IPv4/IPv6, lớp địa chỉ, subnet mask và VLSM.
- Bổ sung bảo mật Wi-Fi: WEP, WPA, WPA2/AES-CCMP; phân biệt rõ WPA3 là thế hệ mới hơn.
- Bổ sung Network Security: Firewall, IDS, IPS, SPI; giữ các thuật ngữ NAT, ARP, RIP.
- Subnetting có bài tính block size, số bit cần mượn, số host, Network ID, Broadcast, dải host và chọn prefix VLSM cho nhu cầu host.
- Phần File Distribution giữ công thức Client-Server và P2P ở mức nhập môn, kèm giải thích các biến.
- **Mức độ:** 760 câu cơ bản và 40 câu tính toán subnet cơ bản (các biến thể vẫn thuộc cùng chủ đề, không phải 800 khái niệm hoàn toàn độc lập).

> **Nguồn câu hỏi:** Tự biên soạn theo đề cương người học gửi, bốn ảnh ghi chú trong `x.rar` và kiến thức mạng máy tính nhập môn. Đây không phải đề thi chính thức hoặc câu hỏi đã xác minh từng xuất hiện tại TDTU. Công cụ truy cập web không khả dụng trong phiên chỉnh sửa nên không thể xác minh đề thi công khai của trường. `SOURCES.md` liệt kê tài liệu kỹ thuật để đối chiếu, không phải nguồn đề thi TDTU.

## Chức năng

- **Đề mặc định:** chọn ngẫu nhiên một trong 8 đề cố định; mỗi đề có 100 câu và đúng 25 câu/chương.
- **Đề random:** chọn 100 câu từ kho 800 câu, cân bằng 25 câu/chương và không lặp chủ đề trong cùng lượt.
- Hai chế độ thời gian: 60 phút hoặc không giới hạn. Hết giờ tự động nộp bài.
- Mỗi màn hình hiển thị một câu. Chọn đáp án sẽ khóa câu, báo đúng/sai và hiện giải thích ngắn.
- Nộp bài có hộp xác nhận; kết quả gồm điểm thang 100, số câu đúng/sai/chưa làm (ba nhóm thống kê tách biệt, không đếm trùng) và phần xem lại câu sai/chưa làm.
- Responsive cho desktop, tablet và mobile; có animation chuyển cảnh và trạng thái tương tác.

## Chạy trên máy

Website không cần cài thư viện. Dùng Python tích hợp sẵn trên Windows:

```powershell
py -m http.server 8000
```

Sau đó mở `http://localhost:8000`. Hoặc dùng `npx serve .` nếu đã cài Node.js.

## Kiểm tra dữ liệu

Yêu cầu Node.js 18+ để chạy validator:

```bash
npm run check
```

Validator kiểm tra 800 câu, số câu/chương, số câu/đề, câu không trùng, cấu trúc đáp án, 100 lượt random mô phỏng và các đáp án hồi quy về OSI, TCP/IP, PDU, header, port, subnet/VLSM cùng WEP/WPA/WPA2, Firewall, IDS/IPS, NAT và SPI.

## Deploy lên Vercel

1. Tạo repository trên GitHub và upload toàn bộ nội dung thư mục này.
2. Vào Vercel → **Add New → Project** → import repository.
3. Framework Preset: **Other**.
4. Build Command: để trống. Output Directory: `.`.
5. Nhấn **Deploy**. Đây là static site, không cần backend hoặc rewrite.

## Cấu trúc dự án

```text
.
├── index.html
├── styles.css
├── app.js
├── questions.js
├── vercel.json
├── package.json
├── README.md
├── SOURCES.md
├── CONTENT_AUDIT.md
└── scripts/
    └── validate-questions.mjs
```

## Những điểm đã rà và sửa trong lượt này

- Cập nhật trang chủ: bỏ khối “Bản đồ kiến thức” gồm thông tin 4 chương và ghi chú nguồn; đổi thẻ thông tin thành “Thông báo từ máy chủ:” với nội dung “Các con dân của ta hãy lấy mà làm =))”.
- Giữ sửa lỗi thống kê từ v1.2.0: sửa thống kê `Câu sai` để chỉ tính câu đã trả lời sai; câu bỏ trống được thống kê riêng và không bị đếm trùng.
- Cân bằng vị trí đáp án đúng A/B/C/D: mỗi đề mặc định 100 câu có đúng 25 đáp án ở từng vị trí; validator kiểm tra tự động.
- Đã chạy validator cho toàn bộ 800 câu và kiểm tra tĩnh mã nguồn. Cần kiểm tra thêm trên URL Vercel thực tế sau khi deploy.

- Câu thứ tự OSI hỏi rõ **từ cao xuống thấp**: Application → Presentation → Session → Transport → Network → Data Link → Physical. Nếu đề hỏi từ thấp lên cao thì đảo ngược thứ tự.
- Tách rõ TCP/IP 4 tầng với IP Stack 5 tầng; bổ sung chức năng Presentation và Session.
- Bổ sung PDU Application (Data/Message), Transport (TCP Segment/UDP Datagram), Network (Packet), Data Link (Frame), Physical (Bit).
- Sửa kiểu biến thể câu hỏi có thể lệch đáp án; kiểm tra rằng 5 cách đặt câu hỏi của cùng một chủ đề luôn giữ nguyên đáp án đúng.
- Làm rõ TCP không có trường `Length` trong header, UDP có `Length` nhưng không có `Sequence Number`.
- Làm rõ FTP thường dùng TCP 21 cho điều khiển và TCP 20 cho dữ liệu ở chế độ active; cổng dữ liệu passive không cố định là 20.
- POP3 tải thư về máy; việc xóa hay giữ bản trên server còn tùy cài đặt của phần mềm email.
- Bổ sung block size, số bit cần mượn để tạo subnet và ví dụ VLSM cần 50 host dùng được → /26.

## Ghi chú kiến thức

- Các phép tính subnet IPv4 thông thường loại trừ Network ID và Broadcast, trừ khi câu hỏi nêu trường hợp đặc biệt.
- Phân lớp A/B/C/D được giữ lại để ôn theo đề cương; trong mạng hiện đại, CIDR là cách biểu diễn phổ biến.
- SMTP port 25 thường dùng trong trao đổi giữa mail server; ứng dụng người dùng gửi thư có thể dùng 587 hoặc 465.
- Nếu giảng viên có quy ước/slide khác, hãy ưu tiên tài liệu môn học của lớp.

## Lưu ý phiên bản 1.3.0

- Ngân hàng đã tăng lên 800 câu: 200 câu/chương, 40 chủ đề/chương.
- Đề mặc định tăng thành 8 đề × 100 câu để sử dụng hết 800 câu; mỗi đề vẫn có 25 câu/chương.
- Random vẫn lấy 100 câu, chia đều 25 câu/chương từ toàn bộ 800 câu.
- Câu hỏi ưu tiên tình huống thực tế theo phong cách đề mẫu người học gửi; không còn các câu hỏi kiểu “chương này có nội dung gì”.
- `npm run check` đã PASS. Kiểm thử Chromium qua localhost bị môi trường chặn (`ERR_BLOCKED_BY_ADMINISTRATOR`), nên cần kiểm tra thao tác UI trên máy cá nhân hoặc sau khi deploy Vercel.
