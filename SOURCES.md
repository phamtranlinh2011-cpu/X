# Nguồn tham khảo kiến thức

Ngân hàng câu hỏi trong dự án được tự biên soạn dựa trên: (1) đề cương ôn giữa kỳ người học gửi; (2) bốn ảnh ghi chú viết tay được cung cấp trong file `x.rar` — có các mục OSI/TCP-IP/IP Stack, mô hình mạng, chuyển mạch, port, PDU, IPv4 private và subnetting, NAT/ARP/RIP/IPS; (3) phần ghi chú bổ sung do người học gửi về WEP/WPA/WPA2-AES, Firewall, IDS, NAT và SPI; và (4) các tài liệu kỹ thuật liệt kê bên dưới. Những ghi chú này là tài liệu ôn tập do người học cung cấp, không phải đề thi chính thức. **Không xác nhận các câu hỏi trong ngân hàng từng xuất hiện ở kỳ thi TDTU.**

## RFC / tiêu chuẩn giao thức

- [RFC 791 — Internet Protocol (IPv4)](https://www.rfc-editor.org/rfc/rfc791)
- [RFC 8200 — Internet Protocol, Version 6 (IPv6) Specification](https://www.rfc-editor.org/rfc/rfc8200)
- [RFC 9293 — Transmission Control Protocol (TCP)](https://www.rfc-editor.org/rfc/rfc9293)
- [RFC 768 — User Datagram Protocol (UDP)](https://www.rfc-editor.org/rfc/rfc768)
- [RFC 1034 — Domain Names: Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034)
- [RFC 1035 — Domain Names: Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035)
- [RFC 2131 — Dynamic Host Configuration Protocol (DHCP)](https://www.rfc-editor.org/rfc/rfc2131)
- [RFC 1918 — Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918)
- [RFC 4632 — Classless Inter-domain Routing (CIDR)](https://www.rfc-editor.org/rfc/rfc4632)
- [RFC 826 — An Ethernet Address Resolution Protocol (ARP)](https://www.rfc-editor.org/rfc/rfc826)
- [RFC 3022 — Traditional IP Network Address Translator (Traditional NAT)](https://www.rfc-editor.org/rfc/rfc3022)
- [RFC 2453 — RIP Version 2](https://www.rfc-editor.org/rfc/rfc2453)
- [RFC 959 — File Transfer Protocol (FTP)](https://www.rfc-editor.org/rfc/rfc959)
- [RFC 5321 — Simple Mail Transfer Protocol (SMTP)](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 1939 — Post Office Protocol, Version 3 (POP3)](https://www.rfc-editor.org/rfc/rfc1939)
- [RFC 9051 — Internet Message Access Protocol (IMAP) Version 4rev2](https://www.rfc-editor.org/rfc/rfc9051)
- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)

## Tài liệu học tập do người học cung cấp

- Bốn ảnh ghi chú viết tay trong `x.rar`: dùng để đối chiếu cách gọi tầng OSI, mô hình TCP/IP 4 tầng và IP Stack 5 tầng, PDU, port FTP/SMTP/POP3/IMAP/DNS/HTTP(S), chuyển mạch gói/kênh, các dải Private IPv4, cách tính block size/subnet/VLSM và các thuật ngữ NAT/ARP/RIP/IPS; phần ghi chú bổ sung do người học gửi về WEP/WPA/WPA2-AES, Firewall, IDS và SPI.

## Bảo mật mạng / Wi-Fi tham khảo

- [NIST SP 800-153 — Guidelines for Securing Wireless Local Area Networks (WLANs)](https://csrc.nist.gov/pubs/sp/800/153/final) — bối cảnh bảo mật mạng Wi-Fi.
- [NIST SP 800-41 Rev. 1 — Guidelines on Firewalls and Firewall Policy](https://csrc.nist.gov/pubs/sp/800/41/r1/final) — nguyên tắc firewall và chính sách lọc lưu lượng.
- [NIST SP 800-94 — Guide to Intrusion Detection and Prevention Systems (IDPS)](https://csrc.nist.gov/pubs/sp/800/94/final) — phân biệt hệ thống phát hiện và ngăn chặn xâm nhập.
- IEEE 802.11i — nền tảng kỹ thuật cho Robust Security Network và cơ chế bảo mật được sử dụng trong WPA2; WPA2 thường dùng AES-CCMP.

> Lưu ý nội dung: WPA2/AES mạnh hơn WEP và WPA đời đầu trong nhóm chuẩn được ghi trong tài liệu học. Tuy nhiên, WPA3 là thế hệ mới hơn; không nên ghi WPA2 là chuẩn mạnh nhất hiện nay theo nghĩa tuyệt đối. Khi đề thi chỉ so sánh WEP, WPA và WPA2, WPA2/AES là đáp án phù hợp trong ba lựa chọn đó.

## Đề mẫu người học cung cấp

- Bộ câu hỏi trắc nghiệm tiếng Việt do người học dán trong cuộc trò chuyện. Dùng để tham khảo phong cách câu hỏi tình huống, câu hỏi chọn giải pháp, topology, VLAN/VPN, thiết bị mạng, OSI, TCP handshake, PDU, Ethernet/Wi-Fi, nhận diện địa chỉ IP và chuyển đổi nhị phân/thập phân/thập lục phân. Đây là tài liệu tham khảo do người học cung cấp; không xác minh được xuất xứ, không coi là đề thi chính thức TDTU và không sao chép nguyên văn toàn bộ. Một số câu trong bản dán bị lỗi định dạng hoặc thiếu lựa chọn nên chỉ sử dụng phần nội dung có thể xác định chắc chắn.

## Giáo trình tham khảo

- James F. Kurose và Keith W. Ross, *Computer Networking: A Top-Down Approach* — các chương về Application, Transport, Network và nguyên lý mạng. Công thức phân phối file Client-Server/P2P trong ngân hàng được diễn đạt theo phần File Distribution của giáo trình.

> Lưu ý: tài liệu chuẩn giúp đối chiếu nội dung kỹ thuật. Cách phân loại, phạm vi câu hỏi và quy ước cụ thể trong kỳ thi cần được đối chiếu thêm với slide/bài giảng của giảng viên TDTU.


## Định hướng cách đặt câu hỏi

- Đề trắc nghiệm mẫu do người học cung cấp trong cuộc trò chuyện: dùng để tham khảo cách đặt câu hỏi tình huống, yêu cầu chọn giải pháp phù hợp và nhận diện kết quả trong bối cảnh thực tế. Không xác minh được nguồn gốc của bản trích; không khẳng định là đề thi TDTU chính thức.
