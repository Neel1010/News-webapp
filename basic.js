


const topics=document.getElementsByClassName('topic');
for(i of topics)
{
    i.addEventListener('click',(event)=>{
        for(i of topics){
            i.classList.remove('selected');
        }
        let element=event.target;
        element.classList.add('selected')
        fetchdatabycategory(element.getAttribute("value"));
    })
}
const mainURL="https://newsapi.org/v2/top-headlines?country=in&pageSize=100&from=2022-06-01";
const category="&category=";
const apiKey="&apiKey=ac7e1343dcf944f58995772d0127bf57"

function fetchdatabycategory(type)
{
    let url=mainURL+category+type+apiKey;
    fetch(url)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            showNews(data)
        })
}
function fetchdatabyquery(query)
{
    let url=`https://newsapi.org/v2/everything?q=${query}&sortBy=popularity`
    url+=apiKey;
    fetch(url)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            showNews(data)
        })
}
function showNews(jsonData)
{
    let articles=jsonData.articles;
    let newsout=document.getElementsByClassName('newsOutput')[0];
    newsout.innerHTML="";
    for(i of articles)
    {
        let article=i;
        let heading=article.title;
        let content=article.description;
        let image=article.urlToImage;
        let readmore=article.url;
        if(image==null||heading==null||content==null)
        continue;
        newsout.innerHTML+=
        `<div class="item">
        <img src="${image}" alt="">
        <h2>${heading}</h2>
        <div class="content">
            
            <p>
                ${content}
            </p>
           
        </div>
        <a class="readmore" href="${readmore}">Read more</a>

        </div>`

    }
    


}
let searchbtn=document.getElementById('searchbtn');
let input=document.getElementById('search');
searchbtn.addEventListener('click',()=>{
    let query=input.value;
    fetchdatabyquery(query);
})
let categories=['general',"business",'entertainment','health','science','sports','technology'];
for (i in categories)
{
    topics[i].setAttribute("value",categories[i]);
    topics[i].innerText=categories[i].toLocaleUpperCase()
    
}
fetchdatabycategory("general")