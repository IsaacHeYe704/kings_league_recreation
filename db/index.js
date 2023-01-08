import { writeFile } from "node:fs/promises";
import path from "node:path";

export function writeDBfile(dbName, data){
    const filePath = path.join(process.cwd(), "db", `${dbName}.json`);

    return  writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

}