var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/AAAAYuBTFtc:APA91bHWMa7AG5JxNNEeEtX6osi0gLWt4SP_p9WyhlhgajnVa1YMYj4RAc7qUpV3EbLxD2-t6Iiihe3s3YbuJ6qA8Xa6XQczyPZtvNpL9Pq-dEpHHeJd3ZWcsXt88nlEZAg5KGehZgPP",
    "keys": {
        "p256dh": "BIOJ9Q7Uq/YIBDPRwcHgrWPnyxZGbgUpp3TDMbuRQ3UalhSjeYE4ao44p381sZEJVFF+eKh+hbcwzR98eghMgqY=", 
        "auth": "KFi8elC/y5nOa958WWqrHA=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AIzaSyACY6CN3u-nrLrGwPrT8Abcn0Y0AujIlgo',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);