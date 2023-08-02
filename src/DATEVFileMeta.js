import _ from "lodash";

class DATEVFileMeta {
    #row_meta;
    constructor(row_meta){
        this.#row_meta = row_meta;
    }

    get exported_source(){
        switch(_.get(this.#row_meta, 0)){
        case 'DTVF': return 'DATEV';
        case 'EXTF': return '3rd';
        default: throw Error('Unknown value for field 0.');
        }
    }

    get version_number(){ return _.get(this.#row_meta, 1) }

    get format_category_code(){ return _.get(this.#row_meta, 2)}

    get format_name(){ return _.get(this.#row_meta, 3)}

    get format_version_code(){ return _.get(this.#row_meta, 4)}

    get created_on_code(){ return _.get(this.#row_meta, 5)}

    get consulant_number(){ return _.get(this.#row_meta, 10)}

    get client_number(){ return _.get(this.#row_meta, 11)}


    toString(){

        return "DATEVFileMeta " + JSON.stringify({
            exported_source: this.exported_source,
            version_number: this.version_number,
            format_category_code: this.format_category_code,
            format_name: this.format_name,
            format_version_code: this.format_version_code,
            created_on_code: this.created_on_code,
            consulant_number: this.consulant_number,
            client_number: this.client_number,
        })

    }
}

export default DATEVFileMeta;