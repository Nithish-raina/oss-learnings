const express = require("express");
const app = express();

/* 1. Memoizing imports */
const memoizeImports = (fn) => {
    let cache = false;
    let result = undefined;
    return () => {
        if (cache) {
            console.log("Using cached result");
            return result;
        } else {
            console.log("Performing file import operation");
            result = fn();
            cache = true;
            fn = undefined;
            return result;
        }
    };
};

const memoizedImport = memoizeImports(() =>
    require("../memory-leaks/customLogger")
);

const memoizeComputation = (fn) => {
    const cache = {};
    return (...args) => {
        console.log(`ARGS - ${args}`);
        const UNIQUE_KEY = args.join("-");
        if (!cache[UNIQUE_KEY]) {
            console.log("PERFORMING COMPUTATION");
            cache[UNIQUE_KEY] = fn(...args);
        }
        console.log(cache);
        return cache[UNIQUE_KEY];
    };
};

const complexComputation = (a, b) => {
    return Math.sin(Math.pow(a * b, b * a)).toFixed(2);
    // return a * b;
};

// console.log(memoizedImport()); // performs file import
// console.log(memoizedImport()); // uses cached result

const memoizedComputation = memoizeComputation(complexComputation);
// console.log(memoizedComputation(2, 3)); // computes value
// console.log(memoizedComputation(5, 2)); // computes value
// console.log(memoizedComputation(2, 3)); // returns cached result

/* 3. Returning an anonymous function -> returns a function */
const f1 = (caller) => `I'm F1 called by ${caller}`;
const f2 = () => {
    return (callerName) => {
        return f1;
    };
};
const resultOfAnonymousFn = f2();
console.log(resultOfAnonymousFn()("f2"));

app.get("/", (req, res) => {
    res.send("Welcome Home");
});

app.listen(3000, () => {
    console.log("Server listening on Port 3000");
});
