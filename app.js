const search=document.getElementById("search");
const nameInput =document.getElementById("githubname");
const clearLastUsers=document.getElementById("clear-last-users");
const lastUsers=document.getElementById("last-users");
const gitHub = new Github();
const ui = new UI();
eventListeners();
function eventListeners(){
search.addEventListener("click",getData) //submit olduğunda forma getDatayı calıstır
clearLastUsers.addEventListener("click",clearAllSearched);
document.addEventListener("DOMContentLoaded",getAllSearched);//Sayfa yuklendiğinde tüm DOMcontentleri yuklendiğinde calıstır
}
function getData(e){
    let username= nameInput.value.trim();
    if (username === ""){
        alert("Please enter a username");
    }
    else{
        gitHub.getGithubData(username)
        .then(response =>{
             if(response.user.message === "Not Found"){
                ui.showError("This user not found.")
        }
            else{
                ui.addSearchedToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepos(response.repo);
        }
    })
        .catch(err=> ui.showError(err));
    }
    ui.clearInput();   
    
    
    e.preventDefault();//sayfanın yenilenmeini engellemek için
}
function clearAllSearched(){
    if(confirm("Are You Sure ?")){
        Storage.clearAllSearchedUsersFromStorage(); //remove storage
        ui.clearAllSearchedFromUI();
    }
}
function getAllSearched(){
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user =>{
        result += `<li class="list-group-item">${user}</li>`;
    })
    lastUsers.innerHTML = result;
}