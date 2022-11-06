document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password, rePass } = Object.fromEntries(formData.entries());
    
    try {

        if(!email || !password){
            throw new Error('All fields must be filled');
        }

        if(password !== rePass){
            throw new Error('Passwords don\'t match!');
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application\json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        
        if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
            window.location = 'index.html';
        } else {
            throw new Error(data.message);
        }

    } catch (error) {
        console.log(error.message);
    }
}