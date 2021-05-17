const { exec } = require('child_process')

module.exports = doing = (userr, passs) => new Promise((resolve, reject) => {
    exec('sudo nordvpn logout', (error) => {
        exec(`sudo nordvpn login -u ${userr} -p ${passs}`, (error, stdout, stderr) => {
            if (stderr) resolve({ status: 'no', result: 'Error - stderr', saran: error });
            if (error) resolve({ status: 'no', result: 'Error - Email/Password Salah!', saran: 'Periksa apakah system support dengan sudo atau tidak\ncek juga apakah sudah menginstall nordvpn dengan benar!' });
            aa = stdout.split('\r');
            anu = aa[aa.length - 1].replace(/\n/g, '');
            if (anu.indexOf('Welcome') > -1) {
                exec(`sudo nordvpn account`, (error, stdout) => {
                    if (error) resolve({ 'status': 'no', 'result': 'error saat melihat informasi', saran: error })
                    aa = stdout.trim().split(' ')
                    if (!(aa.indexOf('Active') === -1)) {
                        hasil = `${userr}:${passs} ${stdout.trim().split('(')[1].split(')')[0].split('Expires on ')[1]}`;
                        resolve({ 'status': 'ok', 'result': hasil });
                    } else if (!(aa.indexOf('Inactive') === -1)) {
                        resolve({ 'status': 'no', 'result': 'inactive' });
                    } else {
                        resolve({ status: 'no', result: 'Gagal cek akun', saran: 'Belum di identifikasi' });
                    };
                });
            } else {
                resolve({ status: 'no', result: 'Login gagal', saran: `Periksa kembali email/password\n${anu}` })
            }
        })
    })
})