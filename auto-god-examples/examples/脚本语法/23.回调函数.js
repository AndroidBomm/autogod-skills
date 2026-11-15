function fetchData(callback) {
    sleep(1000);
    var data = 'Some data from server';
    callback(data);
}

fetchData(function(result) {
    console.log(result);
});
