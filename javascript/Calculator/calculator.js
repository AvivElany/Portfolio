const result = document.querySelector('.display input');
const btns = document.querySelectorAll('.btn');
const evalBtn = document.querySelector('.eval-btn');
const clrBtn = document.querySelector('.ac-btn');
const delBtn = document.querySelector('.delete-btn');

const getValue = (action) => {
  let btnText = action.target.innerHTML;
  if(btnText == '×'){
      btnText = '*'    
  }
  if(btnText == '÷'){
      btnText = '/';   
  }
  result.value += btnText;
}

evalBtn.addEventListener('click',()=>{

  try{
    result.value = eval(result.value);   
  }catch(err){
    result.value = 'Error';    
  }    
})

clrBtn.addEventListener('click',()=>{
  result.value = '';     
});

delBtn.addEventListener('click',()=>{
  result.value = result.value.substr(0,result.value.length - 1);
})

for(let i=0;i<btns.length;i++){
  btns[i].addEventListener('click',getValue)  
}
