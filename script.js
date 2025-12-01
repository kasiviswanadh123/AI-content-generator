async function generateContent() {

    const prompt = document.getElementById("userInput").value;
    const type = document.getElementById("contentType").value;
    const resultBox = document.getElementById("result");
    const copyBtn = document.getElementById("copyBtn");

    if (!prompt.trim()) {
        resultBox.innerText = "Please enter a prompt 😢";
        return;
    }

    resultBox.innerText = "Generating... please wait 💛";
    copyBtn.style.display = "none";

    try {
        const response = await fetch("http://localhost:3000/generate-content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, type }),
        });

        const data = await response.json();

        if (data.output) {
            resultBox.innerText = data.output;
            copyBtn.style.display = "block";
        } else {
            resultBox.innerText = "No output received 😢";
        }

    } catch (err) {
        resultBox.innerText = "Network error: " + err;
    }
}

function copyOutput() {
    const text = document.getElementById("result").innerText;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
}
