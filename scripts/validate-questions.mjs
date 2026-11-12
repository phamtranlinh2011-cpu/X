import questions, { BANK } from '../questions.js';

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const chapters = ['C1', 'C2', 'C3', 'C4'];
const expectedTopics = 40;

assert(Array.isArray(questions), 'questions phải là một mảng');
assert(questions.length === 800, `Cần đúng 800 câu, hiện có ${questions.length}`);
assert(new Set(questions.map((q) => q.id)).size === questions.length, 'ID câu hỏi bị trùng');
assert(new Set(questions.map((q) => q.question)).size === questions.length, 'Nội dung câu hỏi bị trùng');

for (const chapter of chapters) {
  const bank = BANK[chapter] ?? [];
  const items = questions.filter((q) => q.chapter === chapter);
  assert(bank.length === expectedTopics, `${chapter} cần ${expectedTopics} chủ đề, hiện có ${bank.length}`);
  assert(items.length === 200, `${chapter} phải có 200 câu, hiện có ${items.length}`);
  assert(new Set(bank.map((item) => item.topic)).size === expectedTopics, `${chapter} có tên chủ đề trùng`);

  const concepts = new Set(items.map((q) => q.conceptId));
  assert(concepts.size === expectedTopics, `${chapter} phải có ${expectedTopics} khái niệm riêng`);
  for (const conceptId of concepts) {
    const variants = items.filter((q) => q.conceptId === conceptId);
    assert(variants.length === 5, `${conceptId} phải có đúng 5 biến thể`);
    assert(new Set(variants.map((q) => q.setId)).size === 5, `${conceptId} phải xuất hiện trong 5 đề khác nhau`);
    assert(new Set(variants.map((q) => q.topic)).size === 1, `${conceptId} có topic không đồng nhất`);
    assert(new Set(variants.map((q) => q.options[q.answerIndex])).size === 1, `${conceptId} có đáp án đúng không nhất quán giữa các biến thể`);
    const sourceItem = bank.find((item) => item.topic === variants[0].topic);
    assert(sourceItem && variants.every((q) => q.explanation === sourceItem.explain), `${conceptId} có lời giải không khớp chủ đề gốc`);
  }
}

for (let setId = 1; setId <= 8; setId++) {
  const set = questions.filter((q) => q.setId === setId);
  assert(set.length === 100, `Đề ${setId} phải có 100 câu, hiện có ${set.length}`);
  assert(new Set(set.map((q) => q.conceptId)).size === 100, `Đề ${setId} có khái niệm bị lặp`);
  const answerPositions = [0, 0, 0, 0];
  for (const q of set) answerPositions[q.answerIndex]++;
  assert(answerPositions.every((count) => count === 25), `Đề ${setId} phải phân bố đều 25 đáp án đúng ở mỗi vị trí A/B/C/D; hiện có ${answerPositions.join('/')}`);
  for (const chapter of chapters) {
    assert(set.filter((q) => q.chapter === chapter).length === 25, `Đề ${setId} không đủ 25 câu ${chapter}`);
  }
}

// Exercise the same balanced-by-concept sampling strategy used by random mode.
const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
for (let run = 0; run < 100; run++) {
  const drawn = [];
  for (const chapter of chapters) {
    const byConcept = new Map();
    for (const q of questions.filter((item) => item.chapter === chapter)) {
      if (!byConcept.has(q.conceptId)) byConcept.set(q.conceptId, []);
      byConcept.get(q.conceptId).push(q);
    }
    const pickedConcepts = shuffle([...byConcept.keys()]).slice(0, 25);
    for (const conceptId of pickedConcepts) {
      const variants = byConcept.get(conceptId);
      drawn.push(variants[Math.floor(Math.random() * variants.length)]);
    }
  }
  assert(drawn.length === 100, `Random draw ${run + 1} không đủ 100 câu`);
  assert(new Set(drawn.map((q) => q.conceptId)).size === 100, `Random draw ${run + 1} bị lặp khái niệm`);
  for (const chapter of chapters) {
    assert(drawn.filter((q) => q.chapter === chapter).length === 25, `Random draw ${run + 1} không cân bằng ${chapter}`);
  }
}

const overallAnswerPositions = [0, 0, 0, 0];
for (const q of questions) overallAnswerPositions[q.answerIndex]++;
assert(overallAnswerPositions.every((count) => count === 200), `Toàn bộ ngân hàng phải cân bằng 200 đáp án ở mỗi vị trí A/B/C/D; hiện có ${overallAnswerPositions.join('/')}`);

const calculationCount = questions.filter((q) => q.difficulty === 'Tính toán cơ bản').length;
assert(calculationCount === 40, `Cần 40 câu tính toán cơ bản (8 chủ đề × 5), hiện có ${calculationCount}`);
assert(questions.length - calculationCount === 760, 'Cần 760 câu cơ bản');

