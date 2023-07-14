function showPopup() {
    document.getElementById("popup").style.display = "block";
}
function hidePopup() {
    document.getElementById("popup").style.display = "none";
}
function showPopup_() {
    document.getElementById("popup_").style.display = "block";
}
function hidePopup_() {
    document.getElementById("popup_").style.display = "none";
}

function validatePassword() {
    var password1 = document.getElementById("passwordInput1").value;
    var validationMessage = document.getElementById("passwordValidationMessage");
    
    var numberCount = password1.replace(/[^0-9]/g, "").length;
    var specialCharCount = password1.replace(/[^!@#$%^&*()]/g, "").length;
    
    if (password1.length < 8) {
        validationMessage.textContent = "Password must be at least 8 characters long.";
    } else if (numberCount < 4) {
        validationMessage.textContent = "Password must contain at least 4 numbers.";
    } else if (specialCharCount < 1) {
        validationMessage.textContent = "Password must contain at least 1 special character.";
    } else {
        validationMessage.textContent = "";
    }
}

function DoubleCheckPassword() {
    var password1 = document.getElementById("passwordInput1").value;
    var password2 = document.getElementById("passwordInput2").value;

    var DoubleCheckMessage = document.getElementById("passwordDoubleCheckMessage");
    if(password1 != password2){
        DoubleCheckMessage.textContent = "Password is not correct";
        DoubleCheckMessage.style.color = "rgba(255,0,0,0.54)";
    }
    else{
        DoubleCheckMessage.textContent = "Password is correct";
        DoubleCheckMessage.style.color = "rgba(0,135,0,0.54)";
    }
}

function showDropdown() {
    var dropdownContainer = document.getElementById("dropdownContainer");

    if (dropdownContainer.style.display === "block") {
        dropdownContainer.style.display = "none";
    } else {
        var selectElement = document.createElement("select");
        selectElement.classList.add("dropdown-select");

        var locations = ["Bengaluru", "New Delhi", "Mumbai", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad"];

        for (var i = 0; i < locations.length; i++) {
            var optionElement = document.createElement("option");
            optionElement.text = locations[i];
            selectElement.add(optionElement);
        }

        var dropdownContainer = document.getElementById("dropdownContainer");

        while (dropdownContainer.firstChild) {
            dropdownContainer.removeChild(dropdownContainer.firstChild);
        }

        dropdownContainer.appendChild(selectElement);

        dropdownContainer.style.display = "block";
    }
}

function showCompletionPopup() {
    document.getElementById("popup_").style.display = "block";
    // var popupMessage = document.querySelector("#popup_ p");
    // popupMessage.textContent = "Completed!";
    var closeButton = document.querySelector("#popup_ .close");
    closeButton.onclick = hidePopup_;
}

function showFailurePopup(errorMessage) {
    document.getElementById("popup_").style.display = "block";
    var popupMessage = document.querySelector("#popup_ p");
    popupMessage.textContent = errorMessage;
    var closeButton = document.querySelector("#popup_ .close");
    closeButton.onclick = hidePopup_;
}


function join() {
    var memberName = document.getElementsByName("memberName")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password1")[0].value;
    var dropdown = document.getElementById("dropdownContainer");
    var cityName = dropdown.querySelector("select").value;

    var userData = {
        memberName: memberName,
        email: email,
        password: password,
        cityName: cityName
    };

    fetch("http://192.168.201.4:8080/api/members/signup", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            showCompletionPopup();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(data => {
        if (data && data.error) {
            if (data.error === "ExistenceException") {
                showFailurePopup("Email already exists!");
            } else if (data.error === "MethodArgumentNotValidException") {
                showFailurePopup("Invalid field values!");
            } else {
                showFailurePopup("Failed!");
            }
        } else {
            showPopup_();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFailurePopup("Failed!");
    });
}