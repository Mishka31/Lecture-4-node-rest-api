const http = require('http')
const fs = require('fs').promises;

const PORT = 8081


const requestHandler = async (request, response) => {
    const data = await fs.readFile('./index.html', 'utf8')
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
}

const server = http.createServer(requestHandler)

server.listen(PORT, (err) => {
    if (err) {
        console.error('Error at a server launch', err);
    }
    console.log(`Server work at port ${PORT}`);
})