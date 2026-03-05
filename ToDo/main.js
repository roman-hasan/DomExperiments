const input = document.getElementById('todoInput')
const addBtn = document.getElementById('addBtn')
const todoList = document.getElementById('todoList')



const addTask = () =>{

const text = input.value.trim()
    
    if(text !== ''){

     const existingTasks = todoList.querySelectorAll('li span')

     for(let task of existingTasks){
        if(task.textContent.toLowerCase() === text.toLowerCase()){
            alert('Task already exists!')
            input.value = ''
            return
        }
     }

    const span = document.createElement('span')
    span.textContent = text

    const li = document.createElement('li')
    li.className = 'list'
    li.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.05)'
    li.appendChild(span)
    
    todoList.appendChild(li)

    const edit = document.createElement('button')
    edit.className = 'editBtn hidden'
    edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'

    const delBtn = document.createElement('button')
    delBtn.className = 'delBtn'
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'

    const pending = document.createElement('button')
    pending.className = 'pending'
    pending.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i>'

    let editDelete = document.createElement('div')
    editDelete.className = 'editDeleteContainer'
    editDelete.append(pending,edit, delBtn)
    
    li.appendChild(editDelete)

    delBtn.addEventListener('click', ()=>{
        li.remove()
    })
     
    edit.addEventListener('click', ()=>{
        const isEditMode = edit.querySelector('i').classList.contains('fa-pen-to-square')
        if(isEditMode){
            edit.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>'
            edit.style.color = '#ee9f5aff'
            const editInput = document.createElement('input')
            editInput.className = 'editInput'
            editInput.type = 'text'
            editInput.value = span.textContent
            li.replaceChild(editInput, span)
            editInput.focus()

            editInput.addEventListener('keypress', (e)=>{
                if(e.key === 'Enter') saveEdit()
            })
            
        }
        
        else{
           saveEdit()
        }

        function saveEdit() {
            const editInput = li.querySelector('.editInput');
            if (!editInput) return;

            const updateText = editInput.value.trim();
            if (updateText === '') {
                alert('Task cannot be empty!');
                editInput.focus();
                return;
            }

            span.textContent = updateText;
            li.replaceChild(span, editInput);
            edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            edit.style.color = '#2196F3';
        }


    })
     pending.addEventListener('click', ()=>{

        if(span.classList.contains('completed')){
            span.classList.remove('completed')
            pending.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i>'
            pending.style.color = '#000'
        }

        else{
            span.classList.add('completed')
            pending.innerHTML = '<i class="fa-solid fa-square-check"></i>'
            pending.style.color = '#59AC77'
        }

    })

    } else{
        alert('Please write a task!')
    }

    input.value = ''

}

addBtn.addEventListener('click', addTask)


input.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        addTask();
    }
});



