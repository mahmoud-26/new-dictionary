// Load existing entries from localStorage or create a new array
let entries = JSON.parse(localStorage.getItem('entries')) || [];

// Function to add a new entry to the table and the entries array
function addEntry() {
  // Get the values from the input fields
  let english = document.getElementById('english').value;
  let arabic = document.getElementById('arabic').value;

  // Check if the input fields are empty
  if (english.trim() === '' || arabic.trim() === '') {
    return;
  }

  // Add the new entry to the entries array
  entries.push({ english, arabic });

  // Save the updated entries array to localStorage
  localStorage.setItem('entries', JSON.stringify(entries));

  // Clear the input fields
  document.getElementById('english').value = '';
  document.getElementById('arabic').value = '';

  // Update the table with the new entry
  let table = document.getElementById('entries');
  let tbody = table.getElementsByTagName('tbody')[0];
  let row = tbody.insertRow();
  let deleteCell = row.insertCell();
  let englishCell = row.insertCell();
  let arabicCell = row.insertCell();
  englishCell.innerText = english;
  arabicCell.innerText = arabic;

  // Create a delete button for the new row
  let deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<ion-icon name="trash"></ion-icon>';
  deleteButton.classList.add("delete-button");

  // Attach a click event listener to the delete button
  deleteButton.addEventListener('click', function() {
    Swal.fire({
      title: 'Are you sure you want to delete this row?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        // Remove the corresponding entry from the entries array
        entries.splice(row.rowIndex - 1, 1);

        // Save the updated entries array to localStorage
        localStorage.setItem('entries', JSON.stringify(entries));

        // Remove the corresponding row from the table
        tbody.deleteRow(row.rowIndex - 1);
      }
    });
  });

  // Add the delete button to the delete cell in the new row
  deleteCell.appendChild(deleteButton);
}

// Function to load existing entries into the table when the page loads
function loadEntries() {
  let table = document.getElementById('entries');
  let tbody = table.getElementsByTagName('tbody')[0];
  entries.forEach(entry => {
    let row = tbody.insertRow();
    let deleteCell = row.insertCell();
    let englishCell = row.insertCell();
    let arabicCell = row.insertCell();
    englishCell.innerText = entry.english;
    arabicCell.innerText = entry.arabic;

    // Create a delete button for the existing row
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<ion-icon name="trash"></ion-icon>';
    deleteButton.classList.add("delete-button");

    // Attach a click event listener to the delete button
    deleteButton.addEventListener('click', function() {
      Swal.fire({
        title: 'Are you sure you want to delete this row?',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `Delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isDenied) {
          // Remove the corresponding entry from the entries array
          entries.splice(row.rowIndex - 1, 1);

          // Save the updated entries array to localStorage
          localStorage.setItem('entries', JSON.stringify(entries));

          // Remove the corresponding row from the table
          tbody.deleteRow(row.rowIndex - 1);
        }
      });
    });

    // Add the delete button to the delete cell in the existing row
    deleteCell.appendChild(deleteButton);
  });
}

// Call the loadEntries function when the page loads
loadEntries();