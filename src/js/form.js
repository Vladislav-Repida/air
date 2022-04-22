/* Dates */

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
Date.prototype.removeDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
}

let currentDate = new Date();

const form = document.querySelector(".custom-form-flights");

const inputDeparture = form.querySelector(".departure-input");
const inputReturn = form.querySelector(".return-input");

const dateDeparture = form.querySelector(".date-departure");
const dateReturn = form.querySelector(".date-return");

inputDeparture.value = currentDate;
inputReturn.value = currentDate.addDays(1);


RenderDate();

const blockDeparture = form.querySelector(".departure");
const blockReturn = form.querySelector(".return");



form.addEventListener("click", (e)=>{
    if(e.target.closest(".prev-btn-departure")){
        if(new Date(inputDeparture.value) >= new Date()){
            inputDeparture.value = new Date(inputDeparture.value).removeDays(1);
            RenderDate();
        }
    }
    else if(e.target.closest(".next-btn-departure")){
        inputDeparture.value = new Date(inputDeparture.value).addDays(1);
        if (inputDeparture.value == inputReturn.value){
            inputReturn.value = new Date(inputReturn.value).addDays(1);
        }
        RenderDate();
    }
    else if(e.target.closest(".prev-btn-return")){
        if (new Date(inputReturn.value).removeDays(1) > new Date(inputDeparture.value)){
            inputReturn.value = new Date(inputReturn.value).removeDays(1);
            RenderDate();
        }
    }
    else if(e.target.closest(".next-btn-return")){
        inputReturn.value = new Date(inputReturn.value).addDays(1);
        RenderDate();
    }
});

function ResetDates(){
    inputDeparture.value = currentDate;
    inputReturn.value = currentDate.addDays(1);
    RenderDate();
}

function RenderDate(){
    dateDeparture.innerText = formatDate(new Date(inputDeparture.value));
    dateReturn.innerText = formatDate(new Date(inputReturn.value));
}

function formatDate(d){
	const day = d.getDay(); // 0 - 6
    const dayTitle = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

	const date = d.getDate().toString().padStart(2, "0");

	const month = d.getMonth(); // 0 - 11
    const monthTitle = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	return `${dayTitle[day]} ${date} ${monthTitle[month]}`;
}


/* Locations */

const btnRevers = form.querySelector(".btn-revers");
let locations = form.querySelectorAll(".select-wraper-location");

const formContent = form.querySelector(".form-content");

btnRevers.addEventListener("click", ReversLocation);

function ReversLocation(){
    const title = locations[0].querySelector(".title").innerText;
    locations[0].querySelector(".title").innerText = locations[1].querySelector(".title").innerText;
    locations[1].querySelector(".title").innerText = title;

    const typeInput = locations[0].querySelector("input").getAttribute('name');
    const classInput = locations[0].querySelector("input").getAttribute('class');
    locations[0].querySelector("input").setAttribute('name', locations[1].querySelector("input").getAttribute('name'));
    locations[0].querySelector("input").setAttribute('class', locations[1].querySelector("input").getAttribute('class'))
    locations[1].querySelector("input").setAttribute('name', typeInput);
    locations[1].querySelector("input").setAttribute('class', classInput);

    const html1 = `<div class="select-wraper-location">${locations[0].innerHTML}</div>`;
    const html2 = `<div class="select-wraper-location">${locations[1].innerHTML}</div>`;;

    locations[0].remove();
    locations[1].remove();
    
    btnRevers.insertAdjacentHTML("afterend",html1);
    btnRevers.insertAdjacentHTML("beforeBegin", html2);
    locations = form.querySelectorAll(".select-wraper-location");
    
    locations[0].querySelector("input").value = locations[0].querySelector(".full-location").innerText;
    locations[1].querySelector("input").value = locations[1].querySelector(".full-location").innerText;
}

locations.forEach(location => {
    const selectLocation = location.querySelector(".select-location");
    const locationMenu = location.querySelector(".drop-menu");
    const items = locationMenu.querySelectorAll("li");
    selectLocation.querySelector(".location").innerText = items[0].querySelector(".location").innerText;
    selectLocation.querySelector(".full-location").innerText = items[0].querySelector(".full-location").innerText;

    location.querySelector("input").value = items[0].querySelector(".full-location").innerText;
});

form.addEventListener("click", (e)=>{
    if(e.target.closest(".select-wraper-location")){
        const location = e.target.closest(".select-wraper-location");

        const selectLocation = location.querySelector(".select-location");
        const locationMenu = location.querySelector(".drop-menu");

        let log;
        if(location.classList.contains("active")){
            log = true;
        }
        removeLocationActive();
        if(log){
            location.classList.add("active");
            locationMenu.classList.add("active");
        }
        

        if(e.target.closest(".select-location")){
            locationMenu.classList.toggle("active");
            location.classList.toggle("active");

        }
        if(e.target.closest("li")){
            const item = e.target.closest("li");
            selectLocation.querySelector(".location").innerText = item.querySelector(".location").innerText;
            selectLocation.querySelector(".full-location").innerText = item.querySelector(".full-location").innerText;
            location.querySelector("input").value = item.querySelector(".full-location").innerText;
            locationMenu.classList.remove("active");
            location.classList.remove("active");
        }
    }
});


function removeLocationActive(){
    const _locations = document.querySelectorAll(".select-wraper-location");
    _locations.forEach(_location => {
        _location.querySelector(".drop-menu").classList.remove('active');
        _location.classList.remove('active');
    });
}

/* Settings */

const headerForm = form.querySelector(".header-form");
const itemsHeader = headerForm.querySelectorAll(".item-header-form");

itemsHeader.forEach(item => {
    const dropMenu = item.querySelector(".drop-menu");
    const input = item.querySelector("input");
    const dropMenuItem = dropMenu.querySelector("li");

    input.value = dropMenuItem.dataset.value;
});

itemsHeader.forEach(item => {
    const dropMenu = item.querySelector(".drop-menu");
    const dropMenuItems = dropMenu.querySelectorAll("li");
    const settings = item.querySelector(".settings");
    const input = item.querySelector("input");

    dropMenuItems.forEach(dropMenuItem => {
        dropMenuItem.addEventListener("click", ()=>{
            dropMenuItems.forEach(dropMenuItem2 => {
                dropMenuItem2.classList.remove("active");
            });

            dropMenuItem.classList.add("active");
            input.value = dropMenuItem.dataset.value;
            dropMenu.classList.remove("active");
            settings.classList.remove("active");
        });
    });
});


function RemoveActive(){
    itemsHeader.forEach(item => {
        item.querySelector(".settings").classList.remove("active");
        item.querySelector(".drop-menu").classList.remove("active");
    });
}


/* documentEventAll */

document.addEventListener("click", (e)=>{
    // Locations
    if(!e.target.closest(".select-wraper-location")){
        locations.forEach(location => {
            location.querySelector(".drop-menu").classList.remove("active");
        });
    }
    
    //Settings
    if(e.target.closest(".settings")){
        e.target.closest(".item-header-form").querySelector(".drop-menu").classList.toggle("active");
        e.target.closest(".item-header-form").querySelector(".settings").classList.toggle("active");
    }
    else if(!e.target.closest(".item-header-form")){
        RemoveActive();
    }
});