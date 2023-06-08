const menuBtn = document.querySelector('.menu');
const options = document.querySelectorAll('.option');
const fields = document.querySelectorAll('.field');
const labels = document.querySelectorAll('.label');
const submit = document.getElementById('submit');
const form = document.getElementById('form');
const email = document.getElementById('email');
const fullname = document.getElementById('name');
const phonenumber = document.getElementById('number');
const checkbox = document.getElementById('checkbox');

const url = "http://localhost:9095/Form";

form.onsubmit = e => { e.preventDefault(); } // prevent page reload

// button animation and later expanded menu
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});
// end of menu


// field change color
fields.forEach(field => {
    field.addEventListener('change', () => {
        if (!isEmpty(field))
            field.classList.add('active');
        else {
            field.classList.remove('active');
            field.value = "";
        }
    });
});
// end of field

// retrieve labels
let labelValues = [];
labels.forEach(label => {
    let value = label.textContent;
    labelValues.push(value);

});
// end of labels

// option selected color change
options.forEach(option => {
    let selected = false;
    option.addEventListener('click', () => {
        if (!selected) {
            option.classList.add('selected');
            selected = true;
        }
        else {
            option.classList.remove('selected');
            selected = false;
        }
    })
})
// end of option

// validate email with regex
function ValidateEmail(input) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.value.trim().match(regex)) {
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        return false;
    }
}
// end of email validation

// check if field is empty
function isEmpty(input) {
    if (input.value.trim().length == 0)
        return true
    else return false
}
//end of empty checking

// phone number validation 
function ValidateNumber(input) {
    input = input.value.replace(/\s/g, "");
    const regex = /(961(03|3|70|71|76|78|79|81)|(03|70|71)|76|78|79|81)\d{6}/gm;
    if (input.match(regex))
        return true
    else {
        alert("Invalid phone number");
        return false;
    }
}
// end of phone number validation

// check if checkbox is checked
function isChecked(input) {
    if (input.checked)
        return true;
    else {
        alert("You are a robot! Beep beep, boop boop.");
        return false;
    }
}
// end of checking if the checkbox is checked (!! warning stroke !!)

// submit input to local storage
submit.addEventListener('click', () => {

    if (ValidateEmail(email) && !isEmpty(fullname) && isChecked(checkbox) && ValidateNumber(phonenumber)) {

        let services_ = document.querySelectorAll('.selected');
        let arr_services = [];

        services_.forEach(service => {
            arr_services.push(service.textContent);
        })

        let credentials = {
            name: document.getElementById('name').value.trim(),
            organization: document.getElementById('organization').value.trim(),
            email: document.getElementById('email').value.trim(),
            number: document.getElementById('number').value.trim(),
            services: arr_services,
            project: document.getElementById('project').value.trim(),
            details: document.getElementById('details').value.trim()
        };
        localStorage.setItem("myCredentials", JSON.stringify(credentials));
        console.log(credentials)
    }
});
// end of submitting