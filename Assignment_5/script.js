// for login and signup purpose only this javascript is created
// script.js
const loginSignupForm = document.getElementById("loginSignupForm");

// Function to handle sign in
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check if the user exists and the password is correct
  if (validateUser(username, password)) {
    alert("Login successful. Welcome, " + username + "!");
    // You can redirect to another page or perform additional actions here
    window.location.href = 'index.html';
  } else {
    alert("Invalid username or password. Please try again.");
  }

  // Clear the form
  loginSignupForm.reset();
}

// Function to handle sign up
function signup() {
  const newUsername = document.getElementById("username").value;
  const newPassword = document.getElementById("password").value;
  const newEmail = document.getElementById("email").value;
  const newFullName = document.getElementById("fullName").value;

  // Clear previous error messages
  clearErrorMessages();

  // Validate that all fields are filled
  if (!newUsername || !newPassword || !newEmail || !newFullName) {
    displayErrorMessage("All fields are required. Please fill in all the information.", "usernameError");
    return;
  }

  // Check if the user already exists
  if (userExists(newUsername)) {
    displayErrorMessage("Username already exists. Choose a different username.", "usernameError");
    return;
  }

  // Validate email format
  if (!isValidEmail(newEmail)) {
    displayErrorMessage("Invalid email format. Please enter a valid email address.", "emailError");
    return;
  }

  // Validate password format
  if (!isValidPassword(newPassword)) {
    displayErrorMessage("Invalid password format. Password should be at least 8 characters long, containing at least one number, one uppercase, and one lowercase letter.", "passwordError");
    return;
  }

  // Save the new user data to JSON file
  const userData = {
    username: newUsername,
    password: newPassword,
    email: newEmail,
    fullName: newFullName
    // Add more fields as needed
  };
  saveUserData(userData);

  // Redirect to login.html after successful sign up
  window.location.href = 'login.html';
}

function displayErrorMessage(message, errorElementId) {
  const errorElement = document.getElementById(errorElementId);
  errorElement.textContent = message;
  errorElement.style.display = "block";
  errorElement.style.color = "red"; // Show the error message
}

// Function to clear error messages
function clearErrorMessages() {
  document.getElementById("usernameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate password format (at least 8 characters, one number, one uppercase, and one lowercase letter)
function isValidPassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
}

// Function to check if a user already exists
function userExists(username) {
  const userData = getUsersData();
  return userData.some(user => user.username === username);
}

// Function to validate user credentials
function validateUser(username, password) {
  const userData = getUsersData();
  const user = userData.find(user => user.username === username);

  // Check if the user exists and the password is correct
  return user && user.password === password;
}

// Function to save user data to JSON file
function saveUserData(userData) {
  const existingData = getUsersData();
  existingData.push(userData);

  // Save to JSON file (you can use AJAX, fetch, or other methods)
  // For simplicity, we'll just log it to the console here
  console.log(existingData);

  // Save the updated user data to localStorage
  localStorage.setItem('user_data', JSON.stringify(existingData));
}

// Function to retrieve user data from JSON file
function getUsersData() {
  // In a real-world scenario, you would fetch data from a server or database
  // For simplicity, we'll use localStorage as a static storage
  const jsonData = localStorage.getItem('user_data') || '[]';
  return JSON.parse(jsonData);
}