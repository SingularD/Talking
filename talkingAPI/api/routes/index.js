const express = require('express');
const router = express.Router();
const mysql = require('./../models/database')
const crypto = require('crypto')
//获取当前用户
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

//获取当前用户所有文章
router.post('/user', function (req,res) {
    let data = {
        username: req.body.username,
        title: [],
        content: [],
        dateTime: []

    }
    const sql1 = 'select * from passage where username = ?'
    const sql1Params = data.username
    mysql.query(sql1,sql1Params,function (err,result) {
        if (err) {
            console.log(err)
            return
        }
        for (let x in result) {
            data.title.push(result[x].passage_title)
            data.content.push(result[x].passage_content)
            data.dateTime.push(result[x].submit_time)
        }
        console.log(data)
        res.send(data)
    })
})


//提交文章
router.post('/write', function (req,res) {
    let data = {
        user: '',
        title: req.body.title,
        content: req.body.content,
        status: '提交失败',
        datetime: req.body.datetime
    }
    console.log(data)
    const sql1 = 'select * from `current_user`'
    mysql.query(sql1,function (err,result) {
        if (err) {
            console.log(err);
            return;
        }
        if (result[0].user){
            data.user = result[0].user
            const sql2 = 'insert into passage ' +
                '(id,username,`passage_title`,`passage_content`,`submit_time`) ' +
                'values (0,?,?,?,?)'
            let sql2Params = [data.user,data.title,data.content,data.datetime]
            mysql.query(sql2,sql2Params,function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                data.status = '提交成功！'
                res.send(data)
            })
        } else {
            res.send(data)
        }
    })
})

//删除文章
router.post('/delete', function (req,res) {
    let data = {
        title: req.body.title,
        status: '删除失败'
    }
    const sql = 'delete from passage where `passage_title` = ?'
    let sqlParams = data.title
    mysql.query(sql, sqlParams, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        data.status = 'ok'
        res.send(data.status)
    })
})


module.exports = router;
