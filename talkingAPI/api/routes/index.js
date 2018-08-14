const express = require('express');
const router = express.Router();
const mysql = require('./../models/database')
const crypto = require('crypto')

router.get('/', function (req,res) {
    let current = '';
    const sql = 'select * from `current_user`';
    mysql.query(sql, function (err,result) {
        if (err) {
            console.log(err)
        }
        for (let x in result) {
            if (result[x]) {
                current = result[x].user
            }
        }
        console.log(current)
        res.send(current)
    })
})

//注册
router.post('/register',function (req, res) {
    let registerData = {
        username: req.body.username,
        password: req.body.password,
        message: '注册失败'
    };
    if (registerData.username === '' || registerData.password === '') {
        registerData.message = '账户或密码不能为空';
        res.send(registerData);
        return;
    }
    let q = 'select * from users';
    mysql.query(q, function (err,result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        for (let x in result) {
            if (result[x].username === registerData.username) {
                registerData.message = '用户已注册，请重新注册'
                res.send(registerData);
                return;
            }
        }
    })

    let query = 'insert into users (username, password) values (?, ?)'
    let queryParams = [registerData.username, registerData.password]
    mysql.query(query, queryParams, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send(registerData);
            return
        }
        registerData.message = '注册成功！';
        console.log(fields)
        res.send(registerData)
    })
})
//登录
router.post('/login', function (req, res) {
    let loginData = {
         'username': req.body.name,
         'password': req.body.pswd,
         'message': '登录失败',
         'currentUser': ''
    }
    const sql = 'select * from users';
    mysql.query(sql, function (err,result) {
        if (err) {
            console.log('----------')
            console.log(err);
            return;
        }
        for (let x in result) {
            if (result[x].username === loginData.username &&
                result[x].password === loginData.password) {
                loginData.message = '登录成功！';
                loginData.currentUser = result[x].username;
                mysql.query('truncate `current_user`');
                const sqlCurrent = 'insert into `current_user` (user) values (?)';
                let currParams = result[x].username;
                console.log(currParams);
                mysql.query(sqlCurrent, currParams, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
                res.send(loginData);
                return;
            }
        }
        res.send(loginData)
    })
})
//登出
router.post('/logout',function (req,res) {
    let data = {
        logoutMessage: req.body.logoutMessage,
        status: 'ok'
    }
    if (data) {
        const sql = 'truncate `current_user`'
        mysql.query(sql,function (err) {
            if (err) {
                console.log(err);
                return;
            }
            res.send(data)
        })
    }
})


module.exports = router;
