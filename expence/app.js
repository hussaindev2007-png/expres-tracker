
let text = document.getElementById("text");
let amount = document.getElementById("amount");
let addbtn = document.getElementById("add-btn");
let list = document.getElementById("list");
let income = document.getElementById("income");
let expense = document.getElementById("expense");
let balance = document.getElementById("balance");

let totalIncome = 0;
let totalExpense = 0;


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


function renderList() {
  list.innerHTML = "";
  totalIncome = 0;
  totalExpense = 0;

  transactions.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = `${t.text} - $${t.amount}`;
    li.classList.add(t.amount > 0 ? "plus" : "minus");
    list.appendChild(li);

    if (t.amount > 0) totalIncome += t.amount;
    else totalExpense += Math.abs(t.amount);
  });

  let totalBalance = totalIncome - totalExpense;
  income.innerHTML = `<p>$${totalIncome}</p>`;
  expense.innerHTML = `<p>$${totalExpense}</p>`;
  balance.innerHTML = `<p>$${totalBalance}</p>`;

 
  if (transactions.length > 0) {
    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear History";
    clearBtn.className = "clear-btn";
    clearBtn.addEventListener("click", clearHistory);
    list.appendChild(clearBtn);
  }
}


addbtn.addEventListener("click", () => {
  let amt = Number(amount.value.trim());

  if (text.value.trim() === "" || amount.value.trim() === "" || isNaN(amt)) {
    alert("Please enter valid text and amount");
    return;
  }

  const newTransaction = {
    text: text.value,
    amount: amt
  };

  transactions.push(newTransaction);

  
  localStorage.setItem("transactions", JSON.stringify(transactions));

  renderList();

  text.value = "";
  amount.value = "";
});


function clearHistory() {
  if (confirm("Are you sure you want to delete all history?")) {
    localStorage.removeItem("transactions");
    transactions = [];
    renderList();
  }
}


renderList();

