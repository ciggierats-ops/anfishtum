// 1. Scroll Progress Bar
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
    
    // Back to top button toggle
    const bttBtn = document.getElementById("bttBtn");
    if (winScroll > 300) {
        bttBtn.classList.add("show");
    } else {
        bttBtn.classList.remove("show");
    }
};

// 2. Mobile Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 3. Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    let windowHeight = window.innerHeight;
    let elementVisible = 100;

    reveals.forEach(reveal => {
        let elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger on load

// 4. Tabs Logic
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// 5. Accordion Logic
const acc = document.getElementsByClassName("acc-btn");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let icon = this.querySelector('i');
        
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            icon.className = "fas fa-chevron-down";
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            icon.className = "fas fa-chevron-up";
        } 
    });
}

// 6. Interactive Quiz Data & Logic (Based strictly on PDF)
const quizData = [
    {
        question: "Di manakah limfosit T bermigrasi dan mengalami pertumbuhan lebih lanjut setelah berasal dari sumsum tulang?",
        options: ["Limpa", "Kelenjar Getah Bening", "Timus", "Tonsil"],
        correct: 2,
        explanation: "Benar! Limfosit T bermigrasi ke timus untuk mengalami pertumbuhan lebih lanjut[cite: 7]."
    },
    {
        question: "Mediator inflamasi utama yang dilepaskan oleh sel mast yang menyebabkan vasodilatasi (pelebaran pembuluh darah) adalah...",
        options: ["Lisozim", "Histamin", "Granzim", "IgE"],
        correct: 1,
        explanation: "Tepat! Histamin menyebabkan vasodilatasi lokal sehingga aliran darah meningkat menuju daerah kerusakan[cite: 15]."
    },
    {
        question: "Antibodi manakah yang pertama kali diproduksi dalam respons imun primer dan sangat efektif mengaktifkan kaskade komplemen?",
        options: ["IgG", "IgA", "IgM", "IgE"],
        correct: 2,
        explanation: "Benar sekali! IgM (berbentuk pentamer) adalah antibodi yang pertama kali diproduksi dalam respons imun primer[cite: 25]."
    },
    {
        question: "Sel T manakah yang memiliki penanda CD8+ dan berfungsi menghancurkan sel target yang terinfeksi?",
        options: ["Sel T Helper", "Sel T Memori", "Sel B", "Sel T Sitotoksik"],
        correct: 3,
        explanation: "Benar! Sel T sitotoksik (CTL) memiliki CD8+ dan menghancurkan sel terinfeksi melalui pelepasan perforin dan granzim[cite: 20]."
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-area');
const feedbackEl = document.getElementById('feedback-area');
const nextBtn = document.getElementById('next-btn');
const quizArea = document.getElementById('quiz-area');
const resultArea = document.getElementById('result-area');
const finalScoreEl = document.getElementById('final-score');

function loadQuestion() {
    feedbackEl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    optionsEl.innerHTML = '';
    feedbackEl.className = 'feedback hidden';

    const currentQ = quizData[currentQuestionIndex];
    questionEl.textContent = `${currentQuestionIndex + 1}. ${currentQ.question}`;

    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index, button);
        optionsEl.appendChild(button);
    });
}

function checkAnswer(selectedIndex, buttonClicked) {
    // Disable all buttons
    const buttons = optionsEl.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    const currentQ = quizData[currentQuestionIndex];
    feedbackEl.classList.remove('hidden');

    if (selectedIndex === currentQ.correct) {
        buttonClicked.classList.add('correct');
        feedbackEl.classList.add('correct-bg');
        feedbackEl.innerHTML = `<i class="fas fa-check-circle"></i> ${currentQ.explanation}`;
        score++;
    } else {
        buttonClicked.classList.add('wrong');
        buttons[currentQ.correct].classList.add('correct');
        feedbackEl.classList.add('wrong-bg');
        feedbackEl.innerHTML = `<i class="fas fa-times-circle"></i> Salah. Jawaban yang benar adalah <strong>${currentQ.options[currentQ.correct]}</strong>. <br> ${currentQ.explanation}`;
    }

    nextBtn.classList.remove('hidden');
    
    // Change text for last question
    if(currentQuestionIndex === quizData.length - 1) {
        nextBtn.textContent = "Lihat Hasil";
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizArea.classList.add('hidden');
    resultArea.classList.remove('hidden');
    
    // Calculate final score
    const finalScore = Math.round((score / quizData.length) * 100);
    finalScoreEl.textContent = finalScore;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultArea.classList.add('hidden');
    quizArea.classList.remove('hidden');
    nextBtn.textContent = "Selanjutnya";
    loadQuestion();
}

// Initialize quiz
loadQuestion();