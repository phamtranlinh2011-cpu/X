# CONTENT_AUDIT — Lượt rà soát ngân hàng 600 câu

## 1. Lỗi được phát hiện và cách xử lý

- **Thứ tự OSI:** câu hỏi hiện ghi rõ chiều từ tầng cao xuống thấp, đáp án là `Application → Presentation → Session → Transport → Network → Data Link → Physical`. Phần giải thích cũng nhắc chiều từ thấp lên cao là thứ tự đảo ngược.
- **Biến thể hỏi không khớp đáp án:** bản cũ đưa một số tình huống cụ thể vào biến thể nhưng giữ đáp án câu gốc. Ví dụ tình huống hỏi octet đầu tiên 25 thuộc lớp IP nào nhưng đáp án lại là dải octet của lớp A; hoặc hỏi tầng nào nằm ngay trên Data Link nhưng đáp án là toàn bộ thứ tự OSI. Đã bỏ cách dùng các tình huống chưa ánh xạ đáp án riêng. Năm cách hỏi hiện tại đều kiểm tra cùng một kiến thức gốc và giữ cùng đáp án.
- **OSI/TCP-IP/IP Stack:** bổ sung phân biệt mô hình OSI 7 tầng, TCP/IP 4 tầng và IP Stack 5 tầng; bổ sung vai trò Presentation/Session.
- **PDU:** ghi đủ Application = Data/Message; Transport = TCP Segment hoặc UDP Datagram; Network = Packet; Data Link = Frame; Physical = Bit.
- **TCP/UDP:** có câu riêng về TCP không có trường `Length`, UDP có `Length` nhưng không có `Sequence Number`; độ dài các trường cơ bản vẫn được giữ để ôn.
- **Port:** FTP TCP 21 (điều khiển), TCP 20 (dữ liệu ở chế độ active), DNS 53; SMTP 25 (mail server), POP3 110, IMAP 143, DHCPv4 UDP 67/68, HTTP 80, HTTPS 443.
- **Email:** POP3 tải thư về thiết bị; có thể xóa hoặc giữ bản trên server tùy cấu hình, không khẳng định POP3 luôn xóa.
- **Subnet/VLSM:** thêm block size /26 = 64, số bit mượn tối thiểu để tạo 6 subnet = 3, và prefix nhỏ nhất cho 50 host dùng được = /26.
- **Phân lớp IPv4:** gộp dải A/B/C/D vào một mục để học viên nhìn được toàn bộ dải cùng lúc: A 1–126; B 128–191; C 192–223; D 224–239 (multicast).

## 2. Kết quả validator

Chạy `npm run check`. Validator kiểm tra:

- 600 câu, 4 chương × 150 câu; 30 chủ đề/chương.
- 6 đề mặc định × 100 câu, mỗi đề có 25 câu/chương.
- 100 lượt random mô phỏng, mỗi lượt 100 câu cân bằng 25 câu/chương.
- Không trùng ID, nội dung câu, lựa chọn hoặc câu trả lời đúng giữa các biến thể cùng chủ đề.
- Regression tests cho OSI/TCP-IP/IP Stack/PDU, TCP/UDP fields, port, subnet mask, block size, số host và VLSM.

## 3. Giới hạn nguồn

Nội dung đã đối chiếu với đề cương và bốn ảnh ghi chú người học cung cấp, cùng kiến thức trong các RFC/giáo trình liệt kê ở `SOURCES.md`. Chưa có đề thi chính thức TDTU được xác minh độc lập trong lượt này.


## 4. Rà soát bổ sung theo ghi chú Network Security

### Wi-Fi security (Chương 1 / Physical layer context)
- **WEP:** chuẩn cũ, dùng RC4, có nhiều điểm yếu và không còn được khuyến nghị.
- **WPA đời đầu:** là bước cải tiến so với WEP, thường gắn với TKIP; không nên xem WPA đời đầu là lựa chọn bảo mật tốt cho mạng mới.
- **WPA2:** thường sử dụng AES-CCMP, mạnh hơn WEP và WPA đời đầu. Đã bổ sung lưu ý rằng WPA3 là thế hệ mới hơn; câu hỏi trong phạm vi so sánh WEP/WPA/WPA2 có thể chọn WPA2/AES, nhưng không tuyên bố WPA2 là chuẩn mạnh nhất hiện nay theo nghĩa tuyệt đối.

