const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = 'path/to/your/file.ext'; // Replace with actual file path
    const stat = fs.statSync(filePath);

    // Set appropriate headers for file download
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename=downloaded_file.ext',
        'Content-Length': stat.size
    });

    // Create a read stream from the file and pipe it to the response
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});


function downloadFile() {
    fetch('http://localhost:3000')
        .then(response => {
            const disposition = response.headers.get('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                return response.blob();
            }
            throw new Error('File download failed');
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '/home/mukila/Downloads/mukila CV Resume.pdf'; // Specify the default filename
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => console.error('Download failed', error));
}

