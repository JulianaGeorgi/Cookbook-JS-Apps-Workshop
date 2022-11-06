document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData.entries());

    try {

        if (!email) {
            throw new Error('Email is required!');
        }
        if (!password) {
            throw new Error('Password is required!');
        }

        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
            window.location = 'index.html';
        } else {
            throw new Error(data.message);
        }

    }
    catch (error) {
        console.log(error.message);
    }
}