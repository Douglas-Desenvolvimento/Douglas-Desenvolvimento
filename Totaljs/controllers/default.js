exports.install = function() {
    ROUTE('GET /', home);
}

function home() {
    var self = this;     // `This` is the controller instance
    self.view('index');  // self.view() will resolve views/index.html
}