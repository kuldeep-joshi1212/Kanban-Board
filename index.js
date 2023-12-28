let addFlag = false;
let removeFlag = false;
let modalPriorityColors = ["lightpink", "lightgreen", "lightblue", "black"];
colorLabel = modalPriorityColors[0];
const uid = new ShortUniqueId({ length: 5 });

let modalCnt = document.querySelector(".modal-cnt");
let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let mainCnt = document.querySelector(".main-cnt");
let textArea = document.querySelector(".textarea-cnt");
let priorityColorList = document.querySelectorAll(".priority-color");

// console.log(textArea);
// add dialog box event listener
addBtn.addEventListener("click", (e) => {
  addFlag = !addFlag;
  if (addFlag) {
    modalCnt.style.display = "flex";
  } else {
    modalCnt.style.display = "none";
  }
});
//remove event listner
removeBtn.addEventListener("click", () => {
  removeFlag = !removeFlag;
  if (removeFlag) {
    alert("You are entering delete mode");
    removeBtn.style.color = "red";
    let ticketCnt = document.querySelectorAll(".ticket-cnt");
    ticketCnt.forEach((ticket) => {
      ticket.addEventListener("click", () => {
        if (removeFlag) {
          ticket.remove();
        }
      });
    });
  } else {
    removeBtn.style.color = "white";
  }
});
//remove tickets from ui

//set active to one color
priorityColorList.forEach((colorElem) => {
  colorElem.addEventListener("click", () => {
    priorityColorList.forEach((priorityColorElem) => {
      priorityColorElem.classList.remove("active");
    });
    colorElem.classList.add("active");
  });
});
//getting priority color
let getPriorityColor = () => {
  priorityColorList.forEach((colorElem, index) => {
    if (colorElem.classList.contains("active")) {
      colorLabel = modalPriorityColors[index];
    }
  });
};

// adding ticket
// generating ticket
let createTicket = (modalPriority, task) => {
  let ticketCnt = document.createElement("div");
  ticketCnt.classList.add("ticket-cnt");
  let ticketColor = document.createElement("div");
  ticketColor.style.backgroundColor = modalPriority;
  ticketColor.classList.add("ticket-color");
  let ticketId = document.createElement("div");
  ticketId.innerHTML = uid.rnd();
  ticketId.classList.add("ticket-id");
  let taskName = document.createElement("div");
  taskName.innerHTML = task;
  taskName.classList.add("task-name");
  ticketCnt.appendChild(ticketColor);
  ticketCnt.appendChild(ticketId);
  ticketCnt.appendChild(taskName);
  return ticketCnt;
};
//adding
modalCnt.addEventListener("keydown", (e) => {
  let task = textArea.value;
  if (e.code == "ShiftRight") {
    getPriorityColor();
    let ticketCnt = createTicket(colorLabel, task); //add params
    mainCnt.appendChild(ticketCnt);
    textArea.value = "";
    addFlag = false;
    modalCnt.style.display = "none";
  }
});
