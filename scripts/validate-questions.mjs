import questions, { BANK } from '../questions.js';

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const chapters = ['C1', 'C2', 'C3', 'C4'];
const expectedTopics = 30;

assert(Array.isArray(questions), 'questions phải là một mảng');
assert(questions.length === 600, `Cần đúng 600 câu, hiện có ${questions.length}`);
assert(new Set(questions.map((q) => q.id)).size === questions.length, 'ID câu hỏi bị trùng');
assert(new Set(questions.map((q) => q.question)).size === questions.length, 'Nội dung câu hỏi bị trùng');

for (const chapter of chapters) {
  const bank = BANK[chapter] ?? [];
  const items = questions.filter((q) => q.chapter === chapter);
  assert(bank.length === expectedTopics, `${chapter} cần ${expectedTopics} chủ đề, hiện có ${bank.length}`);
  assert(items.length === 150, `${chapter} phải có 150 câu, hiện có ${items.length}`);
  assert(new Set(bank.map((item) => item.topic)).size === expectedTopics, `${chapter} có tên chủ đề trùng`);

  const concepts = new Set(items.map((q) => q.conceptId));
  assert(concepts.size === expectedTopics, `${chapter} phải có ${expectedTopics} khái niệm riêng`);
  for (const conceptId of concepts) {
    const variants = items.filter((q) => q.conceptId === conceptId);
    assert(variants.length === 5, `${conceptId} phải có đúng 5 biến thể`);
    assert(new Set(variants.map((q) => q.setId)).size === 5, `${conceptId} phải xuất hiện trong 5 đề khác nhau`);
    assert(new Set(variants.map((q) => q.topic)).size === 1, `${conceptId} có topic không đồng nhất`);
  }
}

for (let setId = 1; setId <= 6; setId++) {
  const set = questions.filter((q) => q.setId === setId);
  assert(set.length === 100, `Đề ${setId} phải có 100 câu, hiện có ${set.length}`);
  assert(new Set(set.map((q) => q.conceptId)).size === 100, `Đề ${setId} có khái niệm bị lặp`);
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

for (const q of questions) {
  assert(typeof q.question === 'string' && q.question.trim().length > 12, `Câu ${q.id} thiếu nội dung`);
  assert(Array.isArray(q.options) && q.options.length === 4, `Câu ${q.id} không có đúng 4 lựa chọn`);
  assert(new Set(q.options).size === 4, `Câu ${q.id} có lựa chọn trùng nhau`);
  assert(Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex < 4, `Câu ${q.id} có answerIndex sai`);
  assert(typeof q.explanation === 'string' && q.explanation.trim().length > 15, `Câu ${q.id} thiếu giải thích`);
  assert(q.setId >= 1 && q.setId <= 6, `Câu ${q.id} có setId không hợp lệ`);
  assert(['Cơ bản', 'Tính toán cơ bản'].includes(q.difficulty), `Câu ${q.id} có nhãn độ khó ngoài phạm vi thiết kế lại`);
}

const answerOf = (topic) => {
  const q = questions.find((item) => item.topic === topic);
  return q ? q.options[q.answerIndex] : undefined;
};
const requireAnswer = (topic, expected) => assert(answerOf(topic) === expected, `Đáp án kiểm tra hồi quy thất bại: ${topic}`);

requireAnswer('IPv4 address length', '32 bit.');
requireAnswer('IPv6 address length', '128 bit.');
requireAnswer('IPv4 header length', '20 byte.');
requireAnswer('IPv6 base header length', '40 byte.');
requireAnswer('IP length fields', '16 bit.');
requireAnswer('TCP header minimum length', '20 byte.');
requireAnswer('TCP header maximum length', '60 byte.');
requireAnswer('TCP source and destination ports', '16 bit mỗi trường.');
requireAnswer('TCP sequence number field', '32 bit.');
requireAnswer('TCP acknowledgment field', '32 bit.');
requireAnswer('TCP data offset', '4 bit.');
requireAnswer('TCP checksum field', '16 bit.');
requireAnswer('UDP header length', '8 byte.');
requireAnswer('UDP port fields', '16 bit mỗi trường.');
requireAnswer('UDP length field', 'Toàn bộ UDP datagram, gồm header và dữ liệu.');
requireAnswer('UDP checksum field', '16 bit.');
requireAnswer('Well-known ports', '0 đến 1023.');
requireAnswer('HTTP and HTTPS ports', '80 và 443.');
requireAnswer('FTP and DNS ports', '21 và 53.');
requireAnswer('SMTP, POP3, IMAP and DHCP ports', 'SMTP 25; POP3 110; IMAP 143; DHCPv4 server/client UDP 67/68.');
requireAnswer('Client-server distribution time', 'Dcs ≥ max(NF/us, F/dmin).');
requireAnswer('P2P distribution time', 'Dp2p ≥ max(F/us, F/dmin, NF/(us + tổng ui)).');
requireAnswer('Subnet mask /24', '255.255.255.0.');
requireAnswer('Subnet mask /25', '255.255.255.128.');
requireAnswer('Subnet mask /26', '255.255.255.192.');
requireAnswer('Subnet mask /27', '255.255.255.224.');
requireAnswer('Usable hosts /24', '254 host.');
requireAnswer('Usable hosts /26', '62 host.');
requireAnswer('Network address calculation', '192.168.1.64/26.');
requireAnswer('Broadcast address calculation', '192.168.1.127.');
requireAnswer('Usable host range /27', '192.168.10.33 đến 192.168.10.62.');
requireAnswer('Private and public IP', '10.0.0.0/8; 172.16.0.0/12; 192.168.0.0/16.');

if (errors.length) {
  console.error(`FAIL — ${errors.length} lỗi:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('PASS — Ngân hàng câu hỏi sau khi biên tập lại hợp lệ.');
console.log('• 600 câu, 4 chương × 150 câu; 30 chủ đề mỗi chương.');
console.log('• 6 đề cố định × 100 câu; mỗi đề có đúng 25 câu/chương.');
console.log('• Mỗi chủ đề có 5 cách hỏi, không lặp trong cùng đề.');
console.log('• 100 lượt random mô phỏng đều có 100 câu và 25 câu/chương.');
console.log('• Đáp án, lựa chọn, lời giải và các giá trị subnet/header/port trọng tâm đã qua kiểm tra.');
