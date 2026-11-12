# NETLAB — Ôn giữa kỳ Nhập môn Mạng máy tính (TDTU)

Website trắc nghiệm tiếng Việt dành cho sinh viên năm nhất. Dự án là static site, không cần backend và có thể đưa thẳng lên GitHub Pages/Vercel.

## Phiên bản ngân hàng câu hỏi đã chỉnh sửa

Ngân hàng đã được biên tập lại theo đúng các mục trong đề cương ôn tập người học cung cấp, ưu tiên mức **nhận biết – hiểu – tính toán cơ bản**. Các nhóm kiến thức nâng cao hoặc không được nêu rõ trong đề cương đã được bỏ bớt, ví dụ: CDN, cookie/MIME, DNS recursive/iterative, TCP congestion control và longest-prefix matching.

- **600 câu hỏi/biến thể trình bày**, gồm 120 chủ đề trọng tâm × 5 cách hỏi; 30 chủ đề mỗi chương.
- Câu hỏi tập trung vào định nghĩa, chức năng, nguyên lý cơ bản, nhận biết giao thức/port, PDU, TCP/UDP header, IPv4/IPv6, lớp địa chỉ, subnet mask và VLSM.
- Subnetting được giữ ở mức cơ bản: đổi prefix/mask, tính số host, Network ID, Broadcast và dải host.
- Phần File Distribution giữ các công thức Client-Server và P2P trong giáo trình, đồng thời kiểm tra ý nghĩa các biến ở mức nhập môn.
- Các biến thể của một chủ đề dùng cách hỏi trực tiếp hoặc tình huống ngắn. Vì vậy 600 câu không tương đương 600 khái niệm hoàn toàn độc lập; mỗi đề không lặp cùng một chủ đề.

> **Nguồn câu hỏi:** Tự biên soạn theo đề cương người học gửi và kiến thức mạng máy tính nhập môn. Đây không phải đề thi chính thức hoặc câu hỏi đã xác minh từng xuất hiện tại TDTU. Trong phiên chỉnh sửa này, công cụ truy cập web không khả dụng nên không thể kiểm chứng và trích dẫn bộ câu hỏi công khai của trường. `SOURCES.md` là tài liệu kỹ thuật để đối chiếu kiến thức, không phải nguồn đề thi TDTU.

## Chức năng

- **Đề mặc định:** chọn ngẫu nhiên một trong 6 đề cố định; mỗi đề có 100 câu và đúng 25 câu/chương.
- **Đề random:** chọn 100 câu từ kho 600 câu, cân bằng 25 câu/chương và không lặp chủ đề trong cùng lượt.
- Hai chế độ thời gian: 60 phút hoặc không giới hạn. Hết giờ tự động nộp bài.
- Mỗi màn hình hiển thị một câu. Chọn đáp án sẽ khóa câu, báo đúng/sai và hiện giải thích ngắn.
- Nộp bài có hộp xác nhận; kết quả gồm điểm thang 100, số câu đúng/sai/chưa làm và phần xem lại câu sai.
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

Validator kiểm tra 600 câu, số câu/chương, số câu/đề, câu không trùng, cấu trúc đáp án, 100 lượt random mô phỏng và các đáp án hồi quy quan trọng về header, port và subnet.

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
└── scripts/
    └── validate-questions.mjs
```

## Ghi chú kiến thức

- Các phép tính subnet IPv4 thông thường loại trừ Network ID và Broadcast, trừ khi câu hỏi nêu trường hợp đặc biệt.
- Phân lớp A/B/C/D được giữ lại để ôn theo đề cương; trong mạng hiện đại, CIDR là cách biểu diễn phổ biến.
- Port là giá trị mặc định thường gặp trong giáo trình; dịch vụ có thể dùng thêm cổng bảo mật hoặc cấu hình khác.
- Nếu giảng viên có quy ước/slide khác, hãy ưu tiên tài liệu môn học của lớp.
