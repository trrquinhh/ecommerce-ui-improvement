const sizeForm = document.getElementById('size-form');
const resultBox = document.getElementById('result');

function showMessage(message) {
  resultBox.hidden = false;
  resultBox.classList.add('error');
  resultBox.innerHTML = `
    <p class="result-label">CHƯA THỂ GỢI Ý SIZE</p>
    <p class="result-message">${message}</p>
  `;
}

function getSuggestedSize(height, weight) {
  // Quy tắc demo: chọn size theo khoảng chiều cao và cân nặng trong bảng mẫu.
  // Nếu dữ liệu nằm giữa hai size, ưu tiên size lớn hơn để có độ thoải mái.
  const sizeRanges = [
    { size: 'S', minHeight: 150, maxHeight: 160, minWeight: 40, maxWeight: 50 },
    { size: 'M', minHeight: 160, maxHeight: 170, minWeight: 50, maxWeight: 60 },
    { size: 'L', minHeight: 170, maxHeight: 180, minWeight: 60, maxWeight: 70 },
    { size: 'XL', minHeight: 180, maxHeight: 190, minWeight: 70, maxWeight: 85 }
  ];

  // Điểm gần nhất được tính từ tâm khoảng chiều cao và cân nặng của mỗi size.
  let bestMatch = null;
  let lowestScore = Infinity;

  for (const range of sizeRanges) {
    const midHeight = (range.minHeight + range.maxHeight) / 2;
    const midWeight = (range.minWeight + range.maxWeight) / 2;
    const heightScore = Math.abs(height - midHeight) / 10;
    const weightScore = Math.abs(weight - midWeight) / 10;
    const score = heightScore + weightScore;

    if (score < lowestScore) {
      lowestScore = score;
      bestMatch = range;
    }
  }
  return bestMatch;
}

sizeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  resultBox.classList.remove('error');

  const height = Number(document.getElementById('height').value);
  const weight = Number(document.getElementById('weight').value);

  if (!height || !weight) {
    showMessage('Bạn vui lòng nhập đầy đủ chiều cao và cân nặng.');
    return;
  }
  if (height < 130 || height > 210) {
    showMessage('Chiều cao hợp lệ trong bản demo là từ 130 đến 210 cm.');
    return;
  }
  if (weight < 30 || weight > 120) {
    showMessage('Cân nặng hợp lệ trong bản demo là từ 30 đến 120 kg.');
    return;
  }

  const match = getSuggestedSize(height, weight);
  resultBox.hidden = false;
  resultBox.innerHTML = `
    <p class="result-label">SIZE GỢI Ý CỦA BẠN</p>
    <p class="result-size">${match.size}</p>
    <p class="result-message">Với chiều cao ${height} cm và cân nặng ${weight} kg, size ${match.size} là lựa chọn tham khảo gần nhất theo bảng size minh họa. Nếu bạn thích mặc rộng, hãy cân nhắc tăng một size.</p>
  `;
});
