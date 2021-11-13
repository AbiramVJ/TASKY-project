let globalTaskData = [];

taskContents = document.getElementById("taskContents");

const addCard = () => {
  const newTaskDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imageURL").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    deadline: document.getElementById("taskDeadline").value,
    description: document.getElementById("taskDescription").value,
  };

  taskContents.insertAdjacentHTML("beforeend", generateCard(newTaskDetails));

  globalTaskData.push(newTaskDetails);
  saveToLocalStorage();
};

const generateCard = ({ id, url, title, type, deadline, description }) =>
  `<div id=${id} class="col-md-4 col-lg-4 mt-4">
    <div class="card bg-light" key=${id}>
      <div class="card-header">
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)">
            <i class="fas fa-pencil-alt"></i>
          </button>
          <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <img src=${url} class="card-img-top" alt="image">
      <div class="card-body" style="color:black;">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <p class="badge bg-primary">${type}</p>
        <p class="badge bg-danger float-end">${deadline}</p>
      </div>
      <div class="card-footer">
        <button type="button" class="btn btn-outline-success float-end" data-bs-target="#openTaskModal" data-bs-toggle="modal" onclick="openTaskModal(this)" name=${id}>Open Task</button>
      </div>
    </div>
  </div>`;

const saveToLocalStorage = () => {
  localStorage.setItem("taskboy", JSON.stringify({ tasks: globalTaskData }));
};

 const reloadTaskCards = () => {
   const localStorageCopy = JSON.parse(localStorage.getItem("taskboy"));
   if (localStorageCopy) {
     globalTaskData = localStorageCopy.tasks;
   }
   globalTaskData.map((cardData) => {
     taskContents.insertAdjacentHTML("beforeend", generateCard(cardData));
   });
 };

//deleteTask
//====================================================================
const deleteTask = (e) => {
  const targetID = e.getAttribute("name");
  globalTaskData = globalTaskData.filter(
    (cardData) => cardData.id !== targetID
  );
  saveToLocalStorage();
  window.location.reload();
};

const editTask = (e) => {
  const targetID = e.getAttribute("name");
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true"); // make a tag as editable .setAttribute("contenteditable","true") contenteditable = key and value
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true");
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true");

  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[7].setAttribute("contenteditable","true");
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML ="Save Changes";

  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","saveEdits(this)");

  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("name",targetID);
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute( "data-bs-target","");
};

const saveEdits = (e) => {
  const targetID = e.getAttribute("name");
  const updatedTaskData = {
    id: targetID,
    url: document.getElementsByTagName("img")[0].getAttribute("src"),
    title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
    type: e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML,
    deadline: e.parentNode.parentNode.childNodes[5].childNodes[7].innerHTML,
    description: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML,
  };
  globalTaskData = globalTaskData.map((cardData) =>
    cardData.id === targetID ? updatedTaskData : cardData
  );
  saveToLocalStorage();
  window.location.reload();

  e.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","false");
  e.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","false");
  e.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","false");
  e.parentNode.parentNode.childNodes[5].childNodes[7].setAttribute("contenteditable","false");
  e.innerHTML = "Open Task";
  e.setAttribute("onclick", "openTaskModal(this)");
  e.setAttribute("data-bs-target", "#openTaskModal");
};

const generateTaskModal = ({ id, url, title, type, deadline, description }) =>
  `<div id=${id}>
    <img src="${
      url ||
      "data:image/jpeg;base64,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"
    }" alt="image" class="w-100">
    <h5 class="modal-title">${title}</h5>
    <p class="modal-body">${description}</p>
    <p class="badge bg-primary">${type}</p>
    <p class="badge bg-danger float-end">${deadline}</p>
  </div>`;

const openTaskModal = (e) => {
  const targetID = e.getAttribute("name");
  const targetCard = globalTaskData.filter((e) => e.id == targetID);
  document.getElementById("open__task__modal").innerHTML = generateTaskModal(
    targetCard[0]
  )
};