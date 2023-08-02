import _ from "lodash";

function zip_header_with_record(header, record){
    let ret = {};
    for(let key in header){
        if(record[key]){
            ret[header[key]] = record[key];
        }
    }
    return ret;
}


class DATEVFileRecordRow {

    #meta;
    #row_header;
    #row_record;

    #zipped;
    #array_header;

    constructor(datev_file_meta, row_header, row_record){
        this.#meta = datev_file_meta;
        this.#row_header = row_header;
        this.#row_record = row_record;
        this.#array_header = Object.values(this.#row_header);

        this.#zipped = zip_header_with_record(row_header, row_record);
    }

    get meta(){ return this.#meta };

    find_header(keywords){
        if(this.#array_header.indexOf(keywords) >= 0) return keywords;

        let keyword_list = keywords.split(" ").map(e=>e.toLowerCase());
        let results = this.#array_header.filter((header_name)=>{
            return (
                keyword_list
                .map((keyword)=>header_name.toLowerCase().indexOf(keyword)>=0)
                .every((e)=>e)
            );
        });

        if(results.length < 1){
            throw Error("No header found with: " + keywords);
        }
        if(results.length != 1){
            throw Error(
                "Ambiguous header found with: "
                + keywords
                + " as in " + results.map(e=>`'${e}'`).join(", ")
            );
        }
        return results[0];
    }

    toJSON(){
        return JSON.stringify(this.#zipped);
    }

    get(keywords){
        return _.get(this.#zipped, this.find_header(keywords), "");
    }

}

export default DATEVFileRecordRow;