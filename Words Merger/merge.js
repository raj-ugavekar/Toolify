function display(){
    let selectedSeparator = '';
    let selectedWrapper1 = '';
    let selectedWrapper2 = '';
    main(selectedSeparator,selectedWrapper1,selectedWrapper2);
  // const mergeBtn = document.querySelector('.mergeBtn');
    const options = document.querySelector('.options');


    options.addEventListener('click',function(e){
        if (e.target.classList.contains('nothing')) {
            selectedSeparator = '';
        }
        else if (e.target.classList.contains('space')) {
            selectedSeparator = ' ';
        }
        else if (e.target.classList.contains('minus')) {
            selectedSeparator = '-';
        }
        else if (e.target.classList.contains('plus')) {
            selectedSeparator = '+';
        }
        else if (e.target.classList.contains('custom_separator')) {
            let customSep = document.getElementById('custom_sep').value;
            selectedSeparator = customSep;
        }
        else{
            return;
        }
    });


    options.addEventListener('click',function(e){
        if (e.target.classList.contains('nothing_wrap')) {
            selectedWrapper1 = '';
            selectedWrapper2 = '';
        }
        else if (e.target.classList.contains('double_wrap')) {
            selectedWrapper1 = '"';
            selectedWrapper2 = '"';
        }
        else if (e.target.classList.contains('sqr_bracket_wrap')) {
            selectedWrapper1 = '[';
            selectedWrapper2 = ']';
        }
        else if (e.target.classList.contains('curly_bracket_wrap')) {
            selectedWrapper1 = '{';
            selectedWrapper2 = '}';
        }
        else if (e.target.classList.contains('custom_wrapper')) {
            let customWrap = document.getElementById('custom_wrap').value.trim().split('');
            selectedWrapper1 = customWrap[0];
            selectedWrapper2 = customWrap[1];
        }
        else{
            return;
        }

        main(selectedSeparator,selectedWrapper1,selectedWrapper2);
    });

    // const mergeBtn = document.getElementById('mergebutton');
    options.addEventListener('click', function () {
        main(selectedSeparator,selectedWrapper1,selectedWrapper2);
    });
}

function main(separator,wrapper1,wrapper2){
    let textArea1 = document.getElementById('text-area1').value.trim().split('\n');
    let textArea2 = document.getElementById('text-area2').value.trim().split('\n');
    let textArea3 = document.getElementById('text-area3').value.trim().split('\n');

    let array = [];
    for (let i=0;i<textArea1.length;i++){
        for (let j=0;j<textArea2.length;j++){
            for (let k=0;k<textArea3.length;k++){
                array.push(wrapper1+textArea1[i]+separator+textArea2[j]+separator+textArea3[k]+wrapper2);
            }
        }
    }
    let displayBox = document.getElementById('output');
    displayBox.value = array.join('\n');
    
    let combo = document.getElementById('combo');
    combo.textContent = array.length;
}

const extra = document.querySelector("#extra");
const options = document.querySelector(".options");

extra.addEventListener("click", ()=>{
    options.classList.toggle('options');
})

const clear= document.querySelector("#clearbutton");

clear.addEventListener("click",()=>{
    document.getElementById('text-area1').value='';
    document.getElementById('text-area2').value='';
    document.getElementById('text-area3').value='';
    document.getElementById('output').value='';
})