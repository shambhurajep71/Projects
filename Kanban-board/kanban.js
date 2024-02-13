const addBtn = document.querySelector(".add-btn");
const modelCont = document.querySelector(".model-cont");
const mainTicketCont = document.querySelector(".main-ticket-cont");
const createTicketBtn =document.querySelector(".create-btn");
const textArea = document.querySelector(".textarea-cont");
let addTicketFlag= false;
addBtn.addEventListener("click", () => {
    addTicketFlag=!addTicketFlag;
    if(addTicketFlag===true) {
        modelCont.style.display="flex";
    }else{
        modelCont.style.display="none";
    }
});

// crating ticket Dynamically
createTicketBtn.addEventListener("click", (event) => {
    createTicket(textArea.value);
    modelCont.style.display="none";
    textArea.value="";
});

const createTicket =(ticketInfo) =>{
   let ticketCont= document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
   ticketCont.innerHTML=` <div class="ticket-color"> </div>
   <div class="ticket-id">${shortid()/**? crating a random id */}</div>
   <div class="task-area">${ticketInfo}</div>
   <div class="lock-btn"><i class="fa-solid fa-lock"></i></div>`
   mainTicketCont.appendChild(ticketCont);
}



