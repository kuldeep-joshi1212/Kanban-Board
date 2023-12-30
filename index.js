const uid = new ShortUniqueId({ length: 5 });

let addFlag = false;
let removeFlag = false;
const modalPriorityColors = ["lightpink", "lightgreen", "lightblue", "black"];
let colorLabel = modalPriorityColors[0];
let lockOpen = "fa-lock";
let lockClose = "fa-lock-open";

let modalCnt = document.querySelector(".modal-cnt");
let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let mainCnt = document.querySelector(".main-cnt");
let textArea = document.querySelector(".textarea-cnt");
let priorityColorList = document.querySelectorAll(".priority-color");
let lockList = document.querySelectorAll(".ticket-lock");

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
  let colorIndex;
  priorityColorList.forEach((colorElem, index) => {
    if (colorElem.classList.contains("active")) {
      colorIndex = index;
    }
  });
  return modalPriorityColors[colorIndex];
};

// adding ticket
// generating ticket
let createTicket = (modalPriority, id, task) => {
  let ticketCnt = document.createElement("div");
  ticketCnt.classList.add("ticket-cnt");

  ticketCnt.innerHTML = `
  <div class="ticket-color"></div>
  <div class="ticket-id">${id}</div>
  <div class="task-name" >${task}</div>
  <div class="ticket-lock">
    <i class="fa-solid fa-lock"></i>
  </div>`;
  let label = ticketCnt.querySelector(".ticket-color");
  label.style.backgroundColor = modalPriority;
  handleColor(ticketCnt);
  handleLock(ticketCnt);
  return ticketCnt;
};
//adding
modalCnt.addEventListener("keydown", (e) => {
  let task = textArea.value;
  if (e.code == "ShiftRight") {
    colorLabel = getPriorityColor();
    console.log(colorLabel);
    let ticketCnt = createTicket(colorLabel, uid.rnd(), task); //add params
    mainCnt.appendChild(ticketCnt);
    textArea.value = "";
    addFlag = false;
    modalCnt.style.display = "none";
  }
});

// locking mechnism
let handleLock = (ticket) => {
  let ticketLockElem = ticket.querySelector(".ticket-lock");
  let ticketLockIcon = ticketLockElem.children[0];
  let ticketTaskArea = ticket.querySelector(".task-name");
  ticketLockIcon.addEventListener("click", () => {
    if (ticketLockIcon.classList.contains(lockClose)) {
      ticketLockIcon.classList.remove(lockClose);
      ticketLockIcon.classList.add(lockOpen);
      ticketTaskArea.setAttribute("contentEditable", "false");
    } else {
      ticketLockIcon.classList.remove(lockOpen);
      ticketLockIcon.classList.add(lockClose);
      ticketTaskArea.setAttribute("contentEditable", "true");
    }
  });
};

//Change priority label
let handleColor = (ticket) => {
  let ticketColor = ticket.children[0];
  ticketColor.addEventListener("click", () => {
    let currentColor = ticketColor.style.backgroundColor;
    let currentIndex = modalPriorityColors.indexOf(currentColor);
    console.log(currentIndex);
    currentIndex += 1;
    if (currentIndex < modalPriorityColors.length) {
      ticketColor.style.backgroundColor = modalPriorityColors[currentIndex];
    }
  });
};
