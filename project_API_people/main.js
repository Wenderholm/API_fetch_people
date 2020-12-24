const getUsers = (e) => {
    e.preventDefault();

    const usersNumber = document.querySelector('[name = "users-number"]').value;
    const usersGender = document.querySelector('[name = "gender"]').value;
    const url = `https://randomuser.me/api/?results=${usersNumber}&gender=${usersGender === "both" ? "male,female" : usersGender}`;
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw Error("To nie jest odpowedź 200")
            } else {
                return response.json() //Fetch API = json() z body wyodrębnia json i parsuje na obiekt
            }
        })
        .then(json => showUsers(json.results))
        //wykonuje gdy rozstrzygnięcie - odrzucona
        .catch(err => console.log(err))
}

const showUsers = (users) => {
    const resultArea = document.querySelector('.user-list');
    resultArea.textContent = "";
    users.forEach(user => {
        const item = document.createElement('div');
        item.className = 'user';
        item.innerHTML = `
    <div class="user_name">${user.name.title.toUpperCase()} ${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}</div>
    <img class="user_image" src=${user.picture.medium}>
    `
        resultArea.appendChild(item);
    })
}
document.querySelector('.generator').addEventListener('submit', getUsers);
