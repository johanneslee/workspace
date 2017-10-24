module.exports = function(app, fs){
    app.get('/',function(req,res){
        console.log("Index page connected");
        res.render('index', {
            
        });
    });
    app.get('/index',function(req,res){
        console.log("Index page connected");
        res.render('index', {
            
        });
    });
    app.get('/main',function(req,res){
        console.log("Main page connected");
        res.render('main', {
            
        });
    });
    app.get('/chat',function(req,res){
        console.log("Chat page connected");
        res.render('chat', {
            
        });
        
    });
    app.get('/crm',function(req,res){
        console.log("Crm page connected");
        res.render('crm', {
            
        });
    });
}