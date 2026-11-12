import questions from '../questions.js';

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const chapters = ['C1', 'C2', 'C3', 'C4'];

assert(Array.isArray(questions), 'questions phải là một mảng');
assert(questions.length === 600, `Cần đúng 600 câu, hiện có ${questions.length}`);
assert(new Set(questions.map((q) => q.id)).size === questions.length, 'ID câu hỏi bị trùng');
assert(new Set(questions.map((q) => q.question)).size === questions.length, 'Nội dung câu hỏi bị trùng');

for (const chapter of chapters) {
  const items = questions.filter((q) => q.chapter === chapter);
  assert(items.length === 150, `${chapter} phải có 150 câu, hiện có ${items.length}`);
  const concepts = new Set(items.map((q) => q.conceptId));
  assert(concepts.size === 30, `${chapter} phải có 30 khái niệm riêng`);
  for (const conceptId of concepts) {
    const variants = items.filter((q) => q.conceptId === conceptId);
    assert(variants.length === 5, `${conceptId} phải có đúng 5 biến thể câu hỏi`);
    assert(new Set(variants.map((q) => q.setId)).size === 5, `${conceptId} phải xuất hiện trong 5 đề khác nhau`);
  }
}

for (let setId = 1; setId <= 6; setId++) {
  const set = questions.filter((q) => q.setId === setId);
  assert(set.length === 100, `Đề ${setId} phải có 100 câu, hiện có ${set.length}`);
  assert(new Set(set.map((q) => q.id)).size === 100, `Đề ${setId} có ID câu bị trùng`);
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
for (let run = 0; run < 30; run++) {
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
  assert(q.options[q.answerIndex] !== undefined, `Câu ${q.id} không có đáp án đúng`);
  assert(typeof q.explanation === 'string' && q.explanation.trim().length > 15, `Câu ${q.id} thiếu giải thích`);
  assert(q.setId >= 1 && q.setId <= 6, `Câu ${q.id} có setId không hợp lệ`);
}

// Subnet sanity checks used as regression guards for common answers in the bank.
const lookup = (snippet) => questions.find((q) => q.question.includes(snippet));
const host26 = questions.find((q) => q.topic === 'Hosts in /26');
assert(host26?.options[host26?.answerIndex] === '62 host.', 'Kiểm tra đáp án /26 host count thất bại');
assert(lookup('192.168.1.70/26')?.options[lookup('192.168.1.70/26')?.answerIndex] === '192.168.1.64/26.', 'Kiểm tra Network ID /26 thất bại');
assert(lookup('192.168.1.64/26')?.options[lookup('192.168.1.64/26')?.answerIndex] === '192.168.1.127.', 'Kiểm tra broadcast /26 thất bại');
assert(questions.find((q) => q.topic === 'IPv4 Total Length field')?.options[questions.find((q) => q.topic === 'IPv4 Total Length field')?.answerIndex] === '16 bit.', 'Kiểm tra IPv4 Total Length 16-bit thất bại');
assert(questions.find((q) => q.topic === 'IPv6 Payload Length field')?.options[questions.find((q) => q.topic === 'IPv6 Payload Length field')?.answerIndex] === '16 bit.', 'Kiểm tra IPv6 Payload Length 16-bit thất bại');

if (errors.length) {
  console.error(`FAIL — ${errors.length} lỗi:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('PASS — Ngân hàng câu hỏi hợp lệ.');
console.log('• 600 câu hỏi, ID và nội dung duy nhất.');
console.log('• 150 câu mỗi chương; mỗi chương có 30 khái niệm.');
console.log('• 6 đề cố định × 100 câu; mỗi đề có 25 câu/chương.');
console.log('• Mỗi khái niệm có 5 biến thể; 6 đề và 30 lượt random mô phỏng đều cân bằng 25 câu/chương.');
console.log('• Không lặp khái niệm trong từng đề; options/đáp án/giải thích hợp lệ.');
console.log('• Các phép tính subnetting trọng tâm đã qua kiểm tra hồi quy.');
