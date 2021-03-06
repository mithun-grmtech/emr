// For docs read
// https://vuex-orm.org/guide/model/defining-models.html
// webclient/docs/models.md

import { Model } from "@vuex-orm/core";
export default class helloworld extends Model {
  static entity = "helloworld"; // This is like table name of mysql DB

  static primaryKey = "clientSideUniqRowId";

  static fields() {
    return {
      id: this.uid(), // These are the fields in the table
      msg: this.string(null),
    };
  }
}
