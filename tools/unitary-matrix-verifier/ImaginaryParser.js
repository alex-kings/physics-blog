class Parser {
    state = 0;
    
    constructor() {


    }

    sanitize(s) {

    }
    tokenize(s) {
        s = s.replace(/\s/g, "");
        return s.split(/(?:\/|\+|-|\*|\(|\))+/) 
    }
}

