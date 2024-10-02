

function getTimeString(time){
    const hour = parseInt(time/ 3600);
    let remainingSecond = time % 3600 ;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60 ;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago `;
}


// calculating second to time per hour minite second 




const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.log(error));
}


const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch((error) => console.log(error));
}


const loadCategoryVideos = (id) => {
  
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        const activeBtn = document.getElementById(`btn-${id}`); 
        activeBtn.classList.add("active");
        displayVideos(data.category)})
    .catch((error) => console.log(error));
    
}




const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos');

videosContainer.innerHTML = "" ;




if(videos.length == 0){
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `<div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center ">
  

<img src="/images/icon.png" />
  <h1 class="text-center text-2xl text-gray-400 font-bold ">No Content Here, In This Category </h1>
</div>
`;
return; 
    
}

else{
    videosContainer.classList.add('grid');
}




    videos.forEach( (video) => {
        const card = document.createElement('div');
        card.classList = "card card-compact "
        card.innerHTML = `
        
    <figure class="h-[200px] relative ">


    <img
      src=${video.thumbnail}

      alt="Shoes" class="h-full w-full object-cover " />


      ${video.others.posted_date ?.length == 0 ? "" : ` <span class="absolute right-8 bottom-8 bg-black rounded p-1 text-white text-xs "> ${getTimeString(video.others.posted_date )}  </span> `}
      


    </figure>

  <div class="px-0 py-1 flex gap-2  ">
    
  <div>
    <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" />
  </div>

  <div>

  <h2> ${video.title}</h2>
  <div class=" flex  gap-2">
  <p class=" text-gray-400 ">
  ${video.authors[0].profile_name}</p>


  ${video.authors[0].verified === true ? '<img class="w-5 object-cover " src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" />': ""}

  </div>
  

  </div>

  </div>
        
        `
        videosContainer.appendChild(card);
    } )
}






const displayCategories = (categories) => {
const categoryContainer = document.getElementById('categories');
categories.forEach( (item) => {

    const buttonContainer = document.createElement('div');
    
    buttonContainer.innerHTML = `
    
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="category_btn btn"> ${item.category}  </button>
    
    `
     categoryContainer.appendChild(buttonContainer);
} )


}



loadCategories();

loadVideos()


