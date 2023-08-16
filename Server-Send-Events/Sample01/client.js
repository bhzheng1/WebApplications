const output = document.getElementById("output");
const evtSource = new EventSource("http://localhost:8000/stream");

//message name should be same with the respnse message type
evtSource.addEventListener("new_message", (event) => {
  const data = event.data;
  output.innerHTML += `<p>${data}</p>`;
  console.log("test");
});

evtSource.addEventListener("end", function (event) {
  console.log("Handling end....");
  evtSource.close();
});
