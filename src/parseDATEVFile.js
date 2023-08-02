import csv from 'csv-parser';
import _ from "lodash";
import DATEVFileMeta from "./DATEVFileMeta";
import DATEVFileRecordRow from "./DATEVFileRecordRow";

const iconv = require('iconv-lite');



export default async function* parseDATEVFile(fstream){

    const csv_parser = csv({
        separator: ";",
        headers: false,
    });

    fstream
        .pipe(iconv.decodeStream('iso-8859-1'))
        .pipe(csv_parser)
    ;

    let iterator     = csv_parser[Symbol.asyncIterator]();
    let row_meta     = (await iterator.next()).value;
    let row_header   = (await iterator.next()).value;

    const meta = new DATEVFileMeta(row_meta);

    for await (let row_record of iterator){
        yield new DATEVFileRecordRow(meta, row_header, row_record);
    }

}