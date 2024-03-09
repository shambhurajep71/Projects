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
 // we need to get the ticket from local storage after the refersh
 

 // create ticket
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
   // saving the created ticket to local storeage
   localStorage.setItem("tasks",JSON.stringify(ticketArr));

   removeThisTicket(ticketCont,ticketId);
   handleEdit(ticketCont,ticketId);
   updateStatusColor(ticketCont,ticketId);
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

const removeThisTicket = (ticketCont, ticketId)=> {
    ticketCont.addEventListener("click", () =>{
        if(removeTicketFlag===true){
            ticketCont.remove();
            const ticketgettingDeleted = getTicket(ticketId);
            ticketArr.splice(ticketgettingDeleted,1);
            //delting the ticket from  the local storage which user deleted
            localStorage.setItem("tasks",JSON.stringify(ticketArr));
            console.log("after deleting the ticket"+ ticketArr);
        }
   });
}
//Edit functionality

const handleEdit = (ticket,ticketId)=> {
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
            // saving the edited content
            const ticketTobeUpdted = ticketArr.findIndex(
                 (ticketInArr) => ticketInArr.ticketId === ticketId
            );
            ticketArr[ticketTobeUpdted].ticketInfo = editableTextArea.innerText;
            // saving the edited data in the local storage fro the particular ticket
            localStorage.setItem("tasks",JSON.stringify(ticketArr));
        }
    });
};

// updating stauus color of created ticket
 let colors= ["lightpink", "lightgreen", "lightblue", "black"];

const updateStatusColor = (ticket,ticketId) => {
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
            //saving the status color when user decide to change status original to next color
            const ticketTobeUpdted = ticketArr.findIndex(
                (ticketInArr) => ticketInArr.ticketId === ticketId
            );
           ticketArr[ticketTobeUpdted].ticketStatusColor = nextColor;
           // saving the updated status color in the local storage  
           localStorage.setItem("tasks",JSON.stringify(ticketArr));
    })

}
 if(localStorage.getItem("tasks")){
    ticketArr=JSON.parse(localStorage.getItem("tasks"));
    ticketArr.forEach((ticket) => {
    createTicket(ticket.ticketStatusColor,ticket.ticketInfo,ticket.ticketId);
    })
    console.log(ticketArr);
 }
  
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
    ticketStatusColor ="black"
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

    //removing tickets from screen which are present o9n scree after filter
    toolboxColors[i].addEventListener("dblclick", () => {
        const filteredTicketsOnScreen = document.querySelectorAll(".ticket-cont");
        for(let i=0; i<filteredTicketsOnScreen.length; i++) {
            filteredTicketsOnScreen[i].remove();
        }
        // creating tickets that present in ticketArr
        ticketArr.forEach( (ticket) => {
            createTicket(ticket.ticketStatusColor,ticket.ticketInfo,ticket.ticketId);
        })
    })
  }

  // we need to delete tickets from ticketArr that has beed deleted by the user 

  // to do that we need to get the ticket that need to be deleted from arra on the basis of unique ticket id
   const getTicket = (ticketId) => {
    let ticketNeedToDelete = {};
    for(let i=0 ; i<ticketArr.length ; i++) {
        if(ticketArr[i].ticketId === ticketId) {
            ticketNeedToDelete = ticketArr[i];
            break;
        }
    }
    return ticketNeedToDelete;
   }