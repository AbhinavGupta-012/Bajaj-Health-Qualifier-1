require("dotenv").config();

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})  

app.get('/health', (req, res) => {
    return res.status(200).json({
        is_success: true,
        official_email: 'abhinav1758.be23@chitkara.edu.in'
    });
});

app.post('/bfhl', async (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({
            is_success: false,
            official_email: 'abhinav1758.be23@chitkara.edu.in',
            message: 'Key is required' 
        });
    }
    let output;
    switch(data.key){
        case 'fibonacci':
            output = fib(data.value);
            break;
        case 'prime':
            output = prime(data.value);
            break;
        case 'lcm':
            output = lcm(data.value);
            break;
        case 'hcf':
            output = hcf(data.value);
            break;
        case 'AI':
            output = await askGemini(data.value);
            break;
    }
    return res.status(200).json({
        is_success: true,
        official_email: 'abhinav1758.be23@chitkara.edu.in',
        data: output
    });
});

function fib(n){
    if (n == 0){
        return null;
    }
    if (n == 1){
        return [0];
    }
    if (n == 2){
        return [0, 1];
    }
    let a = 0;
    let b = 1;
    let arr = [a, b];
    n -= 2;
    while (n > 0){
        arr.push(a + b);
        a = b;
        b = a + b;
        n--;
    }
    return arr;
}

function prime(arr){
    let res = [];
    for (let i = 0; i < arr.length; i++){
        if (isPrime(arr[i])){
            res.push(arr[i]);
        }
    }
    return res;
}

function isPrime(n){
    if (n == 1){
        return false;
    }
    for (let i = 2; i * i <= n ; i++){
        if (n % i == 0){
            return false;
        }
    }
    return true;
}

function lcm(arr){
    let lcm = arr[0];
    for (let i = 1; i < arr.length; i++){
        lcm = ((arr[i] * lcm)) / gcd(arr[i], lcm);
    }
    return lcm;
}

function hcf(arr){
    let hcf = arr[0];
    for (let i = 1; i < arr.length; i++){
        hcf = gcd(hcf, arr[i]);
    }
    return hcf;
}

function gcd(a, b){
    if (b == 0){
        return a;
    }
    return gcd(b, a % b);
}

async function askGemini(question) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: question }]
                    }
                ]
            })
        }
    );

    const data = await response.json();

    if (
        !data.candidates ||
        data.candidates.length === 0 ||
        !data.candidates[0].content ||
        !data.candidates[0].content.parts
    ) {
        throw new Error("Gemini returned no usable text");
    }

    return data.candidates[0].content.parts
        .map(p => p.text)
        .filter(Boolean)
        .join(" ");
}




app.listen(3000, ()=>{
    console.log(`Server running at http://localhost:3000`);
});