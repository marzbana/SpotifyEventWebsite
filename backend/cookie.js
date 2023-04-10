//create a function to encrypt the user's id appended with salt and make sure it can't be decrypted
const salt='4a%Kf#7sL1';
const crypto = require('crypto');
const algorithm = 'sha256';
function encrypt(id){
    const cipher = crypto.createCipher(algorithm, salt+id);
    let crypted = cipher.update(id, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
//export encrypt function
module.exports = encrypt;