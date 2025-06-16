
let medicines = [];
let currentPage = 1;
const itemsPerPage = 50;

fetch('medicine_data_full.json')
  .then(res => res.json())
  .then(data => {
    medicines = data;
    displayPage(1);
    setupPagination();
  });

document.getElementById('search-input').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = medicines.filter(med =>
    (med.brand + med.generic + med.company + med.uses + med.category).toLowerCase().includes(keyword)
  );
  displayPage(1, filtered);
  setupPagination(filtered);
});

function displayPage(page, list = medicines) {
  currentPage = page;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const container = document.getElementById('medicines-container');
  container.innerHTML = '';
  list.slice(start, end).forEach(med => {
    const card = document.createElement('div');
    card.className = 'medicine-card';
    card.innerHTML = `
      <h3>${med.brand}</h3>
      <p><strong>Generic:</strong> ${med.generic}</p>
      <p><strong>Company:</strong> ${med.company}</p>
      <p><strong>Strength:</strong> ${med.strength}</p>
      <p><strong>Form:</strong> ${med.form}</p>
      <p><strong>Uses:</strong> ${med.uses}</p>
      <p><strong>Dosage:</strong> ${med.dosage}</p>
      <p><strong>Price:</strong> ৳${med.price}</p>
      <p><strong>Status:</strong> ${med.status}</p>
    `;
    container.appendChild(card);
  });
}

function setupPagination(list = medicines) {
  const totalPages = Math.ceil(list.length / itemsPerPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      displayPage(i, list);
      setupPagination(list);
    });
    pagination.appendChild(btn);
  }
}
