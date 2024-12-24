// Elements
const input01 = document.getElementById('input01');
const btn01 = document.getElementById('btn01');
const userDiv01 = document.getElementById('userDiv01');
const username01 = document.getElementById('username01');
const gitHubUsername01 = document.getElementById('gitHubUsername01');
const follower01 = document.getElementById('follower01');
const following01 = document.getElementById('following01');
const bio01 = document.getElementById('bio01');
const body = document.querySelector('body')



let values;
input01.addEventListener('change', (e) => {
    values = e.target.value;
    console.log(values); 
});


let gitHub01 = async () => {
    if (!values) {
        alert('Please enter a username');
        return;
    }

    try {
        let response = await fetch(`https://api.github.com/users/${values}`);
        let gitHubData = await response.json();

        if (gitHubData.message === "Not Found") {
            alert('User not found');
            return;
        }

        return gitHubData; 
    } catch (error) {
        console.error("Error fetching GitHub data: ", error);
    }
};


btn01.addEventListener('click', async () => {
    let userData = await gitHub01();
    if (!userData) return; 

  
    userDiv01.innerHTML = `<img class="h-40 w-40  rounded-full" src="${userData.avatar_url}" alt="Avatar" />`;

    username01.innerText = userData.name || 'No Name Available';
    gitHubUsername01.innerText = userData.login;
    follower01.innerText = `Followers: ${userData.followers}`;
    following01.innerText = `Following: ${userData.following}`;
    bio01.innerText = userData.bio || 'No Bio Available';
});
