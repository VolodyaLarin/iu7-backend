import {XMLParser} from "fast-xml-parser"

const parser = new XMLParser();

export default (xml: string): Record<string,unknown> => {
    return parser.parse(xml);
}