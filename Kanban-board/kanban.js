const addBtn = document.querySelector(".add-btn");
const modelCont = document.querySelector(".model-cont");
const mainTicketCont = document.querySelector(".main-ticket-cont");
const createTicketBtn =document.querySelector(".create-btn");
const textArea = document.querySelector(".textarea-cont");
const allStatusColor = document.querySelectorAll(".status-color");
const removeBtn = document.querySelector(".remove-btn");
const toolboxColors = document.querySelectorAll(".color");
let ticketStatusColor ="black"
let removeTicketFlag= false;

 let ticketArr=[];
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
    createTicket(ticketStatusColor,textArea.value,"");
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

const createTicket =(ticketStatusColor,ticketInfo,ticketUniqueId) =>{
    const ticketId= ticketUniqueId || shortid();
  const ticketCont= document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
   ticketCont.innerHTML=
   ` <div class="${ ticketStatusColor} ticket-color">
    </div>
   <div class="ticket-id">${ticketId/**? crating a random id */}
   </div>
   <div class="task-area">
   ${ticketInfo}</div>
   <div class="lock-btn">
   <i class="fa-solid fa-lock"></i>
   </div>`
   mainTicketCont.appendChild(ticketCont);
   if(ticketUniqueId.length<=0){
    ticketArr.push({ticketId,ticketInfo,ticketStatusColor});
   }
   removeThisTicket(ticketCont);
   handleEdit(ticketCont);
   updateStatusColor(ticketCont);
}

// remove functionality
// activating the delete button:

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
//Edit functionality

const handleEdit = (ticket)=> {
    const ticketLockElem = ticket.querySelector(".lock-btn");
    const lockBtnIcon = ticketLockElem.children[0];
    const editableTextArea = ticket.querySelector(".task-area");

    lockBtnIcon.addEventListener("click", () =>{
        if(lockBtnIcon.classList.contains("fa-lock")){
            lockBtnIcon.classList.remove("fa-lock");
            lockBtnIcon.classList.add("fa-lock-open");
            editableTextArea.setAttribute("contenteditable", "true");
        }else{
            lockBtnIcon.classList.remove("fa-lock-open");
            lockBtnIcon.classList.add("fa-lock");
            editableTextArea.setAttribute("contenteditable", "false");
        }
    });
};

// updating stauus color of created ticket
 let colors= ["lightpink", "lightgreen", "lightblue", "black"];

const updateStatusColor = (ticket) => {
    const colorBand  = ticket.querySelector(".ticket-color");
    colorBand.addEventListener("click", (event) => {
        let currentColor = "";
         for( let idx=0; idx<colorBand.classList.length; idx++){
             if(colorBand.classList[idx] !== "ticket-color"){
            currentColor=colorBand.classList[idx];
            }
         }
         let currentColorIndex= colors.indexOf(currentColor);
         let nextColor =colors[(currentColorIndex+1)%colors.length];
            colorBand.classList.remove(currentColor);
            colorBand.classList.add(nextColor);
    })

}

// filter functionalty

  // adding event listner for every color on toolboz
  for(let i=0; i<toolboxColors.length;i++) {
    toolboxColors[i].addEventListener("click", () => {
        // get the selected filter color
        let selectedToolbocColor= toolboxColors[i].classList[0];
     // filter the tickets based on the selected color
            const filteredTickets = ticketArr.filter( (ticket)=> {
            return selectedToolbocColor=== ticket.ticketStatusColor;
     })
     // remove all the tickets
     const allTicktes = document.querySelectorAll(".ticket-cont");
     for(let i=0; i<allTicktes.length; i++) {
         allTicktes[i].remove();
     }
     // recreate the filtered tickets
     filteredTickets.forEach( (ticket) => {
        createTicket(ticket.ticketStatusColor,ticket.ticketInfo,ticket.ticketId);
    })
    })
  }
// creating a array to store all the tickets