### Network Security (Chương 4)
- **Firewall:** lọc lưu lượng vào/ra dựa trên quy tắc; có thể là phần cứng hoặc phần mềm. Có thể ghi log/cảnh báo, nhưng không bảo đảm chặn được mọi malware hoặc mọi cuộc tấn công DoS.
- **IDS:** Intrusion Detection System; giám sát để phát hiện và cảnh báo dấu hiệu xâm nhập.
- **IPS:** Intrusion Prevention System; có khả năng chủ động ngăn chặn/chặn lưu lượng độc hại.
- **SPI:** Stateful Packet Inspection; firewall theo dõi trạng thái phiên/kết nối và đánh giá packet theo trạng thái đó.
- **NAT:** dịch địa chỉ IP; PAT/NAPT còn dịch port để nhiều thiết bị private có thể dùng chung public IP. Ẩn địa chỉ nội bộ không đồng nghĩa thay thế firewall hoặc bảo đảm an toàn.

### Cân bằng 30 chủ đề/chương
- Chương 1 thay ba mục lặp lại ở chương khác (FTP, IP, DNS) bằng WEP, WPA và WPA2/AES; các nội dung FTP/DNS vẫn có ở Chương 2, IP vẫn được ôn ở Chương 4.
- Chương 4 gộp các cặp kiến thức gần nhau thành câu hỏi tổng hợp để giữ đủ 30 chủ đề: độ dài header IPv4/IPv6; subnet mask /24-/25; subnet mask /26-/27. Tất cả giá trị gốc vẫn được giữ và kiểm tra trong đáp án.
- Bổ sung ba chủ đề Firewall, IDS và SPI; giữ NAT, IPS, ARP và RIP.

### Kiểm tra hồi quy bổ sung
Validator hiện kiểm tra trực tiếp đáp án WEP/WPA/WPA2-AES, Firewall, IDS, IPS, NAT và SPI; kiểm tra WPA2 không được mô tả sai là thế hệ bảo mật mới nhất; kiểm tra IDS không bị nhầm thành cơ chế tự động chặn; và kiểm tra NAT không bị mô tả là thay thế firewall.


## 5. Kiểm tra toàn dự án v1.2.0 (12/11/2026)

### Lỗi phát hiện và đã sửa

1. **Thống kê câu sai bị đếm cả câu bỏ trống:** trước đây `wrong = total - correct`, trong khi giao diện còn hiển thị số câu chưa trả lời riêng. Kết quả khiến câu bỏ trống vừa nằm trong "Câu sai" vừa nằm trong "Câu chưa trả lời". Đã đổi thành `wrong = attempted - correct`; câu bỏ trống được thống kê riêng. Điểm vẫn tính theo số câu đúng trên tổng 100 câu.
2. **Vị trí đáp án đúng chưa cân bằng:** bản trước phân bố 202 đáp án A, 98 đáp án B, 150 đáp án C và 150 đáp án D trong toàn kho. Điều này tạo thiên lệch không mong muốn. Đã thay cách sắp xếp lựa chọn; mỗi đề 100 câu hiện có đúng 25 đáp án đúng ở mỗi vị trí A/B/C/D. Validator kiểm tra điều kiện này cho cả 6 đề và toàn ngân hàng.

### Kiểm tra mã nguồn và gói phát hành

- `node --check app.js`, `node --check questions.js`, `node --check scripts/validate-questions.mjs`: đạt.
- `npm run check`: đạt trên ngân hàng 600 câu, 4 chương, 6 đề, 100 lượt random mô phỏng, đáp án hồi quy và phân bố A/B/C/D.
- Đã kiểm tra `index.html` trỏ đúng `styles.css` và `app.js`; không có đường dẫn tài nguyên cục bộ bị thiếu.
- Đã giải nén ZIP để đối chiếu cấu trúc; ZIP chứa đầy đủ mã nguồn, dữ liệu, validator, hướng dẫn và cấu hình deploy.

### Kiểm thử giao diện bằng Chromium

Đã chạy mô phỏng DOM/CSS/JavaScript bằng Chromium trên desktop 1440 px và mobile 390 px. Các luồng đã kiểm tra: mở trang chủ, bắt đầu đề, hiển thị 4 lựa chọn, chọn đáp án và hiện giải thích, chuyển câu, mở/hủy hộp thoại thoát, mở/xác nhận nộp bài, thống kê kết quả, 100 câu random cân bằng theo chương, hoàn thành 100 câu, hết 60 phút tự nộp và không tràn ngang trên mobile. Không ghi nhận lỗi JavaScript runtime hoặc lỗi console trong các lượt kiểm thử.

**Giới hạn:** điều hướng trình duyệt đến localhost bị môi trường kiểm thử chặn, do đó phần tương tác Chromium được chạy bằng cách nạp nội dung HTML/CSS/JS trực tiếp vào trang kiểm thử; chưa xác nhận một lần deploy thật trên Vercel hoặc kiểm thử trên trình duyệt/thiết bị của người dùng. Google Fonts cần Internet; nếu ngoại tuyến, trang dùng font dự phòng.
