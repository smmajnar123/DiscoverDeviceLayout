// Device list
const devices = [];

for (let i = 1; i <= 10; i++) {
    devices.push(`Device ${i}`);
}

// Load devices
function loadDevices() {

    let sidebar = document.getElementById("deviceList");
    let drawer = document.getElementById("deviceListMobile");

    sidebar.innerHTML = "";
    drawer.innerHTML = "";

    devices.forEach((device, index) => {

        let item = `<div class="menu-item" onclick="openDevice(${index}, this)">
                        ${device}
                    </div>`;

        sidebar.innerHTML += item;
        drawer.innerHTML += item;
    });
}

// Select node (highlight)
function selectNode(element) {

    let nodes = document.querySelectorAll(".node, .child");
    nodes.forEach(n => n.classList.remove("active-node"));

    element.classList.add("active-node");
}

// Show tree
function openDevice(index, element) {

    let treeHTML = `<h2>${devices[index]}</h2><ul class="tree">`;

    for (let i = 1; i <= 100; i++) {

        treeHTML += `
            <li>
                <span class="node" onclick="selectNode(this)">
                    ${devices[index]} - Instance ${i}
                </span>
                <ul>
                    <li class="child" onclick="selectNode(this); showTable('${devices[index]}', ${i})">
                        ${devices[index]} - Child ${i}
                    </li>
                </ul>
            </li>
        `;
    }

    treeHTML += `</ul>`;

    document.getElementById("treeContainer").innerHTML = treeHTML;
    document.getElementById("tableContainer").innerHTML = "";

    let items = document.querySelectorAll(".menu-item");
    items.forEach(i => i.classList.remove("active"));

    if (element) element.classList.add("active");

    closeDrawer();
}

// Show table
function showTable(deviceName, index) {

    let tableHTML = `
        <h3>${deviceName} - Child ${index} Data</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>IP</th>
                    <th>Type</th>
                    <th>Version</th>
                    <th>Location</th>
                    <th>Last Seen</th>
                    <th>Signal</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 1; i <= 100; i++) {
        tableHTML += `
            <tr>
                <td>${i}</td>
                <td>${deviceName}</td>
                <td>Active</td>
                <td>192.168.1.${i}</td>
                <td>Sensor</td>
                <td>v1.0</td>
                <td>Zone ${i}</td>
                <td>Now</td>
                <td>Strong</td>
                <td><button>View</button></td>
            </tr>
        `;
    }

    tableHTML += `</tbody></table>`;

    document.getElementById("tableContainer").innerHTML = tableHTML;
     // Attach double-click event to each row
    document.querySelectorAll('.data-table tbody tr').forEach(row => {
        row.addEventListener('dblclick', () => showRowModal(row));
    });
}
// Modal logic
const modal = document.getElementById('rowModal');
const modalTitle = document.getElementById('modalTitle');
const modalTableBody = document.querySelector('#modalTable tbody');

function showRowModal(row) {
    const data = {
        ID: row.dataset.id,
        Name: row.dataset.name,
        Status: row.dataset.status,
        IP: row.dataset.ip,
        Type: row.dataset.type,
        Version: row.dataset.version,
        Location: row.dataset.location,
        "Last Seen": row.dataset.lastseen,
        Signal: row.dataset.signal
    };

    modalTitle.textContent = `Details of ${data.Name}`;

    modalTableBody.innerHTML = '';
    for (const key in data) {
        modalTableBody.innerHTML += `<tr><th>${key}</th><td>${data[key]}</td></tr>`;
    }

    modal.style.display = 'block';
}
function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) modal.style.display = 'none';
}

const splitter = document.getElementById("splitter");
const tree = document.getElementById("treeContainer");
const main = document.querySelector(".main");

let isDragging = false;

splitter.addEventListener("mousedown", () => {
    isDragging = true;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    // 🔥 IMPORTANT: calculate relative position
    const containerLeft = main.getBoundingClientRect().left;
    let newWidth = e.clientX - containerLeft;

    // ✅ limits
    const min = 200;
    const max = main.offsetWidth - 300;

    if (newWidth < min) newWidth = min;
    if (newWidth > max) newWidth = max;

    tree.style.width = newWidth + "px";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "auto";
    document.body.style.cursor = "default";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "auto";
    document.body.style.cursor = "default";
});
// Drawer
function openDrawer() {
    document.getElementById("drawer").classList.add("open");
    document.getElementById("overlay").classList.add("show");
}

function closeDrawer() {
    document.getElementById("drawer").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
}

// Default load
window.onload = function () {
    loadDevices();
    openDevice(0);
};