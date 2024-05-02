const fileInput = document.getElementById("fileInput");
const baseoutput = document.querySelector(".base64");
const htmloutput = document.querySelector(".html");
const cssoutput = document.querySelector(".css");
const imagePreview = document.querySelector(".image");

fileInput.addEventListener("change",(e) => {
    console.log(e);
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () =>{
        const result=reader.result;
        const cut = ';base64,'
        const string = result.indexOf(cut)+8;
        baseoutput.value= result.slice(string);
        htmloutput.value='<img src=\'' + result + '\'/>';
        cssoutput.value='background-image: url(' + result + ')';
        imagePreview.src=result;
    });
});

const baseCopy = document.querySelector("#baseCopy");
const htmlCopy = document.querySelector("#htmlCopy");
const cssCopy = document.querySelector("#cssCopy");

baseCopy.addEventListener("click",()=>{
    const content = baseoutput.value;    
    navigator.clipboard.writeText(content);
    alert("copied to clipboard!");
})

htmlCopy.addEventListener("click",()=>{
    const content = htmloutput.value;    
    navigator.clipboard.writeText(content);
    alert("copied to clipboard!");
})
cssCopy.addEventListener("click",()=>{
    const content = cssoutput.value;    
    navigator.clipboard.writeText(content);
    alert("copied to clipboard!");
})