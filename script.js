let members = [];
const MIN_PASSWORD_LENGTH = 8;
const MIN_PHONE_LENGTH = 10;

const form = document.getElementById("regform");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const genderInput = document.querySelector("#gender");
const dobInput = document.querySelector("#dob");
const countryInput = document.querySelector("#country");
const phoneInput = document.querySelector("#phone");
const bioInput = document.querySelector("#bio");
const fields = form ? form.querySelectorAll("input, select, textarea") : [];
const successMsg = document.getElementById("successMsg");
const memberList = document.getElementById("memberList");
const RegisteredMember = document.getElementById("membercount");
const darkModeBtn = document.getElementById("theme");

console.log("Form element:", form);
console.log("Form fields:", fields);
console.log("Success Msg element:", successMsg);
console.log("Member list element:", memberList);
console.log("Registered member element:", RegisteredMember);
console.log("Theme button element:", darkModeBtn);

// Event listeners to clear error messages on input
nameInput.addEventListener("input", function () {
  error[0].textContent = "";
});

emailInput.addEventListener("input", function () {
  error[1].textContent = "";
});

passwordInput.addEventListener("input", function () {
  error[2].textContent = "";
});

confirmPasswordInput.addEventListener("input", function () {
  error[3].textContent = "";
});

genderInput.addEventListener("input", function () {
  error[4].textContent = "";
});

dobInput.addEventListener("input", function () {
  error[5].textContent = "";
});

countryInput.addEventListener("input", function () {
  error[6].textContent = "";
});

phoneInput.addEventListener("input", function () {
  error[7].textContent = "";
});

if (bioInput) {
  bioInput.addEventListener("input", function () {
    error[8].textContent = "";

});
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const error = document.querySelectorAll(".error");
    error.forEach((err) => (err.textContent = ""));
    
    let isValid = true;

    const name = nameInput.value.trim();
    if (name === "") {
      error[0].textContent = "Full name is required";
      isValid = false;
    } else if (name.length < 3) {
      error[0].textContent = "Name must be at least 3 characters";
      isValid = false;
    }

    const email = emailInput.value.trim();
    if (email === "") {
      error[0].textContent = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error[0].textContent = "Email is invalid";
      isValid = false;
    }

    const password = passwordInput.value.trim();
    if (password === "") {
      error[1].textContent = "Password is required";
      isValid = false;
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      error[1].textContent = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
      isValid = false;
    }

    const confirmPassword = confirmPasswordInput.value.trim();
    if (confirmPassword === "") {
      error[2].textContent = "Confirm Password is required";
      isValid = false;
    } else if (confirmPassword !== password) {
      error[2].textContent = "Passwords do not match";
      isValid = false;
    }

    const gender = genderInput.value;
    if (gender === "") {
      error[3].textContent = "Please select a gender";
      isValid = false;
    }

    const dob = dobInput.value;
    if (dob === "") {
      error[4].textContent = "Date of Birth is required";
      isValid = false;
    }

    const country = countryInput.value;
    if (country === "") {
      error[5].textContent = "Country is required";
      isValid = false;
    }

    const bio = bioInput ? bioInput.value.trim() : "";
    if (bioInput && bioInput.value.length > 300) {
      error[6].textContent = "Bio cannot exceed 300 characters";
      isValid = false;
    }

    const phone = phoneInput.value.trim();
    if (phone === "") {
      error[7].textContent = "Phone number is required";
      isValid = false;
    } else if (phone.length < MIN_PHONE_LENGTH) {
      error[7].textContent = `Phone number must be at least ${MIN_PHONE_LENGTH} characters long`;
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const member = {
      name,
      email,
      password,
      gender,
      dob,
      country,
      bio,
      phone,
    };
    const registerdmember = {name, email, gender, dob, country, bio, phone};
    members.push(member);

    const emptyNote = document.getElementById("emptyNote");
    if (emptyNote && members.length > 0) {
      emptyNote.style.display = "none";
    }

    const li = document.createElement("li");
    const memberInfo = document.createElement("p");

    memberInfo.textContent = `Full Name: ${member.name}, Email: ${member.email}, Gender: ${member.gender}, Date of Birth: ${member.dob}, Country: ${member.country}, Phone: ${member.phone}, Bio: ${member.bio}`;
    li.textContent = `${member.name} (${member.email}) - ${member.gender}, ${member.dob}, ${member.country}, ${member.phone}, ${member.bio}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.type = "button";
    removeBtn.className = "removeBtn";
    removeBtn.addEventListener("click", function () {
      li.remove();
      const registeredMember = document.getElementById("membercount");
      if (registeredMember) {
        registeredMember.textContent = String(members.length);
      }

      if (emptyNote && members.length === 0) {
        emptyNote.style.display = "block";
      }
    });

    li.appendChild(memberInfo);
    li.appendChild(removeBtn);
    memberList.appendChild(li);

    const registeredmember = document.getElementById("membercount");
    if (registeredmember) {
      registeredmember.textContent = String(members.length);
    }

    if (successMsg) {
      successMsg.textContent = "Member added successfully!";
      successMsg.classList.remove("hidden");

      setTimeout(() => {
        successMsg.classList.add("hidden");
      }, 3000);
    }

    form.reset();
  });
}

// Dark mode toggle
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark= document.body.classList.contains("dark");
  darkModeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
});