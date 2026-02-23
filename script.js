let dataStore = [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    // sort by date (newest first)
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    dataStore = data;
    populateSidebar(data);
  });

function populateSidebar(data) {
  const list = document.getElementById("dateList");

  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.date;
    li.onclick = () => showContent(item);
    list.appendChild(li);
  });
}

function showContent(item) {
  const area = document.getElementById("displayArea");

  area.innerHTML = `
    <div class="card">
      <div class="dateTitle">${item.date}</div>
      <h2>${item.title}</h2>
      <p>${item.description}</p>
      <div id="mediaContainer"></div>
    </div>
  `;

  const mediaContainer = document.getElementById("mediaContainer");

  item.media.forEach(m => {
    if (m.type === "image") {
      mediaContainer.innerHTML += `<img src="${m.file}">`;
    }

    if (m.type === "video") {
      mediaContainer.innerHTML += `
        <video controls>
          <source src="${m.file}" type="video/mp4">
        </video>
      `;
    }
  });
}