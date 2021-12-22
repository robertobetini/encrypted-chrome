(async () => {    
    async function applyFunctionRecursivelyAsync (node, func, params) {
        await func(node, params);
        
        node.childNodes.forEach( async childNode => {
            await applyFunctionRecursivelyAsync(childNode, func, params);
        });
    }
    
    async function encryptAesCbc(message, key) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(message);                    
    
        // encrypt the message
        const hashBuffer = await crypto.subtle.encrypt(CRYPTO_ALGORITHM, key, msgBuffer);
    
        // convert bytes to UTF-8 string
        const encryptedMessage = new TextDecoder("UTF-8").decode(hashBuffer);             
        return encryptedMessage;
    }
    
    async function decryptAesCbc(message, key) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(message);
    
        // decrypt the message
        const hashBuffer = await crypto.subtle.decrypt(CRYPTO_ALGORITHM, key, msgBuffer);
    
        // convert bytes to UTF-8 string
        const decryptedMessage = new TextDecoder("UTF-8").decode(hashBuffer);
        return decryptedMessage;
    }
    
    async function encryptNodeTextWithAesCbc(node, key) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = await encryptAesCbc(node.textContent, key);
        }
    }
    
    async function decryptNodeTextWithAesCbc(node, key) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = await decryptAesCbc(node.textContent, key);
        }
    }
    
    // AES-CBC encryption settings 
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const CRYPTO_ALGORITHM = {
        name: "AES-CBC",
        iv,
        length: 128
    };
    const key = await crypto.subtle.generateKey(CRYPTO_ALGORITHM, false, ["decrypt", "encrypt"]);

    const rootNode = document.getRootNode();
    
    const trollface = "⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣦⣤⣀\n ⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄\n ⠀⠀⢀⣘⣛⣿⣟⣿⡋⠁⣀⣀⠲⠦⡝⢻⣿⣿⠿⠛⠉⠉⢉⣻⣿⣿⣧⣀\n ⠀⣰⡟⣡⣶⠶⣬⣝⣛⣛⣩⣿⣿⣷⣶⣿⣿⣿⡆⢾⣿⣿⠿⠟⣋⣙⣻⣿⠆\n ⠀⢿⣇⣿⣅⠰⣦⣍⠛⠿⢿⣿⣿⡍⣼⠛⢿⣿⣿⡆⣉⣻⣿⣿⠏⢻⣿⣿⠁\n ⠀⠀⢩⣿⣿⣦⠈⣍⠁⠻⠷⣶⡌⣉⣛⣛⠛⠻⠥⠾⠟⠛⢋⡁⡄⠈⣿⠃\n ⠀⠀⠀⠹⣿⣿⣷⣌⠁⣶⣦⣤⢀⣉⠛⠛⠁⠛⠛⠘⠛⠋⠈⠁⠀⢀⣿\n ⠀⠀⠀⠀⠙⢿⣿⣿⣷⣮⣙⠋⢼⣿⣿⡇⣶⣶⡆⣤⡤⣠⠀⡤⠀⣼⣿\n ⠀⠀⠀⠀⠀⠀⠈⠛⠿⣿⣿⣿⣷⣶⣤⣥⣬⣭⣥⣭⣤⣤⣶⣶⣿⣿⣿⡄\n ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇\n ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠛⠛⠻⠿⠿⠿⠿⠿⠛⠁\n";

    setTimeout(() => {
        applyFunctionRecursivelyAsync(rootNode, encryptNodeTextWithAesCbc, key)
        console.log(trollface);
    }, 10000);
})();
