// Element seçimi 

const form = document.querySelector("#todo-form");

const todoInput = document.querySelector("#todo");
 
const todoList = document.querySelector(".list-group");

const firstCardbody = document.querySelectorAll(".card-body")[0];

const secondCardBody = document.querySelectorAll(".card-body")[1];

const filter = document.querySelector("#filter");

const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // Tüm eventlistener'lar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filtertodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        // Arayüzden Todoları temizleme
        // todoList.innerHTML = ""; // Yavaş
        
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        
        localStorage.removeItem("todos"); // LocalStorage'den silme
    
    } 
}

function filtertodos(e){ // filtreleme
    const filtervalue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filtervalue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }


    });
    
}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo Başarı ile Silindi"); 

    }
}
function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1); // Arrayden değeri silebiliriz
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
        
    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim(); // yeni todo olarak submit yaptığımız todoinput'un value'sunu atar.
    // trim() fonksiyonu baş ve sondaki boşlukları siler
    if(newTodo === ""){
        showAlert("danger","Lütfen bir todo girin");
       /* <div class="alert alert-danger" role="alert">
                        Dikkat! Boş görev olamaz!
         </div>
         */
        
        


    }
    else{
        addTodoToUI(newTodo); //UI = arayüz
        addTodoToStorage(newTodo);
    }
    

    e.preventDefault();
}
function getTodosFromStorage(){ // Storagedan Todoları alma
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}


function showAlert(type,message){
    const uyari = document.createElement("div");
    uyari.className = `alert alert-${type}`;
    uyari.textContent = message;

    firstCardbody.appendChild(uyari);

    

}

function addTodoToUI(newTodo){ // String değerini list item olarak UI'ya ekleyecek
    /*
        <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

       </li>
    */
    //ListItem oluşturma
    const listItem = document.createElement("li");

    //Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className ="delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";
    
    //Text Node ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);


    todoList.appendChild(listItem); // ul'yi yukarıda seçmiştik.

    todoInput.value = ""; // en son todoinput'un içini boşaltır.

}






