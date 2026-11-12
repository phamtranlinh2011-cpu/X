# NetLab — Ôn thi Nhập môn Mạng máy tính (TDTU)

Website trắc nghiệm ôn giữa kỳ bằng tiếng Việt, thiết kế dạng static site, không cần backend và có thể deploy lên GitHub + Vercel.

> **Nguồn câu hỏi:** Ngân hàng 600 câu trong dự án được tự biên soạn theo đề cương ôn tập bạn cung cấp và kiến thức mạng máy tính nhập môn. Đây không phải đề thi chính thức, cũng không được xác nhận là câu hỏi từng xuất hiện trong kỳ thi TDTU. Ở phiên tạo dự án, tính năng truy cập web không khả dụng nên không thể xác minh hoặc trích dẫn đề thi công khai của trường.

## Tính năng

- 600 câu hỏi/biến thể trình bày, chia đều 4 chương (150 câu/chương), kèm giải thích ngắn gọn. Ngân hàng xoay quanh 120 khái niệm trọng tâm (30 khái niệm/chương), mỗi khái niệm có 5 cách hỏi/diễn đạt; vì vậy một số kiến thức cốt lõi sẽ được kiểm tra lại bằng câu chữ hoặc tình huống khác nhau.
- **Đề mặc định:** 6 đề cố định, mỗi đề 100 câu; mỗi đề có đúng 25 câu/chương và không lặp khái niệm trong cùng đề.
- **Đề ngẫu nhiên:** chọn 100 câu từ kho 600 câu, cân bằng 25 câu/chương và không lấy trùng khái niệm trong cùng lượt.
- Hai chế độ thời gian: không giới hạn hoặc 60 phút. Hết giờ tự động nộp bài.
- Mỗi màn hình chỉ hiển thị một câu. Chọn đáp án sẽ khóa câu, báo đúng/sai và giải thích trước khi sang câu tiếp theo.
- Nộp bài có hộp xác nhận; kết quả gồm điểm thang 100, số câu đúng/sai, số câu chưa làm và phần xem lại câu sai.
- Responsive cho desktop, tablet và mobile; có animation chuyển cảnh và trạng thái tương tác.

## Chạy trên máy

Yêu cầu Node.js 18+ chỉ để chạy kiểm tra dữ liệu; website không cần build.

Vì dự án dùng JavaScript ES Modules, hãy chạy qua một static server thay vì mở trực tiếp bằng `file://`. Có thể dùng Python tích hợp sẵn trên Windows:

```powershell
py -m http.server 8000
```

Sau đó mở `http://localhost:8000`. Hoặc dùng `npx serve .` nếu máy đã có Node.js.

## Kiểm tra dữ liệu

```bash
npm run check
```

Lệnh kiểm tra số lượng 600, độ cân bằng chương/đề, cấu trúc lựa chọn, đáp án hợp lệ, tính duy nhất của ID/nội dung, không lặp khái niệm trong mỗi đề và một số phép tính subnetting.

## Deploy lên Vercel

1. Tạo repository mới trên GitHub và upload toàn bộ nội dung thư mục này.
2. Vào Vercel → **Add New → Project** → import repository vừa tạo.
3. Framework Preset: **Other**.
4. Build Command: để trống. Output Directory: `.`.
5. Nhấn **Deploy**. Đây là static site, không cần build command hoặc rewrite; cấu hình `vercel.json` chỉ giữ URL sạch.

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
└── scripts/
    └── validate-questions.mjs
```

## Ghi chú học tập

- Các câu subnetting dùng quy tắc IPv4 subnet thông thường (trừ network và broadcast), trừ khi câu hỏi nói rõ trường hợp đặc biệt.
- Phân lớp A/B/C/D được đưa vào để ôn theo đề cương; trong mạng hiện đại, CIDR đã thay thế cách phân lớp classful.
- Port number là giá trị mặc định phổ biến để học tập; một số dịch vụ có thêm cổng bảo mật hoặc cấu hình khác.
- File `questions.js` chứa dữ liệu câu hỏi và có thể chỉnh sửa/thêm câu sau này. Chạy lại `npm run check` để kiểm tra cấu trúc sau khi chỉnh sửa.
