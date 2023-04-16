//create a function to encrypt the user's id appended with salt and make sure it can't be decrypted
const salt='4a%Kf#7sL1';
const crypto = require('crypto');
const algorithm = 'sha256';
function encrypt(id){
    const cipher = crypto.createHash(algorithm);
    cipher.update( salt+id);
    return cipher.digest('hex');


}
//export encrypt function
module.exports = encrypt;