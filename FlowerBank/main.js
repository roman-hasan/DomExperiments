const sections = {
    dashboard: document.getElementById('dashboardSection'),
    add: document.getElementById('addSection'),
    withdraw:document.getElementById('withdrawSection'),
    history:document.getElementById('historySection')
}

function showSection(name){
    Object.values(sections).forEach((sec)=> sec.classList.add("hidden"))
    sections[name].classList.remove('hidden')
}
showSection("dashboard")

const tabButtons = document.querySelectorAll('.tab')
tabButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        const sectionName = button.id.replace('Tab', '')
        showSection(sectionName)
    })
    
})

document.querySelectorAll('.go').forEach(btn =>{
    btn.addEventListener('click', ()=>{
        const id = btn.id.replace('go', '').toLowerCase()
        showSection(id)
    })
})

const addInput = document.getElementById('addAmount')
const addBtn = document.getElementById('addBtn')
const addError = document.getElementById('addError')
const balanceDisplay = document.getElementById('balanceDisplay')

let balance = 0;

addBtn.addEventListener('click', ()=>{
    const amount = Number(addInput.value)

    if(!amount || amount <= 0){
        addError.textContent = 'Please enter a valid amount'
        return
    }
    addError.textContent = ''
    balance += amount
    balanceDisplay.textContent = `$ ${balance}`
    addInput.value = ''

    addTransaction("Deposit", amount, balance);
})

const withdrawInput = document.getElementById("withdrawAmount");
const withdrawBtn = document.getElementById("withdrawBtn");
const withdrawError = document.getElementById("withdrawError");

withdrawBtn.addEventListener('click', ()=>{
    const amount = Number(withdrawInput.value)

    if(!amount || amount <= 0){
        withdrawError.textContent = 'Enter a valid amount'
        return;
    }

    if(amount > balance){
        withdrawError.textContent = 'Not enough balance'
        return;
    }
    withdrawError.textContent = ''
    balance -= amount
    balanceDisplay.textContent = `$ ${balance}`
    withdrawInput.value = ''
    
    addTransaction("Withdraw", amount, balance);
})


const transactionList = document.getElementById('transactionList')
const historySection = document.getElementById('historySection')

function addTransaction(type, amount, balanceAfter){
    const date = new Date().toLocaleDateString()

    const row = document.createElement('tr')
    row.innerHTML = `
     <td>${date}</td>
     <td>${type}</td>
     <td>${amount}</td>
     <td>${balanceAfter}</td>
     
    `
    transactionList.prepend(row)
}
