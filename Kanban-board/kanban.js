const addBtn = document.querySelector(".add-btn");
const modelCont = document.querySelector(".model-cont");
const mainTicketCont = document.querySelector(".main-ticket-cont");
const createTicketBtn =document.querySelector(".create-btn");
const textArea = document.querySelector(".textarea-cont");
const allStatusColor = document.querySelectorAll(".status-color");
const removeBtn = document.querySelector(".remove-btn");
let ticketStatusColor ="black"

// clearing the currently selected status
 const cleanUpSelectedStatus = () =>{
    allStatusColor.forEach((currentEle) => {
        currentEle.classList.remove("active-ticket-color");
    })
 }
    
let addTicketFlag= false;
addBtn.addEventListener("click", () => {
    addTicketFlag=!addTicketFlag;
    if(addTicketFlag===true) {
        cleanUpSelectedStatus();
        modelCont.style.display="flex";
    }else{
        modelCont.style.display="none";
    }
});

// crating ticket Dynamically
createTicketBtn.addEventListener("click", (event) => {
    cleanUpSelectedStatus();
    createTicket(textArea.value);
    modelCont.style.display="none";
    textArea.value="";
});

//setting the status-color of the dynamically created tickets

allStatusColor.forEach((statusColor) => {
    statusColor.addEventListener("click", (event) => {
        cleanUpSelectedStatus();
        ticketStatusColor= event.target.classList[0];
        statusColor.classList.add("active-ticket-color");
    })
});

const createTicket =(ticketInfo) =>{
   let ticketCont= document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
   ticketCont.innerHTML=` <div class="${ ticketStatusColor} ticket-color"> </div>
   <div class="ticket-id">${shortid()/**? crating a random id */}</div>
   <div class="task-area">${ticketInfo}</div>
   <div class="lock-btn"><i class="fa-solid fa-lock"></i></div>`
   mainTicketCont.appendChild(ticketCont);
   removeThisTicket(ticketCont);
}

// remove functionality
// activating the delete button:
 let removeTicketFlag= false;
removeBtn.addEventListener("click", ()=>{
    removeTicketFlag=!removeTicketFlag;
    if(removeTicketFlag===true){
        window.alert("Delete Button is activeted");
        removeBtn.style.color="red";
    }else{
        window.alert("Delete Button is Deactivated");
        removeBtn.style.color="white";
    }
    
})

// removing the ticket after clicking on a particular ticket

const removeThisTicket = (ticketCont)=> {
    ticketCont.addEventListener("click", () =>{
        if(removeTicketFlag===true){
            ticketCont.remove();
        }
   });
}
