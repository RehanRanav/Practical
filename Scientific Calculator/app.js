
let output;
document.addEventListener("DOMContentLoaded", function () {
    output = document.getElementById("resultbar");
    const toggle_btn = document.getElementById("change-list-btn");
    const list1 = document.querySelectorAll(".list1");
    const list2 = document.querySelectorAll(".list2");

    //restrict string charaters in input field
    output.addEventListener('input', function (event) {
        let inputValue = event.target.value;
        event.target.value = inputValue.replace(/[^0-9+\-*/%.e()]/g, "");

        let selectionStart = event.target.selectionStart;
        let selectionEnd = event.target.selectionEnd;
        event.target.setSelectionRange(selectionStart, selectionEnd);
    });
    output.addEventListener('click', function (event) {
        output.setSelectionRange(output.value.length, output.value.length);
    });
    output.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }
    });

    //toggle between button list
    toggle_btn.addEventListener('click', function () {
        list1.forEach(function (item) {
            item.classList.toggle("deactive");
        });

        list2.forEach(function (item) {
            item.classList.toggle("active");
        });
    });

});

let backspace = () => {
    let result = output.value;

    if (!result || result === "ERROR!") {
        clearInput();
    }
    else {
        output.value = result.slice(0, -1);
    }
}

let clearInput = () => {
    output.value = "";
}


let print_value = (val) => {
    if (output.value === "ERROR!") {
        clearInput();
    }
    output.value += val;
}

// show button function after equal button press
let show = () => {
    let result = output.value;

    //set to 0 when undefined and error
    if (!result || result === "ERROR!") {
        output.value = `0`;
    }

    if (result.includes(`+`) || result.includes(`-`) || result.includes(`*`) || result.includes(`/`) || result.includes(`%`) || result.includes(`.e+`)) {
        try {
            output.value = eval(result);
        } catch (e) {
            output.value = "ERROR!";
            console.log(e.message);
        }
    }
}

let find_fact = () => {
    let result = eval(output.value) || 1;
    result = parseFloat(result);
    let ans = factorial(result);
    output.value = ans.toString();
}

function factorial(val) {
    if (val <= 1)
        return 1;
    else
        return val * factorial(val - 1);
}

let add_values = (val) => {
    let result = output.value;

    if (output.value === "ERROR!") {
        clearInput();
    }
    let last_char = result.slice(-1);

    if (last_char === "+" || last_char === "-" || last_char === "*" || last_char === "/" || last_char === "%" || last_char === "") {
        if (val === `E`) {
            output.value = result + Math.E;
        } else if (val === `PI`) {
            output.value = result + Math.PI;
        }
    }
    else {
        if (val === `E`) {
            output.value = result + "*" + Math.E;
        } else if (val === `PI`) {
            output.value = result + "*" + Math.PI;
        }
    }
}

let find_abs = () => {
    let result = eval(output.value) || "";
    let ans = parseFloat(result);
    if (result) {
        ans = Math.abs(ans);
        output.value = ans.toString();
    }
}

let change_sign = () => {
    let result = output.value;

    if (result.slice(0, 1) === "-") {
        output.value = result.slice(1)
    } else {
        output.value = "-" + result;
    }
}