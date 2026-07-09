const https = require('https');

const url = 'https://physical-education-agent.vercel.app/app.js';
https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('Cloud app.js size: ' + (data.length / 1024).toFixed(1) + ' KB');
        const checks = [
            ['parseTimeToSeconds has fen char', data.includes('\u5206') && data.includes('function parseTimeToSeconds')],
            ['iframe PDF approach', data.includes('createElement(\'iframe\')') || data.includes('createElement("iframe")')],
            ['upload province init', data.includes('initUploadProvinceSelector')],
            ['isTimeItem function', data.includes('function isTimeItem')],
            ['exportPDFFromHTML async', data.includes('async function exportPDFFromHTML')],
            ['HTML quote escaping', data.includes('replace(/"/g')],
        ];
        let pass = 0, fail = 0;
        checks.forEach(([name, ok]) => {
            console.log((ok ? 'PASS' : 'FAIL') + ': ' + name);
            if (ok) pass++; else fail++;
        });
        console.log('\n' + pass + ' passed, ' + fail + ' failed');

        // Check index.html
        https.get('https://physical-education-agent.vercel.app/index.html', (res2) => {
            let data2 = '';
            res2.on('data', chunk => data2 += chunk);
            res2.on('end', () => {
                console.log('\n--- index.html checks ---');
                const checks2 = [
                    ['uploadProvinceSelect exists', data2.includes('uploadProvinceSelect')],
                    ['uploadCitySelect exists', data2.includes('uploadCitySelect')],
                    ['version v=20260709b', data2.includes('v=20260709b')],
                ];
                checks2.forEach(([name, ok]) => {
                    console.log((ok ? 'PASS' : 'FAIL') + ': ' + name);
                });
            });
        }).on('error', (e) => {
            console.error('ERROR getting index.html: ' + e.message);
        });
    });
}).on('error', (e) => {
    console.error('ERROR: ' + e.message);
});
