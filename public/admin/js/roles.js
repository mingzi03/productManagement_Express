// Permissions

const tablePermissions = document.querySelector("[table-permissions]");
    // console.log(tablePermissions);

if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]");
        // console.log(buttonSubmit);

    buttonSubmit.addEventListener("click", () => {
        let permissions = [];

        const rows = tablePermissions.querySelectorAll("[data-name]");
            // console.log(rows);

        rows.forEach(row => {
            const name = row.getAttribute("data-name");
                // console.log(name);
            const inputs = row.querySelectorAll("input");
                // console.log(inputs);
            
            if (name == "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    permissions.push({
                        id: id,
                        permissions: []
                    });
                })
            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked;

                    // console.log(name);
                    // console.log(index);
                    // console.log(checked);
                    // console.log("---------------");

                    if (checked) {
                        permissions[index].permissions.push(name);
                    }
                    
                });
            }
        });

        console.log(permissions);

        if (permissions.length > 0) {
            const formChangePermissions = document.querySelector("#form-change-permissions");
                // console.log(formChangePermissions);

            const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");
                // console.log(inputPermissions);

            inputPermissions.value = JSON.stringify(permissions);

            formChangePermissions.submit();
        }
    });
}

// End Permissions


// Hiển thị Permissions Data

const dataRecords = document.querySelector("[data-records]");
    // console.log(dataRecords);

if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
        // console.log(records);

    const tablePermissions = document.querySelector("[table-permissions]");
        // console.log(tablePermissions);

    records.forEach((record, index) => {
        const permissions = record.permissions;
            // console.log(permissions);

        permissions.forEach(permission => {
                // console.log(permission);
                // console.log(index);

            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];

            input.checked = true;
        });

            // console.log("----------");
    });
}

// End Hiển thị Permissions Data