// Identifying memory leaks
const express = require("express");
const app = express();
let data = [];
/* 1. Adding and not removing event listeners */
// let buttonElement = document.getElementById("submit-button");

const logBtnClick = () => {
    console.log("Submit button clicked");
};

// buttonElement.addEventListener("click", logBtnClick);
// buttonElement.removeEventListener("click", logBtnClick);

/* 2. Closures - Reference to outer function data isn't gCollected */
const createClosure = () => {
    const data = "Some data"; //What if this is an object with more circular references leading to increase in heap usage (leak)
    return () => {
        const localData = data;
        return `data ${localData}`;
    };
};

const leakedClosure = createClosure();
// leakedClosure = null;

app.get("/", (req, res) => {
    res.send("Root route");
});

/* 3. Polluting the global variable and not emptying them */
/* 4. Not cancelling timeout objects created by setTimeout and setInterval */
app.get("/leak", (req, res) => {
    const intervalId = setInterval(() => {
        data.push(new Array(10000).join("a"));
    }, 2000);
    clearInterval(intervalId);
    res.send("Memory leak started");
});

/* 5. Circular references */
const obj1 = { fName: "Alice", lName: "Bob" };
const obj2 = { key1: obj1 };
obj1.key = obj2;
// Delete references of mutual objects for avoiding mleak
delete obj2.key1;
delete obj1.key;

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