for (const q of questions) {
  assert(typeof q.question === 'string' && q.question.trim().length > 12, `Câu ${q.id} thiếu nội dung`);
  assert(!/Trong Chương \d|thuộc Chương \d|Khi ôn tập [^,]+ thuộc Chương/.test(q.question), `Câu ${q.id} còn dạng hỏi theo tên chương/chủ đề`);
  assert(Array.isArray(q.options) && q.options.length === 4, `Câu ${q.id} không có đúng 4 lựa chọn`);
  assert(new Set(q.options).size === 4, `Câu ${q.id} có lựa chọn trùng nhau`);
  assert(Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex < 4, `Câu ${q.id} có answerIndex sai`);
  assert(typeof q.explanation === 'string' && q.explanation.trim().length > 15, `Câu ${q.id} thiếu giải thích`);
  assert(q.setId >= 1 && q.setId <= 8, `Câu ${q.id} có setId không hợp lệ`);
  assert(['Cơ bản', 'Tính toán cơ bản'].includes(q.difficulty), `Câu ${q.id} có nhãn độ khó ngoài phạm vi thiết kế lại`);
}

const answerOf = (topic) => {
  const q = questions.find((item) => item.topic === topic);
  return q ? q.options[q.answerIndex] : undefined;
};
const requireAnswer = (topic, expected) => assert(answerOf(topic) === expected, `Đáp án kiểm tra hồi quy thất bại: ${topic}`);

requireAnswer('OSI layer order', 'Application → Presentation → Session → Transport → Network → Data Link → Physical.');
requireAnswer('TCP/IP model', 'Application → Transport → Internet → Network Access (Link).');
requireAnswer('Five-layer Internet stack', 'Application → Transport → Network (Internet) → Data Link → Physical.');
requireAnswer('Session and Presentation layers', 'Presentation xử lý cách biểu diễn dữ liệu (như chuyển đổi định dạng, mã hóa, nén); Session thiết lập, duy trì và kết thúc phiên làm việc.');
requireAnswer('PDU names', 'Data/Message → Segment (TCP) hoặc Datagram (UDP) → Packet → Frame → Bit.');
requireAnswer('IPv4 address length', '32 bit.');
requireAnswer('Decimal 10 to binary', '00001010.');
requireAnswer('Binary 11101000 to decimal', '232.');
requireAnswer('Decimal 10 to hexadecimal', 'A.');
requireAnswer('IPv6 address length', '128 bit.');
requireAnswer('IPv4 and IPv6 header length', 'IPv4 tối thiểu 20 byte; IPv6 base header cố định 40 byte.');
requireAnswer('IP length fields', '16 bit.');
requireAnswer('TCP header minimum length', '20 byte.');
requireAnswer('TCP header maximum length', '60 byte.');
requireAnswer('TCP source and destination ports', '16 bit mỗi trường.');
requireAnswer('TCP sequence and acknowledgment fields', 'Mỗi trường dài 32 bit.');
requireAnswer('TCP field absent', 'Trường Length.');
requireAnswer('TCP data offset', '4 bit.');
requireAnswer('TCP checksum field', '16 bit.');
requireAnswer('UDP fields absent', 'Sequence Number.');
requireAnswer('UDP header length', '8 byte.');
requireAnswer('UDP port fields', '16 bit mỗi trường.');
requireAnswer('UDP length field', '16 bit; biểu thị tổng độ dài UDP datagram gồm header và dữ liệu.');
requireAnswer('UDP checksum field', '16 bit.');
requireAnswer('Well-known ports', '0 đến 1023.');
requireAnswer('HTTP and HTTPS ports', '80 và 443.');
requireAnswer('FTP and DNS ports', 'FTP dùng TCP 21 cho điều khiển, TCP 20 cho dữ liệu ở chế độ active; DNS dùng port 53.');
requireAnswer('SMTP, POP3, IMAP and DHCP ports', 'SMTP 25; POP3 110; IMAP 143; DHCPv4 server/client UDP 67/68.');
requireAnswer('Client-server distribution time', 'Dcs ≥ max(NF/us, F/dmin).');
requireAnswer('P2P distribution time', 'Dp2p ≥ max(F/us, F/dmin, NF/(us + tổng ui)).');
requireAnswer('Subnet mask /24 and /25', '/24 là 255.255.255.0; /25 là 255.255.255.128.');
requireAnswer('Subnet mask /26 and /27', '/26 là 255.255.255.192; /27 là 255.255.255.224.');
requireAnswer('Subnet block size', '64 địa chỉ.');
requireAnswer('Subnet bits required', '3 bit, vì 2³ = 8 ≥ 6.');
requireAnswer('VLSM prefix for 50 hosts', '/26, vì còn 6 bit host và có 62 host dùng được.');
requireAnswer('Usable hosts /24', '254 host.');
requireAnswer('Usable hosts /26', '62 host.');
requireAnswer('Network address calculation', '192.168.1.64/26.');
requireAnswer('Broadcast address calculation', '192.168.1.127.');
requireAnswer('Usable host range /27', '192.168.10.33 đến 192.168.10.62.');
requireAnswer('IPv4 class A B C D ranges', 'A: 1–126; B: 128–191; C: 192–223; D: 224–239 (Multicast).');
requireAnswer('Private and public IP', '10.0.0.0/8; 172.16.0.0/12; 192.168.0.0/16.');
requireAnswer('WEP security', 'Là chuẩn cũ, sử dụng RC4 và có nhiều điểm yếu bảo mật nên không còn được khuyến nghị.');
requireAnswer('WPA security', 'WPA được đưa ra để khắc phục các điểm yếu của WEP; WPA đời đầu thường sử dụng TKIP.');
requireAnswer('WPA2 and AES', 'AES, thường được sử dụng cùng CCMP.');
requireAnswer('Firewall', 'Kiểm soát, cho phép hoặc chặn lưu lượng mạng vào/ra dựa trên các quy tắc bảo mật.');
requireAnswer('IDS', 'Intrusion Detection System – giám sát để phát hiện và cảnh báo dấu hiệu xâm nhập.');
requireAnswer('SPI', 'Theo dõi trạng thái kết nối và đánh giá packet dựa trên trạng thái của phiên giao tiếp.');
requireAnswer('IPS', 'Intrusion Prevention System – hệ thống ngăn chặn xâm nhập.');

