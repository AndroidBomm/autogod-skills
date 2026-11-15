function asyncOperation() {
    return new Promise((resolve, reject) => {
        sleep(1000);
        const success = true;
        if (success) {
            resolve('Operation successful');
        } else {
            reject('Operation failed');
        }
    });
}

asyncOperation()
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.log(error);
});
