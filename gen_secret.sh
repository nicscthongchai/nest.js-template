./node_modules/.bin/secure-session-gen-key > secret-key

node -e "
    const keyBuffer = fs.readFileSync(path.join(__dirname, 'secret-key'));
    const hexString = keyBuffer.toString('hex');
    console.log(hexString);
"

./node_modules/.bin/rimraf secret-key