// Network-security regression tests: these concepts must remain represented in the 800-question bank.
for (const topic of ['WEP security', 'WPA security', 'WPA2 and AES']) {
  assert(BANK.C1.some((item) => item.topic === topic), `Thiếu chủ đề bảo mật Wi-Fi: ${topic}`);
}
for (const topic of ['NAT', 'Firewall', 'IDS', 'SPI', 'IPS']) {
  assert(BANK.C4.some((item) => item.topic === topic), `Thiếu chủ đề Network Security: ${topic}`);
}
const wpa2 = BANK.C1.find((item) => item.topic === 'WPA2 and AES');
assert(wpa2?.explain.includes('WPA3 là thế hệ mới hơn'), 'Giải thích WPA2 phải nêu rõ WPA3 là thế hệ mới hơn, không tuyên bố WPA2 là mạnh nhất hiện nay theo nghĩa tuyệt đối');
const nat = BANK.C4.find((item) => item.topic === 'NAT');
assert(nat?.explain.includes('không thay thế firewall'), 'Giải thích NAT phải phân biệt NAT với firewall');
const ids = BANK.C4.find((item) => item.topic === 'IDS');
assert(ids?.explain.includes('không mặc định tự chặn'), 'Giải thích IDS phải phân biệt phát hiện/cảnh báo với ngăn chặn');

// Calculation regression tests based on the subnet rules taught in the supplied notes.
const maskToPrefix = (mask) => mask.split('.').reduce((sum, octet) => sum + Number(octet).toString(2).replaceAll('0', '').length, 0);
const blockSize = (maskOctet) => 256 - maskOctet;
const hostCount = (prefix) => (2 ** (32 - prefix)) - 2;
const subnetBitsFor = (subnetCount) => { let bits = 0; while (2 ** bits < subnetCount) bits++; return bits; };
assert(maskToPrefix('255.255.255.192') === 26, 'Subnet mask /26 phải tương ứng 26 bit 1');
assert(blockSize(192) === 64, 'Block size của octet mask 192 phải là 64');
assert(hostCount(26) === 62, 'Subnet /26 phải có 62 host dùng được theo cách tính thông thường');
assert(subnetBitsFor(6) === 3, 'Tạo ít nhất 6 subnet cần mượn tối thiểu 3 bit');
assert(hostCount(26) >= 50 && hostCount(27) < 50, 'Prefix nhỏ nhất đáp ứng 50 host phải là /26');

if (errors.length) {
  console.error(`FAIL — ${errors.length} lỗi:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('PASS — Ngân hàng câu hỏi sau khi biên tập lại hợp lệ.');
console.log('• 800 câu, 4 chương × 200 câu; 40 chủ đề mỗi chương.');
console.log('• 8 đề cố định × 100 câu; mỗi đề có đúng 25 câu/chương và 25 đáp án đúng ở mỗi vị trí A/B/C/D.');
console.log('• Mỗi chủ đề có 5 cách hỏi, không lặp trong cùng đề.');
console.log('• 100 lượt random mô phỏng đều có 100 câu và 25 câu/chương.');
console.log('• Các biến thể không dùng lại tình huống lệch đáp án; mọi biến thể cùng một chủ đề có đáp án nhất quán.');
console.log('• Đã kiểm tra OSI 7 tầng, TCP/IP 4 tầng, IP Stack 5 tầng, PDU, TCP/UDP fields, port và subnet/VLSM.');
console.log('• Đã kiểm tra WEP/WPA/WPA2-AES, Firewall, IDS/IPS, NAT và SPI; giải thích phân biệt đúng chức năng.');
console.log('• Đã kiểm tra công thức block size, số bit mượn, số host và prefix VLSM bằng phép tính độc lập.');
console.log('• Phân loại độ khó: 760 câu cơ bản và 40 câu tính toán subnet cơ bản.');
