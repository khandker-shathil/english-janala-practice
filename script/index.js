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
             <button id='lesson-btn-${lesson.level_no}' onClick='loadLevelWord(${lesson.level_no})' class = 'btn btn-outline btn-primary button-lesson'>
             <i class = 'fa-solid fa-book-open'></i>Level - ${lesson.level_no}
             </button> 
             `;
        levelContainer.append(btnDiv); 
        }
}
loadData();

const removeActiveBtn = () => {
    const removeActive = document.querySelectorAll('.button-lesson');
    removeActive.forEach((btn)=>btn.classList.remove('btn-active'))
}

const loadLevelWord = (level) => {
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    fetch(url)
    .then((res)=>res.json())
    .then((json)=>{
        const clickBtn = document.getElementById(`lesson-btn-${level}`);
        removeActiveBtn();
        clickBtn.classList.add('btn-active')
        displayLevelWord(json.data)});
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center font-bangla  col-span-full rounded-xl py-10 space-y-6">
            <img class='mx-auto' src='./assets/alert-error.png'> 
            <p class="text-xl text-gray-400 font-medium">কোন Lesson নেই</p>
            <p class="font-bold text-4xl">পরের Lesson Select করুন</p>
        </div>
        `;
    }

    words.forEach(word =>{
        const div = document.createElement('div');
        // console.log(word)
        div.innerHTML=`
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 min-h-full">
                <h2 class="font-bold text-2xl">${word.word ? word.word :'শব্দ পাওয়া যাই নি'}</h2>
                <p class="font-semibold">Meaning/Pronounciation</p>
                <div class="text-2xl font-medium font-bangla">${word.meaning?word.meaning:'শব্দ পাওয়া যাই নি'} / ${word.pronunciation?word.pronunciation:'শব্দ পাওয়া যাই নি'
}</div>
                <div class="flex justify-between items-center">
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;
        wordContainer.append(div);
    })
}