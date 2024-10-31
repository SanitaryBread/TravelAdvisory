const fs = require('fs');
const path = require('path');
const { app, BrowserWindow } = require('electron');

const btnCreate = document.getElementById('btnCreate');
const btnUpdate = document.getElementById('btnUpdate');
const fileName = document.getElementById('filename');
const fileContents = document.getElementById('fileContents');
const fileListContainer = document.getElementById('fileList');

let pathName = path.join(__dirname, 'Files');

function loadFileList() {
    fs.readdir(pathName, (err, files) => {
        if (err) {
            return console.error('Error reading directory:', err);
        }
        fileListContainer.innerHTML = '';

        files.forEach((file) => {
            const fileDiv = document.createElement('div');
            fileDiv.classList.add('file-item');
            fileDiv.style.display = "flex";
            fileDiv.style.justifyContent = "space-between";
            fileDiv.style.alignItems = "center";
            fileDiv.style.padding = "10px";
            fileDiv.style.borderBottom = "1px solid #c0d5d7";

            const fileNameText = document.createElement('span');
            fileNameText.innerText = file;
            fileDiv.appendChild(fileNameText);

            const readBtn = document.createElement('button');
            readBtn.innerText = 'Read';
            readBtn.style.backgroundColor = '#4b8f52';
            readBtn.style.color = 'white';
            readBtn.style.padding = '5px 10px';
            readBtn.style.border = 'none';
            readBtn.style.borderRadius = '5px';
            readBtn.style.cursor = 'pointer';
            readBtn.style.width = '20%';

            readBtn.addEventListener('click', () => {
                readFile(file);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.style.backgroundColor = '#d9534f';
            deleteBtn.style.color = 'white';
            deleteBtn.style.padding = '5px 10px';
            deleteBtn.style.border = 'none';
            deleteBtn.style.borderRadius = '5px';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.style.width = '20%';

            deleteBtn.addEventListener('click', () => {
                deleteFile(file);
            });

            fileDiv.appendChild(readBtn);
            fileDiv.appendChild(deleteBtn);
            fileListContainer.appendChild(fileDiv);
        });
    });
}

function readFile(file) {
    const filePath = path.join(pathName, file);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.error('Error reading file:', err);
        }
        fileName.value = file;
        fileContents.value = data;
    });
}

function deleteFile(file) {
    const filePath = path.join(pathName, file);

    fs.unlink(filePath, (err) => {
        if (err) {
            return console.error('Error deleting file:', err);
        }
        alert(`${file} was deleted.`);
        loadFileList();
    });
}

btnCreate.addEventListener('click', () => {
    const file = path.join(pathName, fileName.value);
    const contents = fileContents.value;

    fs.writeFile(file, contents, (err) => {
        if (err) {
            return console.error('Error creating file:', err);
        }
        alert(`${fileName.value} file was created`);
        loadFileList();
    });
});

btnUpdate.addEventListener('click', () => {
    const file = path.join(pathName, fileName.value);
    const contents = fileContents.value;

    fs.writeFile(file, contents, (err) => {
        if (err) {
            return console.error('Error updating file:', err);
        }
        alert(`${fileName.value} file was updated`);
        loadFileList();
    });
});

loadFileList();
