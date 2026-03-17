const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res)=> res.json())
    .then((json)=>displayData(json.data))
}

const displayData = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = '';
        for (let lesson of lessons){
             const btnDiv = document.createElement("div");
             btnDiv.innerHTML = `
             <button class = 'btn btn-outline btn-primary'>
             <i class = 'fa-solid fa-book-open'></i>Level - ${lesson.level_no}
             </button> 
             `;
        levelContainer.append(btnDiv); 
        }
}
loadData();