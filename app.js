/**
  App Logic for RUANG TEDUH
  Developed by Antigravity
  Coding by Rahmat Dwi Kurniawan
*/

// --- 1. INITIAL & MOCK DATA SETUP ---
const MOCK_STUDENTS = [
  { name: "Ahmad Fauzi", class: "X.1", age: 15, wa: "081234567891", badges: ["badge-first-checkin", "badge-streak-3"], streak: 3 },
  { name: "Siti Rahma", class: "X.2", age: 16, wa: "089876543211", badges: ["badge-first-checkin", "badge-mindful"], streak: 1 },
  { name: "Budi Santoso", class: "X.3", age: 15, wa: "087712345678", badges: ["badge-first-checkin", "badge-mindful", "badge-positive"], streak: 5 },
  { name: "Rani Wijaya", class: "X.1", age: 16, wa: "085298765432", badges: ["badge-first-checkin"], streak: 2 }
];

const MOCK_CHECKINS = [
  // Ahmad Fauzi: 3 consecutive Tinggi scores to trigger priority!
  { studentName: "Ahmad Fauzi", date: "2026-06-03T08:00:00.000Z", score: 4.2, status: "Tinggi", answers: { q1: 1, q2: 2, q3: 4, q4: 2, q5: 5, qp1: 2, qp2: 2, qp3: 2 } },
  { studentName: "Ahmad Fauzi", date: "2026-06-04T08:00:00.000Z", score: 4.4, status: "Tinggi", answers: { q1: 1, q2: 1, q3: 5, q4: 1, q5: 5, qp1: 3, qp2: 2, qp3: 3 } },
  { studentName: "Ahmad Fauzi", date: "2026-06-05T08:00:00.000Z", score: 4.6, status: "Tinggi", answers: { q1: 1, q2: 1, q3: 5, q4: 1, q5: 5, qp1: 3, qp2: 3, qp3: 3 } },
  
  // Siti Rahma
  { studentName: "Siti Rahma", date: "2026-06-04T09:00:00.000Z", score: 3.2, status: "Sedang", answers: { q1: 3, q2: 3, q3: 3, q4: 4, q5: 3, qp1: 1, qp2: 2, qp3: 1 } },
  { studentName: "Siti Rahma", date: "2026-06-05T08:30:00.000Z", score: 2.8, status: "Sedang", answers: { q1: 4, q2: 3, q3: 3, q4: 3, q5: 2, qp1: 0, qp2: 1, qp3: 1 } },
  
  // Budi Santoso
  { studentName: "Budi Santoso", date: "2026-06-01T07:30:00.000Z", score: 1.8, status: "Ringan", answers: { q1: 5, q2: 4, q3: 1, q4: 5, q5: 1, qp1: 0, qp2: 0, qp3: 0 } },
  { studentName: "Budi Santoso", date: "2026-06-02T07:45:00.000Z", score: 1.6, status: "Ringan", answers: { q1: 5, q2: 5, q3: 1, q4: 5, q5: 1, qp1: 0, qp2: 0, qp3: 0 } },
  { studentName: "Budi Santoso", date: "2026-06-03T08:15:00.000Z", score: 2.0, status: "Ringan", answers: { q1: 4, q2: 4, q3: 2, q4: 4, q5: 2, qp1: 1, qp2: 0, qp3: 0 } },
  { studentName: "Budi Santoso", date: "2026-06-04T07:30:00.000Z", score: 1.4, status: "Ringan", answers: { q1: 5, q2: 5, q3: 1, q4: 5, q5: 1, qp1: 0, qp2: 0, qp3: 0 } },
  { studentName: "Budi Santoso", date: "2026-06-05T07:40:00.000Z", score: 1.2, status: "Ringan", answers: { q1: 5, q2: 5, q3: 1, q4: 5, q5: 1, qp1: 0, qp2: 0, qp3: 0 } },
  
  // Rani Wijaya
  { studentName: "Rani Wijaya", date: "2026-06-05T09:15:00.000Z", score: 2.0, status: "Ringan", answers: { q1: 4, q2: 4, q3: 2, q4: 4, q5: 2, qp1: 0, qp2: 1, qp3: 0 } }
];

const MOCK_ARTICLES = [
  {
    id: 1,
    category: "Kesehatan Mental",
    title: "Mengenal Kesehatan Mental Remaja di Masa SMA",
    desc: "Menjelaskan mengapa menjaga kesehatan emosi di bangku SMA sama pentingnya dengan mengejar nilai akademik.",
    readTime: "5 menit baca",
    icon: "🧠"
  },
  {
    id: 2,
    category: "Self Love",
    title: "5 Cara Sederhana Menyayangi Dirimu Sendiri",
    desc: "Belajar menerima kegagalan dan memperlakukan dirimu sendiri secara lembut di tengah tuntutan kompetitif sekolah.",
    readTime: "4 menit baca",
    icon: "💖"
  },
  {
    id: 3,
    category: "Anti Bullying",
    title: "Bagaimana Sikap Kita Menghadapi Perundungan?",
    desc: "Panduan praktis bagi korban maupun saksi tindakan perundungan di sekolah, serta ke mana harus mencari perlindungan.",
    readTime: "6 menit baca",
    icon: "🛡️"
  },
  {
    id: 4,
    category: "Adaptasi di SMA",
    title: "Tips Adaptasi Nyaman dari SMP ke SMA Baru",
    desc: "Langkah-langkah bersosialisasi mencari kawan baru tanpa harus kehilangan identitas diri yang unik.",
    readTime: "5 menit baca",
    icon: "🎒"
  },
  {
    id: 5,
    category: "Manajemen Stres",
    title: "Mengatasi Rasa Cemas Saat Ujian Mendatang",
    desc: "Latihan pernapasan sederhana (box breathing) dan trik relaksasi otot untuk melepas ketegangan pikiran sebelum ujian.",
    readTime: "4 menit baca",
    icon: "🧘"
  },
  {
    id: 6,
    category: "Produktivitas Belajar",
    title: "Teknik Pomodoro: Belajar Efektif Tanpa Burnout",
    desc: "Mengatur waktu belajar 25 menit diselingi istirahat 5 menit untuk menjaga kesegaran sel-sel otakmu.",
    readTime: "3 menit baca",
    icon: "⏱️"
  }
];

