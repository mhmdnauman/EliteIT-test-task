const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});

connection.connect((err) => {
    if (err) throw new Error(err);
    console.log("connected");
    createTable();
});

const createTable = () => {
    connection.query(`CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name VARCHAR(100),
        details VARCHAR(500),
        price INT NOT NULL
        )`, (err) => {
            if (err) throw new Error(err);
            console.log('table created');
        });

        connection.query(`CREATE TABLE IF NOT EXISTS reviews (
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(500),
            product_name VARCHAR(500),
            rating INT NOT NULL
            )`, (err) => {
                if (err) throw new Error(err);
                console.log('table created');
            });
            insertInitialData();
}

const insertInitialData = () => {
    const initialProducts = [
        { name: 'Product 1', details: 'Demo details for Product 1', price: 50 },
        { name: 'Product 2', details: 'Demo details for Product 2', price: 70 },
        { name: 'Product 3', details: 'Demo details for Product 3', price: 90 }
    ];

    const insertQuery = 'INSERT INTO products (name, details, price) VALUES ?';
    connection.query(insertQuery, [initialProducts.map(product => [product.name, product.details, product.price])], (err, result) => {
        if (err) throw new Error(err);
        console.log('Initial data inserted:', result.affectedRows, 'rows affected');
    });
}


const updateProductPrices = () => {
    const updateQuery = 'UPDATE products SET price = ROUND(price * (1 + (RAND() - 0.5) / 10), 2)';
    connection.query(updateQuery, (err, result) => {
        if (err) {
            console.error('Error updating prices:', err);
        } else {
            console.log('Product prices updated successfully');
        }
    });
};

const updateInterval = 24 * 60 * 60 * 1000;

setInterval(() => {
    updateProductPrices();
}, updateInterval);

updateProductPrices();

// Endpoint to fetch products
app.get('/products', (req, res) => {
    connection.query('SELECT * FROM products', (err, results) => {
        if (err) throw new Error(err);
        res.json({ products: results });
    });
});

// Endpoint to add reviews
app.post('/reviews', (req, res) => {
    const { name, email, product_name, rating } = req.body;
    const insertReviewQuery = 'INSERT INTO reviews (name, email, product_name, rating) VALUES (?, ?, ?, ?)';
    connection.query(insertReviewQuery, [name, email, product_name, rating], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Review added successfully', reviewId: result.insertId });
        }
    });
});

// Endpoint to fetch all reviews
app.get('/reviews/all', (req, res) => {
    connection.query('SELECT * FROM reviews', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ reviews: results });
        }
    });
});

app.listen(3000);
