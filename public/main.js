var trash = document.getElementsByClassName("fa-trash-o");
var edit = document.getElementsByClassName("fa-pen-to-square")
var submit = document.getElementsByClassName("submitEdit")
var checkBox = document.getElementsByClassName("checkBox")
Array.from(edit).forEach(function(editButton) {

  editButton.addEventListener('click', function(){
  
  Array.from(editButton.closest('form').querySelectorAll('.editItem')).forEach(element => element.classList.toggle('showInput'))
  Array.from(editButton.closest('form').querySelectorAll('.submitEdit')).forEach(element => element.classList.toggle('showInput'))
  
})
})

Array.from(submit).forEach((submitButton) => { 
  submitButton.addEventListener('click', function(event){
    event.preventDefault()
    
    fetch('taskupdated', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'task': submitButton.closest('li').querySelector('.item').innerText,
        'newTask': submitButton.closest('li').querySelector(".editItem").value,
        
      })
      
    })
    .then(response => {
      if (response.ok) return response.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload(true); 
    });
})})

Array.from(checkBox).forEach((box) => { 
  box.addEventListener('click', function(event){
    // event.preventDefault()
    console.log(box.closest('li').querySelector('.checkBox').checked)
    fetch('checked', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'task': box.closest('li').querySelector('.item').innerText,
        'newTask': box.closest('li').querySelector(".editItem").value,
        'checked': box.closest('li').querySelector('.checkBox').checked
      })
      
    })
    .then(response => {
      if (response.ok) return response.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload(true); 
    });
})})

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log('Trash is working!')
        const task = element.closest('li').querySelector('.item').innerText
        fetch('todolist', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'task': task
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