// Initialize localStorage with mock data if not set
if (!localStorage.getItem("ruangTeduh_users")) {
  localStorage.setItem("ruangTeduh_users", JSON.stringify(MOCK_STUDENTS));
}
if (!localStorage.getItem("ruangTeduh_checkins")) {
  localStorage.setItem("ruangTeduh_checkins", JSON.stringify(MOCK_CHECKINS));
}

// Current session states
let currentUser = JSON.parse(localStorage.getItem("ruangTeduh_currentUser")) || null;
let currentRole = localStorage.getItem("ruangTeduh_currentRole") || null; // 'student' or 'admin'
let checkinAnswers = {};
let currentCheckinStep = 1;
const totalCheckinSteps = 6;
let currentTestimonialIndex = 0;

// --- 2. THEME & INIT DOM ---
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initStats();
  initQuestionnaire();
  initFAQ();
  initArticles();
  checkLoginStatus();
  startTestimonialCarousel();
  initPwaSupport();
  
  // Custom visual resize updates for canvases
  window.addEventListener('resize', () => {
    if (currentRole === 'student') renderStudentChart();
  });

  // Hide page loader with transition
  const loader = document.getElementById("pageLoader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = 0;
      loader.style.visibility = "hidden";
    }, 800);
  }
});

// Theme Management
function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("ruangTeduh_theme") || "light";
  
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("ruangTeduh_theme", newTheme);
    updateThemeIcon(newTheme);
    
    // Redraw charts for contrast adaptation
    if (currentRole === 'student') renderStudentChart();
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeToggle").querySelector("i");
  if (theme === "dark") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
}

// Navigation & Single Page Routing
function initNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close nav on link click in mobile
  document.querySelectorAll(".nav-links a, .nav-links button").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

function navigateTo(page, sectionId = null) {
  const homePage = document.getElementById("homePage");
  const studentDashboardPage = document.getElementById("studentDashboardPage");
  
  // Reset active classes
  document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));

  if (page === 'home') {
    homePage.style.display = "block";
    if (studentDashboardPage) studentDashboardPage.classList.remove("active");
    
    // Highlight home tab or matching hash link
    const targetLink = document.querySelector(`.nav-links a[href="${sectionId ? '#' + sectionId : '#'}"]`);
    if (targetLink) targetLink.classList.add("active");
    
    if (sectionId) {
      scrollToSection(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const headerHeight = document.querySelector("header").offsetHeight;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - headerHeight - 10,
      behavior: "smooth"
    });
  }
}

// Stats counter animation (lighthearted)
function initStats() {
  const checkins = JSON.parse(localStorage.getItem("ruangTeduh_checkins")) || [];
  const students = JSON.parse(localStorage.getItem("ruangTeduh_users")) || [];
  
  // Set real numbers dynamically
  document.getElementById("statSiswa").textContent = students.length;
  document.getElementById("statKuesioner").textContent = checkins.length;
  
  // Count how many students have priority status
  const assistedCount = checkins.filter(c => c.status === "Tinggi").map(c => c.studentName);
  const uniqueAssisted = [...new Set(assistedCount)].length;
  document.getElementById("statPendampingan").textContent = Math.max(18, uniqueAssisted);
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const trigger = item.querySelector(".faq-trigger");
    trigger.addEventListener("click", () => {
      const active = item.classList.contains("active");
      faqItems.forEach(i => i.classList.remove("active"));
      if (!active) {
        item.classList.add("active");
      }
    });
  });
}

// Articles Renderer
function initArticles() {
  renderArticles(MOCK_ARTICLES);
}

