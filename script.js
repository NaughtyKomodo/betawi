const questions = [
    {
        text: "Kalau lo lagi naksir seseorang, cara lo deketinnya gimana?",
        options: ["Langsung hajar!", "Diem-diem kasih kode!", "Jajanin dia", "Tungguin sampe sadar"]
    },
    {
        text: "Apa yang paling lo cari dari pasangan?",
        options: ["Seru dan rame", "Manis dan setia", "Peduli dan perhatian", "Sederhana tapi nyaman"]
    },
    {
        text: "Kalo lagi jalan sama doi, tempat favorit lo ke mana?",
        options: ["Tempat rame", "Taman kota", "Warung kaki lima", "Di rumah bae"]
    },
    {
        text: "Kado hari kasih sayang yang cocok buat lo itu apa?",
        options: ["Tiket konser", "Surat cinta", "Makanan enak", "Boneka atau barang DIY"]
    },
    {
        text: "Kalau lo jadi makanan Betawi, yang bikin lo khas itu apa?",
        options: ["Gurih, tidak terlalu pedas", "Manisnya pas", "Bumbunya kuat", "Sederhana tapi bikin kangen"]
    },
    {
        text: "Lo lebih suka suasana yang gimana?",
        options: ["Rame dan seru", "Nyaman dan damai", "Hangat dan akrab", "Tenang dan santai"]
    },
    {
        text: "Kalau harus pilih satu, lo lebih suka ngemil atau makan berat?",
        options: ["Nyemil terus!", "Makan yang manis", "Makanan berat", "Yang penting enak"]
    }
];

const results = [
    { text: "Lo itu jodohnya Kerak Telor! Lo orang yang rame dan unik, kayak kerak telor yang selalu menarik perhatian!", page: "result-kerak-telor.html" },
    { text: "Lo itu jodohnya Dodol Betawi! Manis dan setia, lo cocok banget sama Dodol Betawi yang selalu bikin kangen.", page: "result-dodol.html" },
    { text: "Lo itu jodohnya Soto Betawi! Lo penuh perhatian dan selalu hangat, kayak Soto Betawi yang selalu jadi comfort food.", page: "result-soto.html" },
    { text: "Lo itu jodohnya Nasi Uduk! Sederhana tapi ngangenin, lo cocok banget sama Nasi Uduk yang selalu pas di segala suasana.", page: "result-nasi-uduk.html" }
];

let currentQuestion = 0;
let scores = [0, 0, 0, 0];

function addMessage(speaker, text) {
    const chatbox = document.getElementById("chatbox");
    const message = document.createElement("div");
    message.classList.add("message", speaker === "bot" ? "bot" : "user");
    message.textContent = text;
    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function showTypingIndicator() {
    document.getElementById("typing-indicator").style.display = "block";
}

function hideTypingIndicator() {
    document.getElementById("typing-indicator").style.display = "none";
}

function showChoices(choices) {
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
    choicesContainer.style.display = "flex";

    choices.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("choice-button");
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        choicesContainer.appendChild(button);
    });
}

function selectAnswer(choice) {
    scores[choice]++;
    addMessage("user", questions[currentQuestion].options[choice]);
    document.getElementById("choices").style.display = "none";
    currentQuestion++;

    if (currentQuestion < questions.length) {
        setTimeout(() => {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                loadQuestion();
            }, 1500);
        }, 1000);
    } else {
        setTimeout(() => {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                showResult();
            }, 1500);
        }, 1000);
    }
}

function loadQuestion() {
    addMessage("bot", questions[currentQuestion].text);
    setTimeout(() => {
        showChoices(questions[currentQuestion].options);
    }, 1000);
}

function showResult() {
    const maxScoreIndex = scores.indexOf(Math.max(...scores));
    window.location.href = results[maxScoreIndex].page;
}

document.addEventListener("DOMContentLoaded", () => {
    addMessage("bot", "Halo! Yuk mulai kuis ini!");
    setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            loadQuestion();
        }, 1500);
    }, 1000);
});
