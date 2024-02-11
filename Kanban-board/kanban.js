const addBtn = document.querySelector(".add-btn");
const modelCont = document.querySelector(".model-cont");

let addTicketFlag= false;
addBtn.addEventListener("click", () => {
    addTicketFlag=!addTicketFlag;
    if(addTicketFlag===true) {
        modelCont.style.display="flex";
    }else{
        modelCont.style.display="none";
    }
});