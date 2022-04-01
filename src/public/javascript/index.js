import * as DOM from "./global.js";
const socket = io()

// products list socket
socket.on("listed", (p) => {
  let html = `<tr><td>${p.title}</td><td>${p.price}</td><td>${p.thumbnail}</td></tr>`;
  DOM.$table.innerHTML += html;
});
socket.on("list", (l) => {
  l.map((prod) => {
    let html = `<tr><td>${prod.title}</td><td>${prod.price}</td><td>${prod.thumbnail}</td></tr>`;
    DOM.$table.innerHTML += html;
  });
})
DOM.$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const DATA = Object.fromEntries(new FormData(e.target));
  for (const $i of DOM.$inputs) {
    $i.value = "";
  }
  socket.emit("product", DATA);
});

// chat socket
socket.on('toChat', (content)=> {
  let message = ''
  content.map((m)=> {
  message +=`<li><div><h4>${m.email}</h4><h5>${m.date}</h5><p>${m.message}</p></div></li>`
  })
  DOM.$messages.innerHTML = message 
})
DOM.$chatForm.addEventListener('submit', (e)=> {
  e.preventDefault();
  const DATA = Object.fromEntries(new FormData(e.target))
  socket.emit('message', DATA);
  console.log(DATA)
  DOM.$chat.value = '';
})
