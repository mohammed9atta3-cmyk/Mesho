const grid = document.getElementById('carsGrid');
const cards = [...document.querySelectorAll('.car-card')];
const categoryFilter = document.getElementById('categoryFilter');
const cityFilter = document.getElementById('cityFilter');
const resultCount = document.getElementById('resultCount');
const toast = document.getElementById('toast');
let selectedCar = '';

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}
function filterCars() {
  const category = categoryFilter.value;
  const city = cityFilter.value;
  let count = 0;
  cards.forEach(card => {
    const categoryMatch = category === 'all' || card.dataset.category === category;
    const cityMatch = city === 'all' || card.dataset.city.includes(city);
    const visible = categoryMatch && cityMatch;
    card.classList.toggle('hidden', !visible);
    if (visible) count++;
  });
  resultCount.textContent = `${count} سيارات في نتائج البحث`;
}
document.getElementById('searchBtn').addEventListener('click', () => {
  filterCars();
  document.getElementById('cars').scrollIntoView({behavior:'smooth'});
});
document.querySelectorAll('.category-card').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.category-card').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    categoryFilter.value = button.dataset.category;
    filterCars();
    document.getElementById('cars').scrollIntoView({behavior:'smooth'});
  });
});
document.querySelectorAll('.favorite').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('liked');
    button.textContent = button.classList.contains('liked') ? '♥' : '♡';
  });
});
const modal = document.getElementById('bookingModal');
function openBooking(car) {
  selectedCar = car;
  document.getElementById('modalCarName').textContent = car;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}
document.querySelectorAll('.book-btn').forEach(button => {
  button.addEventListener('click', () => openBooking(button.dataset.car));
});
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const date = data.get('date');
  const message = `طلب حجز تجريبي من Sudan Drive%0Aالسيارة: ${selectedCar}%0Aالاسم: ${data.get('name')}%0Aالهاتف: ${data.get('phone')}%0Aالمدينة: ${data.get('city')}%0Aتاريخ الاستلام: ${date}`;
  // استبدل الرقم أدناه برقم واتساب الخاص بالمشروع بصيغة دولية دون + أو مسافات.
  const whatsappNumber = '249000000000';
  if (whatsappNumber === '249000000000') {
    showToast('تم تسجيل الطلب تجريبياً. أضف رقم واتساب حقيقياً لتفعيل الإرسال.');
    closeModal();
    e.target.reset();
    return;
  }
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  closeModal();
  e.target.reset();
});
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});
document.querySelectorAll('#mainNav a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('mainNav').classList.remove('open');
}));
