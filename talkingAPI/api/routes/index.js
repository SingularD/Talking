const express = require('express');
const router = express.Router();
const mysql = require('./../models/database')
const crypto = require('crypto')
const changeDate = require('./../models/changeFormDate')
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
        dateTime: [],
        tag1: [],
        tag2: [],
        tag3: []
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
            data.tag1.push(result[x].tag1)
            data.tag2.push(result[x].tag2)
            data.tag3.push(result[x].tag3)
        }
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
        datetime: req.body.datetime,
        tag1: req.body.tags[0],
        tag2: req.body.tags[1],
        tag3: req.body.tags[2]
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
                '(id,username,`passage_title`,`passage_content`,`submit_time`,pv,tag1,tag2,tag3) ' +
                'values (0,?,?,?,?,0,?,?,?)'
            let sql2Params = [data.user,data.title,data.content,data.datetime,data.tag1,data.tag2,data.tag3]
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

//查询文章
router.post('/getPassage',function (req,res) {
    let data = {
        title: req.body.title,
        time: req.body.time,
        content: '',
        author: '',
    }
    const sql1 = 'update passage set pv = pv + 1 where `submit_time` = ?'
    let sql1Params = data.time;
    mysql.query(sql1,sql1Params, function (err) {
        if (err) {
            console.log(err);
        }
        const sql = 'select * from passage where `passage_title` = ? and `submit_time` = ?'
        let sqlParams = [data.title, data.time]
        mysql.query(sql, sqlParams, function (err,result) {
            if (err) {
                console.log(err);
                return;
            }
            data.content = result[0].passage_content;
            data.author = result[0].username;
            res.send(data)
        })
    })
})


//获取最新发布的文章和最热文章
router.get('/getLatestPassages',function (req,res) {
    let data = {
        latestTitles: [],
        latestPv: [],
        latestTime:[],
        latestUser: []
    }
    const sql = 'select * from passage order by submit_time desc'
    mysql.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < result.length; i++){
            data.latestTitles.push(result[i].passage_title)
            data.latestPv.push(result[i].pv)
            data.latestTime.push(result[i].submit_time)
            data.latestUser.push(result[i].username)
        }
       res.send(data)
    })
})

router.get('/getHottestPassages', function (req,res) {
    let data = {
        hottestTitles: [],
        hottestPv: [],
        hottestUser: [],
        hottestTime: []
    }
    const sql1 = 'select * from passage order by pv desc'
    mysql.query(sql1, function (err,result) {
        if (err) {
            console.log(err)
            return
        }
        for (let i = 0; i <result.length; i++) {
            data.hottestTitles.push(result[i].passage_title)
            data.hottestPv.push(result[i].pv)
            data.hottestTime.push(result[i].submit_time)
            data.hottestUser.push(result[i].username)
        }
        res.send(data)
    })
})
//获取所有文章
router.get('/passagesList', function (req,res) {
    let data = {}
    const sql = 'select * from passage'
    mysql.query(sql, function (err,result) {
        if (err) {
            console.log(err);
            return
        }
        data = result
        res.send(data)
    })
})


//获取所含标签的文章
router.post('/tagPassages', function (req, res) {
    let data = {
        tag: req.body.tag,

    }
    const sql = ' select * from passage where tag1 = ? or tag2 = ? or tag3 = ?'
    let sqlParams = [data.tag, data.tag, data.tag]
    mysql.query(sql, sqlParams, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result)
        res.send(result)
    })
})

module.exports = router;
