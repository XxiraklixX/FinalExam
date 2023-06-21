// იუსერების წამოღება
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    const userBoxes = document.querySelector('.user-boxes');
    users.slice(0, 6).forEach(user => {
      const userBox = document.createElement('div');
      userBox.classList.add('user-box');
      userBox.innerHTML = `
        <h3>${user.name}</h3>
        <p class="user-info">ID: ${user.id}</p>
        <p class="user-info">Email: ${user.email}</p>
        <p class="user-info">Phone: ${user.phone}</p>
        <button class="select-user-button" data-user-id="${user.id}">Select User</button>
      `;
      userBoxes.appendChild(userBox);
    });

    const selectUserButtons = document.querySelectorAll('.select-user-button');
    selectUserButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedUserId = button.getAttribute('data-user-id');
        document.getElementById('user-id').value = selectedUserId;
      });
    });
  });



// ფოტოების წამოღება
fetch('https://jsonplaceholder.typicode.com/photos')
  .then(response => response.json())
  .then(photos => {
    const photoBoxes = document.querySelector('.photo-boxes');
    photos.slice(0, 6).forEach(photo => {
      const photoBox = document.createElement('div');
      photoBox.classList.add('photo-box');
      photoBox.innerHTML = `
        <img src="${photo.url}" alt="Photo">
      `;
      photoBoxes.appendChild(photoBox);
    });
  });


document.getElementById('add-post-form').addEventListener('submit', event => {
    event.preventDefault();
    const userId = document.getElementById('user-id').value;
    const title = document.getElementById('post-title').value;
    const body = document.getElementById('post-body').value;
  
    // გაგზავნა
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: parseInt(userId),
        title: title,
        body: body
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data);
        // გასუფთავება
        document.getElementById('user-id').value = '';
        document.getElementById('post-title').value = '';
        document.getElementById('post-body').value = '';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  