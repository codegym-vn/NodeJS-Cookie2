var cookie = require('cookie');
var escapeHtml = require('escape-html');
var http = require('http');

function creatServer(req, res) {

    // Parse the cookies on the request
    var cookies = cookie.parse(req.headers.cookie || '');
    var viewnumberString = cookies.viewnumber;
    if (viewnumberString){
        // Set a new cookie with the viewnumber
        viewnumber = Number(viewnumberString)+1;

        res.setHeader('Set-Cookie', cookie.serialize('viewnumber', String(viewnumber), {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 1 week
        }));

        // Redirect back after setting cookie
        res.statusCode = 302;
        res.setHeader('Location', req.headers.referer || '/');
        res.end();
        return;
    }
    // Parse the cookies on the request
    var cookies1 = cookie.parse(req.headers.cookie || '');

    // Get the visitor name set in the cookie
    var name = cookies1.viewnumber;

    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
    res.write('<input type="submit" value="Set Name">');
    res.end('</form>');
}

http.createServer(creatServer).listen(8080);
