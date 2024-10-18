
const questions = document.querySelectorAll('.accordion-link')

questions.forEach(question => {
    question.addEventListener('click', e => {
        const parent = question.parentElement;
        
        if(parent.classList.contains('open')) {
            parent.classList.remove('open')

            return
        }

        document.querySelectorAll('.accordion-item').forEach(answer => {
            answer.classList.remove('open')
        })
        
        parent.classList.add('open')

    })
    
})



// darkmode-toggle

const darkmodeSwitch = document.querySelector('#darkmode-switch')
const hasDarkmode = localStorage.getItem('darkmode')

if(hasDarkmode == null) {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enableDarkMode()
    } else {
        disableDarkMode ()
    }
} else if (hasDarkmode ==='on') {
    enableDarkMode()
} else if (hasDarkmode === 'off') {
    disableDarkMode()
}


darkmodeSwitch.addEventListener('change', () => {
    if(darkmodeSwitch.checked) {
        enableDarkMode()
        localStorage.setItem('darkmode', 'on')
    } else {
        disableDarkMode()
        localStorage.setItem('darkmode', 'off')

    }
})


function enableDarkMode() {
    darkmodeSwitch.checked = true
    document.documentElement.classList.add('dark')
}

function disableDarkMode() {
    darkmodeSwitch.checked = false
    document.documentElement.classList.remove('dark')
}



// Validating consult-appointment

const consultForm = document.querySelector('#consult-form');
const fullName = document.querySelector('#fullName');
const email = document.querySelector('#appointment-email');
const specialist = document.querySelector('#specialist')

consultForm.addEventListener('submit', e => {
    e.preventDefault()

    if(!validateForm(consultForm)) {
        return
    }

    const appointment = {
        fullName: fullName.value,
        email: email.value,
        specialist: specialist.value
    }

    fullName.value = '';
    email.value = '';
    specialist.value = '';

    console.log(appointment)
})


const validateForm = (form) => {
    const errors = []

    for(let i = 0; i < form.length; i++) {
        const input = form[i]
        input.parentElement.classList.remove('error')
        if(!input.required) continue

        errors.push(validationSwitch(input))
}

if(errors.includes(false)) return false

return true

}


const validationSwitch = (input) => {
    switch(input.type) {
        case 'text': return validateText(input)
        case 'email': return validateEmail(input)
        default: break;
    }
}



const setError = (input, message) => {
    const parent = input.parentElement;
    parent.classList.add('error')

    const errorElement = parent.querySelector('.invalid-input')
    errorElement.innerText = message
}


const validateText = (input) => {
    if(input.value.trim() === '') {
        setError(input, 'This field can\'t be empty')
        return false
    } 
    else if (input.value.trim().length < 2) {
        setError(input, 'This must be atleast 2 chars long')
        return false
    }

    return true
}


const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(input.value.trim().length <= 0) {
        setError(input, 'You need to enter an email address')
        return false
    }
    else if (!emailRegex.test(input.value)) {
        setError(input, 'You need to enter a valid email address')
        return false
    }
}


// Validating subscribe email

// const subForm = document.querySelector('#emailtosub')
// const subEmail = document.querySelector('#email')


// subForm.addEventListener('submit', e => {
//     e.preventDefault()

//     if(subEmail == '') {
//         return
//     }

//     if(!validateEmail(subForm)) {
//         return
//     }

//     const subbedEmail = subEmail.value;

//     console.log(subbedEmail)
//     return true

// return true
// subEmail.value = '';
// console.log('subEmail')

// })