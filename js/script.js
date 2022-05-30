const container = document.querySelector(".container");
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();


container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
        e.target.classList.toggle("selected");
        calculateTotal();
    }
});

select.addEventListener("change", function () {
    calculateTotal();
});

function calculateTotal() {
    let SelectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatArr = [];
    const seatArr = [];

    SelectedSeats.forEach(function (seat) {
        selectedSeatArr.push(seat);
    });
    seats.forEach(function (seat) {
        seatArr.push(seat);
    });

     let selectedSeatIndexs=selectedSeatArr.map(function(seat){
         return seatArr.indexOf(seat);
        });

    let SelectedSeatCount = SelectedSeats.length;
    count.innerText = SelectedSeatCount;
    amount.innerText = SelectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage(){
const SelectedSeats=JSON.parse(localStorage.getItem('SelectedSeats'));

if(SelectedSeats !=null && SelectedSeats.length >0){
    seats.forEach(function(seat,index){
        if(SelectedSeats.indexOf(index)> -1){
            seat.classList.add('selected');
        }
    })
} 

const selectedMovieIndex=JSON.parse(localStorage.getItem('selectedMovieIndex'));

if(selectedMovieIndex != null){
    select.selectedIndex=selectedMovieIndex;
}
}

function saveToLocalStorage(indexs){
    localStorage.setItem('SelectedSeats',JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}