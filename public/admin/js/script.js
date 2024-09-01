// button Status
const buttonStatus = document.querySelectorAll("[button-status]");
// console.log(buttonStatus);
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    // console.log(url);


    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            // console.log(status);

            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

        // console.log(url.href);
        window.location.href = url.href;

        });
    });
}
// end button Status


// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);
    
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;

        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
        
    });
}
// End Form Search


// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination");
    //console.log(buttonsPagination);

if (buttonsPagination) {

    let url = new URL(window.location.href);

    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
                //console.log(page);

            url.searchParams.set("page", page);

            window.location.href = url.href;
        });
    });
}
// End pagination


// Checkbox-Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
        //console.log(checkboxMulti);

    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
        //console.log(inputCheckAll);

    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
        //console.log(inputsId);

    inputCheckAll.addEventListener("click", () => {
            //console.log(inputCheckAll.checked);
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            });
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            });
        }
    });

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
                //console.log(countChecked);
                //console.log(inputsId.length);

            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        });
    });
}
// End checkbox-multi


// Form Change-Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
        //console.log(formChangeMulti);

    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
            //console.log(e);
        
        const checkboxMulti = document.querySelector("[checkbox-multi]");

        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
            //console.log(inputsChecked);


            /* Xoa tat ca */
        const typeChange = e.target.elements.type.value;
            // console.log(typeChange);

        if (typeChange == "delete-all") {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa những sản phẩm này");
            if (!isConfirm) {
                return;
            }
        }
            /* End xoa tat ca */



        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach((input) => {
                const id = input.value;

                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;

                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }
            });

                // console.log(ids.join(", "));
            inputIds.value = ids.join(", ");

            formChangeMulti.submit();

        } else {
            alert("Vui long chon it nhat mot ban ghi!");
        }
    });
}
// End form change-multi


// Show alrert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
        // console.log(showAlert);

    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}
// End show alert


// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {

    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
            // console.log(e);

        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
// End Upload Image


// Sort
const sort = document.querySelector("[sort]");
    // console.log(sort);

if (sort) {
    let url = new URL(window.location.href);

    // Sắp xếp
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");

    sortSelect.addEventListener("change", (e) => {
            // console.log(e);
            // console.log(e.target.value);

        const valueNew = e.target.value;
            // console.log(value.split("-"));

        const [sortKey, sortValue] = valueNew.split("-");
            console.log(sortKey);
            console.log(sortValue);

        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    });

    // Clear
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    });

    // Thêm selected cho option
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
        // console.log(sortKey);
        // console.log(sortValue);

    if (sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`;
        console.log(stringSort);

        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
            // console.log(optionSelected);

        optionSelected.selected = true;
    }
}
// End Sort