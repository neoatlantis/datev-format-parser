const { parseDATEVFile } = require("../dist/datev-format-parser.dev.js");
const { createReadStream } = require("fs");



(async ()=>{

    const filename = process.argv[2];
    console.log("Read: ", filename);

    const fstream = createReadStream(filename);

    for await (let record of parseDATEVFile(fstream)){
        console.log(record.toJSON());
        console.log(record.get("Umsatz ohne"));
        process.exit();
    }

})();