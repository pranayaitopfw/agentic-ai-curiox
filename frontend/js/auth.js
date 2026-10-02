// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const loginMessage = document.getElementById("loginMessage");

        try {

            const response = await fetch(`${API}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            console.log("Login response:", data);

            loginMessage.textContent =
                data.message || "Login failed";

            if (response.ok) {

                loginMessage.className = "success";

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                if (data.user.role === "department") {
                    window.location.href = "department.html";
                } else {
                    window.location.href = "dashboard.html";
                }

            } else {

                loginMessage.className = "error";

            }

        } catch (error) {

            console.error("Login connection error:", error);

            loginMessage.textContent =
                "Server connection failed";

            loginMessage.className = "error";
        }

    });

}