function renderArticles(articlesList) {
  const grid = document.getElementById("articlesGrid");
  grid.innerHTML = "";
  
  articlesList.forEach(art => {
    const card = document.createElement("div");
    card.className = "card article-card";
    card.innerHTML = `
      <div class="article-img">${art.icon}</div>
      <div class="article-category">${art.category}</div>
      <h3 class="article-title">${art.title}</h3>
      <p class="article-desc">${art.desc}</p>
      <div class="article-footer">
        <span>⏱️ ${art.readTime}</span>
        <a href="#" class="btn btn-sm btn-cream" onclick="alert('Artikel lengkap sedang disiapkan oleh tim kesiswaan!'); return false;">Baca Detail</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterArticles(category) {
  // Update buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    if (btn.textContent.trim() === category || (category === "Semua" && btn.textContent.trim() === "Semua") || (category === "Adaptasi di SMA" && btn.textContent.trim() === "Adaptasi") || (category === "Manajemen Stres" && btn.textContent.trim() === "Manajemen Stres") || (category === "Produktivitas Belajar" && btn.textContent.trim() === "Belajar")) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (category === "Semua") {
    renderArticles(MOCK_ARTICLES);
  } else {
    const filtered = MOCK_ARTICLES.filter(a => a.category === category);
    renderArticles(filtered);
  }
}

// Testimonials Slideshow
function startTestimonialCarousel() {
  setInterval(() => {
    moveTestimonial(1);
  }, 6000);
}

function moveTestimonial(direction) {
  const slides = document.querySelectorAll(".testimonial-slide");
  slides[currentTestimonialIndex].className = "testimonial-slide";
  
  currentTestimonialIndex += direction;
  if (currentTestimonialIndex >= slides.length) currentTestimonialIndex = 0;
  if (currentTestimonialIndex < 0) currentTestimonialIndex = slides.length - 1;
  
  slides[currentTestimonialIndex].className = "testimonial-slide active";
}


// --- 3. DAILY CHECK-IN SYSTEM ---
function initQuestionnaire() {
  // Add listeners to all emoji buttons
  document.querySelectorAll(".emoji-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      // Find parent group and question key
      const scale = btn.parentElement;
      const qKey = scale.getAttribute("data-question");
      const value = parseInt(btn.getAttribute("data-val"));
      
      // Remove active classes in this scale
      scale.querySelectorAll(".emoji-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Save answer
      checkinAnswers[qKey] = value;
    });
  });
}

function changeStep(direction) {
  // Validation: Must select an answer before moving forward (Steps 1 to 5)
  if (direction === 1) {
    if (currentCheckinStep <= 5) {
      const currentQ = `q${currentCheckinStep}`;
      if (checkinAnswers[currentQ] === undefined) {
        alert("Pilih salah satu emoji terlebih dahulu untuk mengekspresikan kondisimu!");
        return;
      }
    }
  }

  // Hide current step
  document.querySelector(`.question-group[data-step="${currentCheckinStep}"]`).classList.remove("active");
  document.getElementById(`dot-${currentCheckinStep}`).classList.remove("active");
  if (direction === 1) {
    document.getElementById(`dot-${currentCheckinStep}`).classList.add("completed");
  }

  // Update step index
  currentCheckinStep += direction;

  // Render new step
  if (currentCheckinStep > totalCheckinSteps) {
    submitCheckin();
  } else {
    document.querySelector(`.question-group[data-step="${currentCheckinStep}"]`).classList.add("active");
    document.getElementById(`dot-${currentCheckinStep}`).classList.add("active");
    
    // Enable/disable navigation buttons
    document.getElementById("prevCheckinBtn").disabled = currentCheckinStep === 1;
    if (currentCheckinStep === totalCheckinSteps) {
      document.getElementById("nextCheckinBtn").innerHTML = `Kirim & Selesai <i class="fa-solid fa-check"></i>`;
      document.getElementById("nextCheckinBtn").className = "btn btn-green btn-sm";
    } else {
      document.getElementById("nextCheckinBtn").innerHTML = `Lanjut <i class="fa-solid fa-arrow-right"></i>`;
      document.getElementById("nextCheckinBtn").className = "btn btn-pink btn-sm";
    }

    // Update progress bar width
    const progressPercent = ((currentCheckinStep - 1) / (totalCheckinSteps - 1)) * 100;
    document.getElementById("checkinProgressFill").style.width = `${progressPercent}%`;
  }
}

function submitCheckin() {
  // Check if student details are available (User logged in or Curhat register)
  if (!currentUser) {
    alert("Harap login atau daftarkan nama Anda terlebih dahulu di bagian CurhatKuy AI sebelum mengirim kuesioner harian.");
    scrollToSection("curhat");
    resetCheckin();
    return;
  }

  // Capture supporting answers
  checkinAnswers.qp1 = parseInt(document.getElementById("qp1").value);
  checkinAnswers.qp2 = parseInt(document.getElementById("qp2").value);
  checkinAnswers.qp3 = parseInt(document.getElementById("qp3").value);

  // 1. Scoring Logic: calculate distress scale
  // Positive questions (q1, q2, q4): 5 is good, 1 is bad. distress = 6 - answer.
  // Negative questions (q3, q5): 1 is good, 5 is bad. distress = answer.
  const d1 = 6 - checkinAnswers.q1;
  const d2 = 6 - checkinAnswers.q2;
  const d3 = checkinAnswers.q3;
  const d4 = 6 - checkinAnswers.q4;
  const d5 = checkinAnswers.q5;
  
  const totalDistress = d1 + d2 + d3 + d4 + d5;
  const score = parseFloat((totalDistress / 5).toFixed(2));
  
  // Categorize
  let status = "Ringan";
  if (score > 2.2 && score <= 3.6) {
    status = "Sedang";
  } else if (score > 3.6) {
    status = "Tinggi";
  }

  // 2. Save check-in
  const newCheckin = {
    studentName: currentUser.name,
    date: new Date().toISOString(),
    answers: { ...checkinAnswers },
    score: score,
    status: status
  };

  const checkins = JSON.parse(localStorage.getItem("ruangTeduh_checkins")) || [];
  checkins.push(newCheckin);
  localStorage.setItem("ruangTeduh_checkins", JSON.stringify(checkins));

  // 3. Update Student Streaks and Badges
  updateStudentStreaksAndBadges(status);

  // Hide form wizard
  document.getElementById("checkinForm").style.display = "none";
  document.getElementById("checkinResultContainer").style.display = "block";

  // Render Results UI
  const resultBadge = document.getElementById("resultBadge");
  const resultEmoji = document.getElementById("resultEmoji");
  const resultText = document.getElementById("resultText");
  const btnCounsellorCTA = document.getElementById("btnCounsellorCTA");

  resultBadge.textContent = status.toUpperCase();
  resultBadge.className = `result-badge badge-${status.toLowerCase()}`;

  if (status === "Ringan") {
    resultEmoji.textContent = "😊";
    resultText.textContent = "Kondisi psikologismu hari ini tergolong aman & seimbang! Pertahankan pola pikir positif, rawat dirimu, dan nikmati harimu ya.";
    btnCounsellorCTA.style.display = "none";
  } else if (status === "Sedang") {
    resultEmoji.textContent = "😐";
    resultText.textContent = "Kamu terdeteksi sedang mengalami stres sedang. Cobalah lakukan relaksasi sejenak atau mengobrol ringan bersama CurhatKuy AI di bawah untuk melepaskan beban pikiran.";
    btnCounsellorCTA.style.display = "none";
  } else { // Tinggi
    resultEmoji.textContent = "😢";
    resultText.textContent = "Kondisi emosimu terdeteksi sedang kurang nyaman dan mengalami tekanan tinggi hari ini. Tarik napas perlahan. Kami menyarankanmu untuk berkonsultasi santai dengan guru BK sekolah.";
    btnCounsellorCTA.style.display = "inline-flex";
  }

  // 4. Consecutive Check-in Analysis
  checkConsecutiveHighScores(currentUser.name);

  // Refresh stats counters
  initStats();
}

function updateStudentStreaksAndBadges(latestStatus) {
  const users = JSON.parse(localStorage.getItem("ruangTeduh_users")) || [];
  const student = users.find(u => u.name === currentUser.name);
  if (!student) return;

  // Streak logic (daily counter)
  const todayStr = new Date().toDateString();
  const lastCheckinStr = student.lastCheckinDate ? new Date(student.lastCheckinDate).toDateString() : "";
  
  if (lastCheckinStr !== todayStr) {
    if (lastCheckinStr === new Date(Date.now() - 86400000).toDateString()) {
      student.streak += 1;
    } else {
      student.streak = 1; // broken streak
    }
    student.lastCheckinDate = new Date().toISOString();
  }

  // Badge Awards (Gamification)
  const awardedBadges = student.badges || [];
  let newlyAwarded = null;

  // 1. Langkah Awal (First Checkin)
  if (!awardedBadges.includes("badge-first-checkin")) {
    awardedBadges.push("badge-first-checkin");
    newlyAwarded = { id: "badge-first-checkin", name: "Langkah Awal", icon: "🌱" };
  }
  // 2. Konsisten 3 Hari (Streak 3)
  if (student.streak >= 3 && !awardedBadges.includes("badge-streak-3")) {
    awardedBadges.push("badge-streak-3");
    newlyAwarded = { id: "badge-streak-3", name: "Konsisten 3 Hari", icon: "🔥" };
  }
  // 3. Sobat Teduh (Ringan state check)
  if (latestStatus === "Ringan" && !awardedBadges.includes("badge-mindful")) {
    awardedBadges.push("badge-mindful");
    newlyAwarded = { id: "badge-mindful", name: "Sobat Teduh", icon: "🧘" };
  }
  // 4. Bintang Ceria (If scored extremely happy 😁)
  if (checkinAnswers.q1 === 5 && checkinAnswers.q2 === 5 && !awardedBadges.includes("badge-positive")) {
    awardedBadges.push("badge-positive");
    newlyAwarded = { id: "badge-positive", name: "Bintang Ceria", icon: "✨" };
  }

  student.badges = awardedBadges;
  
  // Save changes
  localStorage.setItem("ruangTeduh_users", JSON.stringify(users));
  currentUser = student;
  localStorage.setItem("ruangTeduh_currentUser", JSON.stringify(student));

  // Show badge alert in result if awarded
  const badgeAwardAlert = document.getElementById("badgeAwardAlert");
  if (newlyAwarded) {
    document.getElementById("awardedBadgeIcon").textContent = newlyAwarded.icon;
    document.getElementById("awardedBadgeName").textContent = newlyAwarded.name;
    badgeAwardAlert.style.display = "block";
  } else {
    badgeAwardAlert.style.display = "none";
  }
}

function checkConsecutiveHighScores(studentName) {
  const checkins = JSON.parse(localStorage.getItem("ruangTeduh_checkins")) || [];
  
  // Filter and sort checkins for this student
  const studentCheckins = checkins
    .filter(c => c.studentName === studentName)
    .sort((a,b) => new Date(b.date) - new Date(a.date)); // Latest first

  let consecutiveHigh = 0;
  for (let i = 0; i < studentCheckins.length; i++) {
    if (studentCheckins[i].status === "Tinggi") {
      consecutiveHigh++;
    } else {
      break; // break streak
    }
  }

  const alertBox = document.getElementById("consecutiveAlert");
  if (consecutiveHigh >= 3) {
    alertBox.style.display = "block";
    
    // Auto-create alert notification for BK
    triggerBkAlertNotification(studentName, consecutiveHigh);
  } else {
    alertBox.style.display = "none";
  }
}

function triggerBkAlertNotification(studentName, count) {
  // Create toast notification simulation
  const alertStack = document.getElementById("alertStack");
  const toast = document.createElement("div");
  toast.className = "toast-alert urgent";
  toast.innerHTML = `
    <div class="toast-icon">⚠️</div>
    <div class="toast-body">
      <h4>Pemberitahuan Prioritas</h4>
      <p>Siswa <strong>${studentName}</strong> terdeteksi Kategori Tinggi <strong>${count}x berturut-turut</strong>.</p>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">✖</button>
  `;
  alertStack.appendChild(toast);
  
  // Auto remove after 10s
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 10000);
}

function resetCheckin() {
  checkinAnswers = {};
  currentCheckinStep = 1;
  document.getElementById("checkinForm").style.display = "block";
  document.getElementById("checkinResultContainer").style.display = "none";
  
  // Clear active steps
  document.querySelectorAll(".question-group").forEach((g, idx) => {
    if (idx === 0) g.classList.add("active");
    else g.classList.remove("active");
  });
  
  document.querySelectorAll(".checkin-step-dot").forEach((d, idx) => {
    d.classList.remove("completed");
    if (idx === 0) d.classList.add("active");
    else d.classList.remove("active");
  });

  document.querySelectorAll(".emoji-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("checkinProgressFill").style.width = "0%";
  document.getElementById("prevCheckinBtn").disabled = true;
  document.getElementById("nextCheckinBtn").innerHTML = `Lanjut <i class="fa-solid fa-arrow-right"></i>`;
  document.getElementById("nextCheckinBtn").className = "btn btn-pink btn-sm";
}


// --- 4. CHATBOT CURHATKUY AI ---
function registerChatUser(event) {
  event.preventDefault();
  
  const name = document.getElementById("studentName").value.trim();
  const studentClass = document.getElementById("studentClass").value;
  const age = parseInt(document.getElementById("studentAge").value);
  const wa = document.getElementById("studentWa").value.trim();
  const consent = document.getElementById("privacyConsent").checked;

  if (!name || !studentClass || !age || !wa || !consent) {
    alert("Harap lengkapi semua isian formulir pendaftaran!");
    return;
  }

  // Save student as user in localStorage
  const users = JSON.parse(localStorage.getItem("ruangTeduh_users")) || [];
  let student = users.find(u => u.name.toLowerCase() === name.toLowerCase());
  
  if (!student) {
    student = { name, class: studentClass, age, wa, badges: ["badge-first-checkin"], streak: 0 };
    users.push(student);
    localStorage.setItem("ruangTeduh_users", JSON.stringify(users));
  }

  // Set session
  currentUser = student;
  currentRole = "student";
  localStorage.setItem("ruangTeduh_currentUser", JSON.stringify(student));
  localStorage.setItem("ruangTeduh_currentRole", "student");

  // Show chatbot
  toggleChatbotView(true);
  checkLoginStatus();
  initStats();
}

function toggleChatbotView(show) {
  const gateway = document.getElementById("chatGateway");
  const chatbox = document.getElementById("chatBoxContainer");
  
  if (show) {
    gateway.style.display = "none";
    chatbox.style.display = "flex";
    
    // Add initial chatbot greeting
    const chatBody = document.getElementById("chatBody");
    chatBody.innerHTML = `
      <div class="chat-message bot">
        Halo <strong>${currentUser.name}</strong>! 👋 Aku CurhatKuy AI. <br>
        Aku siap menjadi asisten virtual pendamping ceritamu kapan saja dengan aman, rahasia, dan tanpa menghakimi. <br>
        Bagaimana perasaanmu atau apa yang sedang berkecamuk di pikiranmu saat ini? Cerita aja yuk...
      </div>
    `;
  } else {
    gateway.style.display = "block";
    chatbox.style.display = "none";
  }
}

function resetChatSession() {
  currentUser = null;
  currentRole = null;
  localStorage.removeItem("ruangTeduh_currentUser");
  localStorage.removeItem("ruangTeduh_currentRole");
  toggleChatbotView(false);
  checkLoginStatus();
}

function sendChatMessage(event) {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  
  if (!text) return;

  // Render User Message
  appendChatMessage(text, "user");
  input.value = "";

  // Bot response with loading effect simulation
  setTimeout(() => {
    const response = generateAIResponse(text);
    appendChatMessage(response.message, "bot");

    // If severe distress detected, display BK redirect warning
    if (response.isSevere) {
      appendCounselorAlert();
    }
  }, 800);
}

function appendChatMessage(text, sender) {
  const chatBody = document.getElementById("chatBody");
  const msg = document.createElement("div");
  msg.className = `chat-message ${sender}`;
  msg.innerHTML = text.replace(/\n/g, "<br>");
  chatBody.appendChild(msg);
  
  // Scroll to bottom
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendCounselorAlert() {
  const chatBody = document.getElementById("chatBody");
  const alertDiv = document.createElement("div");
  alertDiv.className = "chat-counselor-alert";
  alertDiv.innerHTML = `
    <p><i class="fa-solid fa-triangle-exclamation"></i> Kami Mendeteksi Kondisi Sangat Tertekan</p>
    <span style="font-size: 13px; color: var(--text-primary);">Tolong ingat bahwa kamu tidak sendirian. Guru BK kami siap mendengar dan membantumu secara penuh.</span>
    <a href="#konselor" class="btn btn-green btn-sm" onclick="scrollToSection('konselor')" style="box-shadow:2px 2px 0 var(--border-color); transform:none;">Hubungi Konselor Sekarang</a>
  `;
  chatBody.appendChild(alertDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function generateAIResponse(input) {
  const query = input.toLowerCase();
  
  // 1. Severe Distress check
  if (
    query.includes("bunuh diri") || 
    query.includes("mati saja") || 
    query.includes("ingin mati") || 
    query.includes("mengakhiri hidup") || 
    query.includes("menyerah") || 
    query.includes("iris pergelangan") || 
    query.includes("silet") || 
    query.includes("self harm") || 
    query.includes("menyakiti diri")
  ) {
    return {
      message: "Mendengar ceritamu, aku merasa kamu sedang menanggung beban yang luar biasa berat saat ini. Peluk hangat dari jauh untukmu. 🫂\n\nSebagai AI, aku memiliki batasan kapasitas bantuan dan keselamatanmu adalah yang terpenting. Tolong jangan simpan beban ini sendirian. Mari bicarakan hal ini langsung dengan Guru BK (Pak Jumardan/Pak Heri) yang siap membimbingmu dengan sangat hangat dan aman. Kamu berharga, dan kamu tidak sendirian.",
      isSevere: true
    };
  }

  // 2. Bullying / Discrimination
  if (
    query.includes("bully") || 
    query.includes("diejek") || 
    query.includes("dihina") || 
    query.includes("dikucilkan") || 
    query.includes("perundungan") || 
    query.includes("dijauhi") || 
    query.includes("difitnah")
  ) {
    return {
      message: "Aku sangat sedih mendengar kamu diperlakukan seperti itu. Tidak ada seorang pun yang layak mendapatkan perundungan (bullying) atau dikucilkan di sekolah. Ini sama sekali bukan salahmu.\n\nJangan memendam rasa takut ini sendirian ya. Menghadapi situasi ini butuh dukungan orang dewasa. Aku sangat menyarankanmu untuk melapor ke Guru BK atau wali kelasmu agar sekolah dapat mengambil tindakan perlindungan tegas. Aku menemanimu di sini.",
      isSevere: false
    };
  }

  // 3. Math Solver
  if (
    query.includes("matematika") || 
    query.includes("mtk") || 
    query.includes("hitung") || 
    query.includes("aljabar") || 
    query.includes("geometri") || 
    query.includes("statistika") || 
    query.includes("persamaan") || 
    query.includes("persentase") || 
    query.includes("soal cerita") || 
    query.includes("rumus") || 
    query.includes("pecahan")
  ) {
    return {
      message: "Tentu, aku siap membantumu belajar Matematika! 📐\nMatematika itu logis dan berpola. Sebagai contoh, mari kita bedah penyelesaian aljabar linear sederhana ini:\n\n**Soal:** Tentukan nilai x dari persamaan `2x + 5 = 15`\n\n**Langkah Penyelesaian:**\n1. **Pindahkan konstanta:** Kurangi kedua ruas dengan 5 agar variabel x terisolasi di satu sisi:\n   `2x + 5 - 5 = 15 - 5` \n   `2x = 10`\n2. **Bagi dengan koefisien:** Bagi kedua ruas dengan 2 untuk mendapatkan nilai x:\n   `x = 10 / 2`\n   `x = 5`\n\n*Bagaimana dengan soal yang sedang kamu hadapi? Kirimkan persamaannya atau topiknya (seperti geometri, peluang, pecahan, atau statistika), dan mari kita bedah bersama langkah demi langkah!*",
      isSevere: false
    };
  }

  // 4. Academic Help (IPA, IPS, Languages, etc.)
  if (
    query.includes("biologi") || 
    query.includes("kimia") || 
    query.includes("fisika") || 
    query.includes("sejarah") || 
    query.includes("geografi") || 
    query.includes("ekonomi") || 
    query.includes("sosiologi") || 
    query.includes("pancasila") || 
    query.includes("pkn") || 
    query.includes("informatika") || 
    query.includes("komputer") || 
    query.includes("coding") || 
    query.includes("bahasa") || 
    query.includes("inggris") || 
    query.includes("indonesia")
  ) {
    return {
      message: "Wah, kamu sedang belajar mata pelajaran itu ya! 📚 Aku siap membantumu memahami materi pelajaran di SMA. Baik itu IPA (Fisika, Biologi, Kimia), IPS (Sejarah, Geografi, Ekonomi, Sosiologi), Bahasa (Indonesia & Inggris), Pendidikan Pancasila, maupun Informatika (Komputer & Coding).\n\nSebagai contoh, jika kamu belajar **Biologi tentang Fotosintesis**, prosesnya adalah:\n`6CO₂ (Karbon Dioksida) + 6H₂O (Air) + Cahaya Matahari -> C₆H₁₂O₆ (Glukosa) + 6O₂ (Oksigen)`\nProses ini terjadi di dalam kloroplas daun dengan bantuan pigmen klorofil yang menangkap energi cahaya matahari.\n\n*Materi atau konsep apa nih dari pelajaranmu yang ingin kita diskusikan atau jelaskan hari ini? Tuliskan saja pertanyaannya ya!*",
      isSevere: false
    };
  }

  // 5. Schedule & Productivity Tips
  if (
    query.includes("jadwal") || 
    query.includes("prioritas") || 
    query.includes("target") || 
    query.includes("produktivitas") || 
    query.includes("presentasi") || 
    query.includes("tugas") || 
    query.includes("organisasi") || 
    query.includes("saran") || 
    query.includes("tips")
  ) {
    return {
      message: "Mengatur waktu dan menjaga produktivitas belajar di SMA memang butuh trik khusus agar terhindar dari *burnout*! ⏱️\n\nBerikut saran praktis yang bisa kamu coba:\n1. **Teknik Pomodoro:** Belajar fokus selama 25 menit, lalu istirahat 5 menit. Ulangi 4 kali sebelum mengambil istirahat panjang (15-30 menit).\n2. **Skala Prioritas (Eisenhower Matrix):** Bagi tugasmu menjadi 4 kuadran: *Penting & Mendesak*, *Penting tapi Kurang Mendesak*, *Kurang Penting tapi Mendesak*, dan *Kurang Penting & Kurang Mendesak*.\n3. **Metode SMART untuk Target:** Buat target belajar yang spesifik, terukur, dapat dicapai, relevan, dan memiliki batas waktu (contoh: 'Menyelesaikan ringkasan bab 1 Fisika dalam 2 jam malam ini').\n\n*Apakah ada tugas sekolah, persiapan presentasi kelompok, atau jadwal organisasi yang sedang membuatmu pusing? Ceritakan, mari kita susun prioritasnya bareng!*",
      isSevere: false
    };
  }

  // 6. Casual Chat (Music, Movies, Hobbies, Games, Sports)
  if (
    query.includes("hobi") || 
    query.includes("musik") || 
    query.includes("lagu") || 
    query.includes("film") || 
    query.includes("game") || 
    query.includes("main") || 
    query.includes("olahraga") || 
    query.includes("gabut") || 
    query.includes("bosan") || 
    query.includes("aktivitas")
  ) {
    return {
      message: "Asyik banget! Yuk ngobrol santai. Nemenin kamu di kala senggang atau gabut adalah salah satu kesukaanku! 🎮🎬\n\nDi sela-sela kesibukan sekolah, sangat penting untuk meluangkan waktu melakukan hal yang kita gemari untuk menyegarkan pikiran. \n- **Musik:** Mendengarkan lagu akustik atau instrumental tenang bisa meredakan kecemasan.\n- **Game:** Bermain game santai secukupnya bisa melatih fokus dan kerja sama.\n- **Olahraga:** Jogging ringan atau peregangan 15 menit melepaskan hormon endorfin pembawa kebahagiaan.\n\n*Kalau kamu sendiri, apa hobi yang paling sering kamu lakukan saat waktu luang? Atau genre musik/film apa yang paling kamu sukai? Cerita santai aja yuk!*",
      isSevere: false
    };
  }

  // 7. Healthy Adolescent Romance
  if (
    query.includes("pacar") || 
    query.includes("cinta") || 
    query.includes("hubungan") || 
    query.includes("gebetan") || 
    query.includes("crush") || 
    query.includes("pacaran") || 
    query.includes("galau")
  ) {
    return {
      message: "Urusan perasaan memang selalu bisa bikin hari-hari terasa lebih berwarna, tapi kadang juga bikin galau setengah mati ya! 💖\n\nDalam hubungan remaja, sangat penting untuk menjaga hubungan tetap sehat dan suportif:\n1. **Saling Menghargai & Batasan:** Hubungan yang baik harus memiliki batasan yang jelas dan saling menghormati kenyamanan masing-masing.\n2. **Komunikasi Terbuka:** Bicarakan kekhawatiran atau rasa tidak nyaman secara jujur tanpa drama atau manipulasi.\n3. **Tetap Mandiri:** Pacaran yang sehat tidak boleh membuatmu kehilangan waktu untuk teman-teman dekatmu, keluargamu, atau pelajaran sekolah.\n\n*Apakah kamu sedang menyukai seseorang, merasa bingung tentang status hubunganmu, atau sedang menghadapi konflik percintaan/pertemanan remaja? Ceritakan saja, aku ada di sini untuk mendengarkan tanpa menghakimi.*",
      isSevere: false
    };
  }

  // 8. Motivation
  if (
    query.includes("motivasi") || 
    query.includes("malas") || 
    query.includes("mager") || 
    query.includes("semangat") || 
    query.includes("down")
  ) {
    return {
      message: "Hei, wajar banget kalau ada kalanya kamu merasa kehilangan arah, malas, atau tidak bersemangat untuk melakukan apa-apa. 🌟\n\nIngatlah bahwa produktivitasmu tidak menentukan nilai dirimu. Hari ini kamu lelah, dan itu adalah sinyal bahwa tubuh dan pikiranmu butuh jeda.\n- Cobalah **langkah mikro**: Jangan bayangkan tugas besar, tapi mulailah dengan membuka buku saja, atau menulis 1 baris.\n- Lakukan **apresiasi diri**: Ingat kembali perjuangan kecil yang sudah berhasil kamu lalui sejauh ini. Kamu sudah melangkah sangat jauh!\n\n*Taruh dulu beban pikiranmu sejenak. Apa hal kecil yang paling ingin kamu lakukan hari ini untuk merawat dirimu sendiri? Aku siap menyemangatimu!*",
      isSevere: false
    };
  }

  // 9. School stress / study pressure
  if (
    query.includes("stres") || 
    query.includes("tugas") || 
    query.includes("capek") || 
    query.includes("lelah") || 
    query.includes("ujian") || 
    query.includes("nilai") || 
    query.includes("rapot") || 
    query.includes("pr ")
  ) {
    return {
      message: "Wajar sekali merasa lelah dengan tuntutan tugas, ujian, dan tumpukan PR sekolah. Belajar di SMA memang menuntut banyak energi fisik dan mental.\n\nTips kecil untukmu hari ini:\n1. Istirahatkan matamu selama 5-10 menit dengan teknik Pomodoro.\n2. Tarik napas perlahan dan minum segelas air putih hangat.\n3. Kurangi ekspektasi berlebih. Kamu sedang berproses, melakukan yang terbaik sudah lebih dari cukup!",
      isSevere: false
    };
  }

  // 10. Anxiety / Overthinking
  if (
    query.includes("cemas") || 
    query.includes("khawatir") || 
    query.includes("takut") || 
    query.includes("panik") || 
    query.includes("gemetar") || 
    query.includes("overthink")
  ) {
    return {
      message: "Rasa cemas dan kekhawatiran berlebih terkadang membuat pikiran kita berputar-putar tanpa arah. Terima kasih sudah mau menceritakan kegelisahanmu padaku.\n\nMari kita coba tenangkan dirimu sejenak. Tutup matamu, lalu hirup napas dalam-dalam lewat hidung dalam 4 detik, tahan 4 detik, dan hembuskan perlahan lewat mulut dalam 4 detik. Lakukan ini 3-4 kali. Katakan pada dirimu sendiri: 'Saya aman di sini saat ini.'",
      isSevere: false
    };
  }

  // 11. Loneliness
  if (
    query.includes("sepi") || 
    query.includes("kesepian") || 
    query.includes("sendiri") || 
    query.includes("tidak punya teman") || 
    query.includes("tidak ada yang peduli")
  ) {
    return {
      message: "Kesepian bisa terasa sangat sunyi dan dingin, tapi ingatlah bahwa kamu selalu memiliki nilai diri. Aku ada di sini untuk mendengarmu.\n\nMasa transisi sekolah terkadang membuat kita merasa terasing. Cobalah secara bertahap ikut kegiatan ekstrakurikuler sekolah yang kamu sukai. Di sana, kamu bisa bertemu dengan orang-orang yang memiliki minat yang sama secara lebih alami. Tetap semangat ya!",
      isSevere: false
    };
  }

  // 12. SMA Transition
  if (
    query.includes("transisi") || 
    query.includes("baru") || 
    query.includes("smp") || 
    query.includes("sma") || 
    query.includes("adaptasi") || 
    query.includes("lingkungan")
  ) {
    return {
      message: "Transisi dari lingkungan SMP ke SMA memang menantang! Suasana belajar baru, guru-guru baru, serta struktur pertemanan baru memang sering memicu cemas.\n\nIngatlah bahwa hampir semua anak kelas X merasakan hal yang sama dengamu saat ini—mereka juga sedang bingung mencari cara menyesuaikan diri. Beri dirimu waktu, tidak perlu terburu-buru akrab dengan semua orang. Mulailah menyapa dari teman sebangkumu dahulu.",
      isSevere: false
    };
  }

  // 13. General Hello
  if (
    query.includes("halo") || 
    query.includes("hai") || 
    query.includes("pagi") || 
    query.includes("siang") || 
    query.includes("sore") || 
    query.includes("malam") || 
    query.includes("assalamualaikum")
  ) {
    return {
      message: `Hai juga! Senang bisa menyapamu kembali. Bagaimana kabarmu hari ini? Silakan ceritakan apa saja yang mengganjal di hatimu. Aku siap mendengarkan. 😊`,
      isSevere: false
    };
  }

  // Default Empathetic Response
  return {
    message: "Terima kasih banyak sudah mau berbagi cerita denganku. Aku mendengarkan setiap detail curhatanmu dengan saksama. Perasaanmu itu valid dan penting.\n\nAdakah hal khusus yang membuatmu merasa demikian hari ini? Ceritakanlah lebih jauh jika kamu merasa nyaman, aku ada di sini untuk menemanimu.",
    isSevere: false
  };
}


// --- 5. AUTHENTICATION (STUDENT) MODALS ---
function showAuthModal() {
  document.getElementById("authModal").style.display = "block";
  document.getElementById("modalOverlay").style.display = "block";
}

function closeAuthModal() {
  document.getElementById("authModal").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
}

function loginAsStudent() {
  const name = document.getElementById("loginStudentName").value.trim();
  if (!name) {
    alert("Harap masukkan nama lengkap Anda!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("ruangTeduh_users")) || [];
  const student = users.find(u => u.name.toLowerCase() === name.toLowerCase());

  if (!student) {
    alert("Nama siswa tidak ditemukan. Silakan daftarkan nama Anda terlebih dahulu di bagian CurhatKuy AI!");
    closeAuthModal();
    scrollToSection("curhat");
    return;
  }

  currentUser = student;
  currentRole = "student";
  localStorage.setItem("ruangTeduh_currentUser", JSON.stringify(student));
  localStorage.setItem("ruangTeduh_currentRole", "student");

  closeAuthModal();
  checkLoginStatus();
  showDashboard();
}

function logout() {
  currentUser = null;
  currentRole = null;
  localStorage.removeItem("ruangTeduh_currentUser");
  localStorage.removeItem("ruangTeduh_currentRole");
  
  checkLoginStatus();
  navigateTo('home');
}

function checkLoginStatus() {
  const loginBtn = document.getElementById("loginBtn");
  const userDashboardBtn = document.getElementById("userDashboardBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  
  const mLoginBtn = document.getElementById("mobileLoginBtn");
  const mDashboardBtn = document.getElementById("mobileUserDashboardBtn");
  const mLogoutBtn = document.getElementById("mobileLogoutBtn");

  const isLoggedIn = currentUser && currentRole;

  if (loginBtn) loginBtn.style.display = isLoggedIn ? "none" : "inline-flex";
  if (userDashboardBtn) userDashboardBtn.style.display = isLoggedIn ? "inline-flex" : "none";
  if (logoutBtn) logoutBtn.style.display = isLoggedIn ? "inline-flex" : "none";

  if (mLoginBtn) mLoginBtn.style.display = isLoggedIn ? "none" : "inline-flex";
  if (mDashboardBtn) mDashboardBtn.style.display = isLoggedIn ? "inline-flex" : "none";
  if (mLogoutBtn) mLogoutBtn.style.display = isLoggedIn ? "inline-flex" : "none";

  if (isLoggedIn) {
    // Check if chatbot is active
    if (currentRole === 'student' && document.getElementById("chatBoxContainer").style.display === "none") {
      toggleChatbotView(true);
    }
  } else {
    toggleChatbotView(false);
  }
}

function showDashboard() {
  if (!currentRole) return;
  
  const homePage = document.getElementById("homePage");
  const studentPage = document.getElementById("studentDashboardPage");
  
  homePage.style.display = "none";
  document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
  
  if (currentRole === 'student') {
    studentPage.classList.add("active");
    
    // Render student profile data
    document.getElementById("dashStudentName").textContent = currentUser.name;
    document.getElementById("dashStudentClass").textContent = `Kelas ${currentUser.class}`;
    document.getElementById("dashStreakCount").textContent = `${currentUser.streak || 0} Hari`;
    
    // Update Badges unlock display
    updateStudentBadgesDisplay();
    
    // Render Canvas Mood Chart
    renderStudentChart();
    
    // Render Student History Table
    populateStudentHistory();
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateStudentBadgesDisplay() {
  const userBadges = currentUser.badges || [];
  document.querySelectorAll(".badge-item").forEach(badge => {
    const bId = badge.id;
    if (userBadges.includes(bId.replace("badge-", "badge-first-checkin") === "badge-first-checkin" ? "badge-first-checkin" : bId)) {
      badge.classList.add("unlocked");
    } else {
      // Direct exact mapping
      const exactMatch = userBadges.some(b => bId.includes(b.replace("badge-", "")));
      if (exactMatch) {
        badge.classList.add("unlocked");
      } else {
        badge.classList.remove("unlocked");
      }
    }
  });
}

// --- 6. STUDENT DASHBOARD HISTORY & UTILITIES ---
function populateStudentHistory() {
  const tableBody = document.getElementById("studentHistoryTableBody");
  if (!tableBody) return;
  
  tableBody.innerHTML = "";
  
  const checkins = JSON.parse(localStorage.getItem("ruangTeduh_checkins")) || [];
  const sCheckins = checkins
    .filter(c => c.studentName === currentUser.name)
    .sort((a,b) => new Date(b.date) - new Date(a.date)); // Latest first
    
  if (sCheckins.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-secondary); padding: 20px;">Belum ada riwayat check-in.</td></tr>`;
    return;
  }
  
  sCheckins.forEach(c => {
    const row = document.createElement("tr");
    const date = new Date(c.date).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    const statusClass = `priority-${c.status.toLowerCase()}`;
    
    row.innerHTML = `
      <td>${date}</td>
      <td><strong>${c.score}</strong>/5.00</td>
      <td><span class="priority-badge ${statusClass}">${c.status}</span></td>
    `;
    tableBody.appendChild(row);
  });
}

// --- 7. ARTICLE SEARCH & FILTERS ---
let currentCategoryFilter = "Semua";

function filterArticles(category) {
  currentCategoryFilter = category;
  
  // Update buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    const text = btn.textContent.trim();
    if (text === category || 
        (category === "Semua" && text === "Semua") || 
        (category === "Adaptasi di SMA" && text === "Adaptasi") || 
        (category === "Manajemen Stres" && text === "Manajemen Stres") || 
        (category === "Produktivitas Belajar" && text === "Belajar")) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  applyArticleFilters();
}

function searchArticles() {
  applyArticleFilters();
}

function applyArticleFilters() {
  const query = document.getElementById("articleSearchInput") ? document.getElementById("articleSearchInput").value.toLowerCase().trim() : "";
  let filtered = MOCK_ARTICLES;
  
  // Category filter
  if (currentCategoryFilter !== "Semua") {
    filtered = filtered.filter(a => a.category === currentCategoryFilter);
  }
  
  // Search query filter
  if (query !== "") {
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(query) || 
      a.desc.toLowerCase().includes(query) || 
      a.category.toLowerCase().includes(query)
    );
  }
  
  renderArticles(filtered);
}

// --- 8. PWA SUPPORT AND INSTALLATION ---
function initPwaSupport() {
  const pwaInstallBtn = document.getElementById("pwaInstallBtn");
  let deferredPrompt;

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker registered successfully!', reg))
        .catch(err => console.log('Service Worker registration failed:', err));
    });
  }

  // Handle installation prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaInstallBtn) pwaInstallBtn.style.display = 'inline-flex';
  });

  if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the PWA install prompt');
          }
          pwaInstallBtn.style.display = 'none';
          deferredPrompt = null;
        });
      }
    });
  }
}
