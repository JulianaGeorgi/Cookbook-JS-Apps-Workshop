document.querySelector('form').addEventListener('submit', onCreate);

async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        img: formData.get('img'),
        ingredients: formData.get('ingredients').trim().split('\n'),
        steps: formData.get('steps').trim().split('\n')
    };

    const token = sessionStorage.getItem('authToken');
    if (!token) {
        alert('Please log in!');
        window.location = 'login.html';
        return;
    }

    try {

        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(data)
        });

        const data = await response.json();

        if (response.status == 200) {
            window.location = 'index.html';
        }

    } catch (error) {
        console.log(error.message);
    }

}