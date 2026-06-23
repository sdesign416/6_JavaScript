
// 객체 가져오기
const todoInput = document.getElementById("todoInput")
const addBtn = document.getElementById("addBtn")
const todoList = document.getElementById("todoList")
const remainingCount =document.getElementById("remainingCount")
const totalCount =  document.getElementById("totalCount")

// 할 일 배열에 저장 : 기본설정은 할 일이 없기 때문에 빈 배열
// 상태를 메모리에만 저장함(새로고침하면 사라짐)
const todos = []


// [화면 그리기 함수]
function render(){
    // 우선 todoList안을 비워줌(li 비움)
    todoList.innerHTML = ""

    // 배열이 비어있지 않다면 forEach(반복)돌리고 배열에서 todo, index받아옴
    // [{text:"아침식사", done=false}, {text:"운동하기", done=false}, ...]
    todos.forEach((todo, index) => {
        // 1) li 생성
        const li = document.createElement("li") // <li></li>
        if (todo.done) li.classList.add("done") // <li class="done"></li>

        // 2) div.left 생성
        const left = document.createElement("div") // <div></div>
        left.className = "left" // <div class="left"></div>

        // 3) checkbox 생성
        const checkbox = document.createElement("input") // <input>
        checkbox.type = "checkbox" // <input type="checkbox">
        checkbox.checked =  todo.done // <input type="checkbox" checked="false">
        // 체크하면  스타일 적용되도록
        checkbox.addEventListener("change", () => {
            todo.done = checkbox.checked
            render()
        })

        // 4) 삭제버튼 생성
        const delBtn = document.createElement("button") // <button></button>
        delBtn.type = "button" // <button type="button"></button>
        delBtn.className = "del" // <button type="button" class="del"></button>
        delBtn.textContent = "삭제" // <button type="button" class="del">삭제</button>
        delBtn.addEventListener("click", () => {
            todos.splice(index, 1) // 삭제 후
            render() // 다시 그림
        })

        // 5) span.todo-text 생성
        const text = document.createElement("span") // <span></span>
        text.className =  "todo-text" // <span class="todo-text"></span>
        text.textContent =  todo.text // <span class="todo-text">아침식사</span>

        // ::최종추가
        left.appendChild(checkbox) // div에 checkbox추가 (할일 완료)
        left.appendChild(text) // div에 text추가 (할일 텍스트)
        left.appendChild(delBtn) // div에 삭제버튼 추가 (할 일 삭제)
        li.appendChild(left) // li에 div추가
        todoList.appendChild(li) // ul에 위에서 만든 li 추가
    })

    // 카운트 함수 호출
    updateCounts()
}

// [남은 항목, 전체 갯수 수정 함수]
function updateCounts(){
    // // 전체 개수
    // totalCount.textContent = todos.length
    // // 남은 항목
    // remainingCount.textContent = todos.filter(todo => todo.done == false).length

    // // 수업 코드 : 재사용 가능한 코드
    // const total = todos.length
    // const remaining = todos.filter((t) => !t.done).length
    // remainingCount.textContent = String(remaining)
    // totalCount.textContent = String(total)

    // 내가 정리
    const total = todos.length
    const remaining = todos.filter(todo => !todo.done).length

    totalCount.textContent = total
    remainingCount.textContent = remaining
}

// [할 일 추가 함수]
function addTodo(){
    const text = todoInput.value.trim() // trim() : 공백 없앰
    if(!text) return // 혹시 텍스트가 존재하지 않으면 걸러냄

    // 배열에 객체로 집어넣음(리터럴)
    // {text:"아침식사", done=false} : text로 쓰면 key와 변수가 모두 text임, 두번 쓸 필요  없음
    todos.push({text, done: false})
    todoInput.value = ""
    todoInput.focus()

    // 화면 그리기
    render()
}

// 콜백으로 등록: 버튼 누르면 addTodo 함수 작동
addBtn.addEventListener("click", addTodo)

todoInput.addEventListener("keydown", (e) => {
    if(e.key == "Enter") addTodo() // key가 엔터키일때 addTodo 함수 호출
})


// 그냥도 실행되도록 설정
render()