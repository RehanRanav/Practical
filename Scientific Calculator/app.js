
let output;
document.addEventListener("DOMContentLoaded", function () {
    output = document.getElementById("resultbar");
    const toggle_btn = document.getElementById("change-list-btn");
    const list1 = document.querySelectorAll(".list1");
    const list2 = document.querySelectorAll(".list2");
    const degreebtn = document.querySelector(".degreebtn");
    const trigonometry = document.querySelector(".trigonometry");
    const trigonometry_options = document.querySelector(".trigonometry-options");
    const functionsbtn = document.querySelector(".functions");
    const functions_options = document.querySelector(".functions-options");
    const change_trigonometry = document.querySelector(".change-option");
    const options = document.querySelectorAll(".option-btn");
    const hyperbolic = document.querySelector(".change-to-inverse");

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
    document.addEventListener('keydown', function (event) {
        output.setSelectionRange(output.value.length, output.value.length);
        output.focus();
    })

    document.addEventListener('keyup', function (event) {
        if(event.key === 'Enter') {
            show();
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

    degreebtn.addEventListener('click', function () {
        let btn_content = degreebtn.innerHTML;
        if (btn_content === "DEG") {
            degreebtn.innerHTML = "RAD";
        } else {
            degreebtn.innerHTML = "DEG";
        }
    });

    trigonometry.addEventListener('click', function () {
        trigonometry_options.classList.toggle("active-option");
    });

    functionsbtn.addEventListener('click', function () {
        functions_options.classList.toggle("active-option");
    });

    change_trigonometry.addEventListener('click', function (event) {
        options.forEach(function (item) {
            let btn_content = item.innerHTML;
            if (!btn_content.includes('h')) {
                btn_content = btn_content.replace(/\w\w\w/, function (match) {
                    return match + 'h';
                });
            } else {
                btn_content = btn_content.replace(new RegExp('h', 'g'), '');
            }
            item.innerHTML = btn_content;
        });
        event.stopPropagation();
    });

    hyperbolic.addEventListener('click', function (event) {
        options.forEach(function (item) {
            let btn_content = item.innerHTML;
            if (!btn_content.includes(`-1`)) {
                btn_content += `<sup>-1</sup>`;
            } else {
                btn_content = btn_content.replace(new RegExp('-1', 'g'), '');
            }
            item.innerHTML = btn_content;
        });
        event.stopPropagation();
    });

});

let backspace = () => {
    let result = output.value;

    if (!result || result === "ERROR!" || output.value === "NaN" || output.value === "undefined" || output.value === "Infinity") {
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
    if (output.value === "ERROR!" || output.value === `0` || output.value === "Infinity"|| output.value === "NaN" || output.value === "undefined") {
        console.log(output.value);
        clearInput();
    }
    output.value += val;
}

// show button function after equal button press
let show = () => {
    let result = output.value;

    //set to 0 when undefined and error
    if (!result || result === "ERROR!" || result === "undefined" || result === "Infinity" || result === "NaN") {
        output.value = ``;
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

    if (result.includes(`+e0`)) {
        result = find_fixed_decimal(result);
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
        console.log(ans,result);
        if (result === ans) {
            throw new Error(`Invalid`)
        }
        return ans;

    } catch (e) {
        output.value = `ERROR!`;
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
        output.value = `ERROR!`;
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
        output.value = `ERROR!`;
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
        output.value = `ERROR!`;
    }
}

function find_fixed_decimal(val) {
    let result = val;

    try {
        let ans = result.replace(/(\d+\.\d+)\+e(\d+)/g, function (match, x, y) {
            const F_E_Result = Number(x) * (Math.pow(10, Number(y)));
            return F_E_Result.toString();
        })
        if (result === ans) {
            throw new Error(`Invalid`)
        }
        return ans;

    } catch (e) {
        output.value = `ERROR!`;
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
        output.value = `ERROR!`;
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
        output.value = `ERROR!`;
    }
}

let find_degree_radian = () => {
    let result = output.value;
    let btn_content = document.querySelector('.degreebtn').innerHTML;
    console.log(btn_content);
    try {
        if (isNaN(result)) {
            throw new Error("Invalid expression");
        }
        if (btn_content === 'DEG') {
            let radian = Number(result) * Math.PI / 180;
            output.value = radian;
        } else {
            let degree = Number(result) * 180 / Math.PI;
            output.value = degree;
        }
    } catch (e) {
        output.value = `ERROR!`;
    }
}

let find_random = () => {
    output.value = Math.random();
}

let find_floor = () => {
    let result = output.value;
    try {
        if (isNaN(result)) {
            throw new Error("Invalid expression");
        }
        output.value = Math.floor(result);

    } catch (e) {
        output.value = `ERROR!`;
    }
}

let find_ceil = () => {
    let result = output.value;
    try {
        if (isNaN(result)) {
            throw new Error("Invalid expression");
        }
        output.value = Math.ceil(result);

    } catch (e) {
        output.value = `ERROR!`;
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

let trigonometry_operation = (val) => {
    let result = parseFloat(output.value);
    let btn_content = document.querySelector(".option-btn").innerHTML;
    btn_content = btn_content.toString();

    switch (val) {
        case `sin`:
            if (btn_content.includes(`h`) && btn_content.includes(`-1`)) {
                output.value = Math.asinh(result);
            } else if (btn_content.includes(`-1`)) {
                console.log(btn_content);
                output.value = Math.asin(result);
            } else if (btn_content.includes(`h`)) {
                output.value = Math.sinh(result);
            } else {
                output.value = Math.sin(result);
            }
            break;
        case 'cos':
            if (btn_content.includes(`h`) && btn_content.includes(`-1`)) {
                output.value = Math.acosh(result);
            } else if (btn_content.includes(`-1`)) {
                output.value = Math.acos(result);
            } else if (btn_content.includes(`h`)) {
                output.value = Math.cosh(result);
            } else {
                output.value = Math.cos(result);
            }
            break;
        case 'tan':
            if (btn_content.includes(`h`) && btn_content.includes(`-1`)) {
                output.value = Math.atanh(result);
            } else if (btn_content.includes(`-1`)) {
                output.value = Math.atan(result);
            } else if (btn_content.includes(`h`)) {
                output.value = Math.tanh(result);
            } else {
                output.value = Math.tan(result);
            }
            break;
        case 'csc':
            if (btn_content.includes(`h`) && btn_content.includes(`-1`)) {
                output.value = 1 / Math.asinh(result);
            } else if (btn_content.includes(`-1`)) {
                output.value = 1 / Math.asin(result);
            } else if (btn_content.includes(`h`)) {
                output.value = 1 / Math.sinh(result);
            } else {
                output.value = 1 / Math.sin(result);
            }
            break;
        case 'sec':
            if (btn_content.includes(`h`) && btn_content.includes(`-1`)) {
                output.value = 1 / Math.acosh(result);
            } else if (btn_content.includes(`-1`)) {
                output.value = 1 / Math.acos(result);
            } else if (btn_content.includes(`h`)) {
                output.value = 1 / Math.cosh(result);
            } else {
                output.value = 1 / Math.cos(result);
            }
            break;
        case 'cot':
            if (btn_content.includes(`h`) && btn_content.includes(`-1`)) {
                output.value = 1 / Math.atanh(result);
            } else if (btn_content.includes(`-1`)) {
                output.value = 1 / Math.atan(result);
            } else if (btn_content.includes(`h`)) {
                output.value = 1 / Math.tanh(result);
            } else {
                output.value = 1 / Math.tan(result);
            }
            break;

    }
}