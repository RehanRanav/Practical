
let output;
document.addEventListener("DOMContentLoaded", function () {
    output = document.getElementById("resultbar");
    const toggle_btn = document.getElementById("change-list-btn");
    const list1 = document.querySelectorAll(".list1");
    const list2 = document.querySelectorAll(".list2");

    //restrict string charaters in input field
    output.addEventListener('input', function (event) {
        let inputValue = event.target.value;
        event.target.value = inputValue.replace(/[^0-9+\-*/%.e()log]/g, "");

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

    if (!result || result === "ERROR!" || output.value === "NaN" || output.value === "undefined") {
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
    if (output.value === "ERROR!" || output.value === `0` || output.value === "NaN" || output.value === "undefined") {
        clearInput();
    }
    output.value += val;
}

// show button function after equal button press
let show = () => {
    let result = output.value;

    //set to 0 when undefined and error
    if (!result || result === "ERROR!" || result === "undefined") {
        output.value = `0`;
    }

    if (result.includes(`log10(`)) {
        result = find_log10(result);
        output.value = result;
    }

    if (result.includes(`ylog`)) {
        result = find_logyx(result);
        output.value = result;
    }

    if (result.includes(`ln`)) {
        result = find_loge(result);
        output.value = result;
    }

    if (result.includes(`e^`)) {
        result = find_exponential(result);
        output.value = result;
    }

    if(result.includes(`+e0`)){
        result = find_force_exponential(result);
        output.value = result;
    }

    if (result.includes(`√`)) {
        result = calculate_root(result);
        output.value = result;

    }

    if (result.includes(`^`)) {
        result = calculate_power(result);
        output.value = result;

    }

    if (result.includes(`+`) || result.includes(`-`) || result.includes(`*`) || result.includes(`/`) || result.includes(`%`) || result.includes(`.e+`)) {
        arithmetic_operation(result);
    }
}

function arithmetic_operation(val) {
    let result = val;
    try {
        output.value = eval(result);
    } catch (e) {
        output.value = "ERROR!";
        console.log(e.message);
    }
}

function calculate_power(val) {
    let result = val;

    try {
        let ans = result.replace(/(\d+)\s*\^(\d+)/g, function (match, base, exponent) {
            const powerResult = Math.pow(Number(base), Number(exponent));
            return powerResult.toString();
        })
        if (result === ans) {
            throw new Error(`Invalid`)
        }
        return ans;
    } catch (e) {
        output.value = "ERROR!";
        console.log(e.message);
    }
}

function calculate_root(val) {
    let result = val;

    try {
        let ans = result.replace(/(\d+)\s*√(\d+)/g, function (match, base, number) {
            const sqrtResult = Math.pow(Number(number), 1 / Number(base));
            return sqrtResult.toString();
        })
        if (result === ans) {
            throw new Error(`Invalid`)
        }
        return ans;
    } catch (e) {
        output.value = "ERROR!";
        console.log(e.message);
    }
}

function find_log10(val) {
    let result = val;

    try {
        let ans = result.replace(/log10\((\d+)\)/g, function (match, x) {
            const log10Result = Math.log10(Number(x));
            return log10Result.toString();
        })
        if (result === ans) {
            throw new Error(`Invalid`)
        }
        return ans;

    } catch (e) {
        output.value = `0`;
    }
}

function find_logyx(val) {
    let result = val;
    try {
        let ans = result.replace(/(\d+)ylog(\d+)/g, function (match, base, val) {
            const logyxResult = Math.log(Number(val)) / Math.log(Number(base));
            return logyxResult.toString();
        })
        if (result === ans || result === undefined) {
            throw new Error(`Invalid`)
        }
        return ans;

    } catch (e) {
        output.value = `0`;
    }
}

function find_loge(val) {
    let result = val;

    try {
        let ans = result.replace(/ln(\d+)/g, function (match, x) {
            const logEResult = Math.log(Number(x));
            return logEResult.toString();
        })
        if (result === ans) {
            throw new Error(`Invalid`)
        }
        return ans;

    } catch (e) {
        output.value = `0`;
    }
}

function find_exponential(val) {
    let result = val;

    try {
        let ans = result.replace(/e\^(\d+)/g, function (match, x) {
            const exponentialResult = Math.exp(Number(x));
            return exponentialResult.toString();
        })
        if (result === ans) {
            throw new Error(`Invalid`)
        }
        return ans;

    } catch (e) {
        output.value = `0`;
    }
}

function find_force_exponential(val){
    let result = val;

    try {
        let ans = result.replace(/(\d+\.\d+)\+e(\d+)/g, function (match, x , y) {
            const F_E_Result = Number(x)*(Math.pow(10,Number(y)));
            return F_E_Result.toString();
        })
        if (result === ans) {
            throw new Error(`Invalid`)
        }
        return ans;

    } catch (e) {
        output.value = `0`;
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

    if (result === "ERROR!") {
        clearInput();
    }
    let last_char = result.slice(-1);

    //Add E and PI Value
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

let find_power = (val) => {
    try {
        let result = eval(output.value);
        if (isNaN(result)) {
            throw new Error("Invalid expression");
        }
        result = parseFloat(result);
        let ans = Math.pow(result, val);
        output.value = ans.toString();
    } catch (e) {
        output.value = `0`;
    }
}

let find_base = (val) => {
    let result = output.value;
    try {
        if (isNaN(result)) {
            throw new Error("Invalid expression");
        }
        let ans = Math.pow(val, Number(result));
        output.value = ans;
    } catch (e) {
        output.value = `0`;
    }
}

let memory_operation = (val) => {
    let result = parseFloat(output.value);
    let ans = localStorage.getItem('CalculatorMemory');

    switch (val) {
        case `store`:
            if (!isNaN(result)) {
                localStorage.setItem('CalculatorMemory', result);
                console.log(result, typeof result);
            }
            break;
        case `add`:
            if (!isNaN(result)) {
                ans = Number(ans) + result;
                localStorage.setItem('CalculatorMemory', ans);
                console.log(ans, typeof ans);
            }
            break;
        case `subtract`:
            if (!isNaN(result)) {
                ans = Number(ans) - result;
                localStorage.setItem('CalculatorMemory', ans);
                console.log(ans, typeof ans);
            }
            break;
        case `recall`:
            output.value = ans;
            break;
        case `clear`:
            localStorage.removeItem('CalculatorMemory');
            break;
    }
}