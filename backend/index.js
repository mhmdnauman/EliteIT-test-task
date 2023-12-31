const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });

const bodyParser = require('body-parser');

app.use('/reviews', limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    connection.query('SELECT COUNT(*) AS count FROM products', (err, result) => {
        if (err) {
            throw new Error(err);
        } else {
            const productCount = result[0].count;

            if (productCount === 0) {
                const initialProducts = [
                    { name: 'Product Management Tool', details: `Lorem Ipsum has been the industry{\'}s standard the dummy text ever Lorem Ipsum. Lorem Ipsum has been the industry{\'}s standard the dummy text ever Lorem Ipsum...`, price: 200 },
                    { name: 'Inventory Management Product', details: `Lorem Ipsum has been the industry{\'}s standard the dummy text ever Lorem Ipsum. Lorem Ipsum has been the industry{\'}s standard the dummy text ever Lorem Ipsum...`, price: 200 },
                    { name: 'Hospital Management System', details: `Lorem Ipsum has been the industry{\'}s standard the dummy text ever Lorem Ipsum. Lorem Ipsum has been the industry{\'}s standard the dummy text ever Lorem Ipsum...`, price: 200 }
                ];

                const insertQuery = 'INSERT INTO products (name, details, price) VALUES ?';
                connection.query(insertQuery, [initialProducts.map(product => [product.name, product.details, product.price])], (err, result) => {
                    if (err) {
                        throw new Error(err);
                    } else {
                        console.log('Initial data inserted:', result.affectedRows, 'rows affected');
                    }
                });
            } else {
                console.log('Products table is not empty. Skipping insertion of initial data.');
            }
        }
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
    console.log(req)
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
