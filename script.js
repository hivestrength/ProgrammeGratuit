document.getElementById("subscribeForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");

  if (!name || !email) {
    message.textContent = "Veuillez remplir tous les champs.";
    message.style.color = "red";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    message.textContent = "Adresse email invalide.";
    message.style.color = "red";
    return;
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyXATQQwmfBDQ0wqjIFfJHNhwf9JtHXLu6cdKJOKmaQmxUGh7lVBKDuzwu34sKNLtNb0w/exec", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ name, email })
    });

    const result = await response.json();
    if (result.result === "success") {
      message.textContent = "✅ Inscription réussie ! Redirection en cours...";
      message.style.color = "lime";
      setTimeout(() => {
        window.location.href = "https://docs.google.com/spreadsheets/d/1jdNHHfwt9xcQX8ieAnfXIOFeX9q6s9unamM_Pbi-FPY/edit?usp=drivesdk";
      }, 1500);
    } else {
      message.textContent = "Erreur lors de l’envoi. Réessayez.";
      message.style.color = "red";
    }
  } catch (error) {
    message.textContent = "Erreur réseau. Réessayez.";
    message.style.color = "red";
  }
});
