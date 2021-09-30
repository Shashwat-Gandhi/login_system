const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');

const app = express();
const router = express.Router();

const port = process.env.PORt || 3000;

app.set('view engine', 'ejs');
app.set('views', '../views')


app.use('/',express.static('../public/'))
app.use(bodyparser.urlencoded({ extended : false }));
app.use(bodyparser.json());
app.use('/',router);

// home
router.get('/', (req,res) => {
    res.render('base', {title : 'Login System'});
})

router.post('/', (req,res) => {
    console.log("user : " + req.body.email + " pass : " + req.body.password);
    fs.readFile('../private/users.dat','utf8',(err,data) => {
        if(err) {
            console.error(err);
            return;
        }
        else {
            data = data.trim();
            var dat = data.split(' ');
            for(var i = 0;i < dat.length;i++) {
                dat[i] = dat[i].trim();
            }
            const l = dat.length;
            var found = false;
            for(var i =0;i < l;i+=2) {
               console.log(dat[i])
               console.log(dat[i+1]);
               if(req.body.email == dat[i] && req.body.password == dat[i+1]) {
                   found = true;
                   console.log('user found');
                   res.send('user found');
                   return;
               }
            }
            if(!found) {
                console.log('not found');
                res.send('user not found');
            }
            
        }
    });

})

app.listen(port, () => {
    console.log('listening to server from port : ' + port );
});