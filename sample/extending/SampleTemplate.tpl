/*
 * Copyright 2012 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

{Template {
  $classpath : "extending.SampleTemplate",
  $hasScript : true
}}

  {macro main()}
      <h1 class="CSS3">Example how to extend the table template</h1>
      <p>This example shows how to extend the table template. <br /><br />
      For each element detail informations are generated in a hidden row which is only displayed when the <b>Details</b> button has been clicked. <br />
      Additionally the table header is extended with textfields for filtering.</p>

      {@aria:Template {
              defaultTemplate: "extending.ExtendedTableTemplate",
              data: {
                table : {
                  items: this._getDataSet(),
                  config : {
                        filtering : {
                          active : true,
                          filters : [{
                                label : "Show all items", 
                                keyValue : "all", 
                                fn : function (view) {
                                    view.allFilteredIn();
                                  }
                                },{
                                label : "Show no items", 
                                keyValue : "none", 
                                fn : function (view) {
                                    view.allFilteredOut();
                                  }
                                },{
                                label : "Show items ending with \"ium\"", 
                                keyValue : "ium", 
                                fn : function (view) {
                                  view.filterIn(view.FILTER_SET, function(o) {
                                    return (o.value.name.indexOf("ium", o.value.name.length - "ium".length) !== -1);
                                  });
                                }
                                }],
                            filterGroup : "all"

                        },
                        paging : {
                          active : true,
                          position : "top",
                          pageSize : 20
                        },
                        columns : [{
                            name:"Atomic Number",
                            cssClasses:[
                              "tableHeader"
                            ],
                            value:function(row) {
                               return row.atomic_number;
                            },
                            sortable:true
                         },
                         {
                            name:"Symbol",
                            cssClasses:[
                              "tableHeader"
                            ],
                            value:function(row) {
                               return row.symbol;
                            }
                         },
                         {
                            name:"Name",
                            cssClasses:[
                              "tableHeader"
                            ],
                            value:function(row) {
                               return row.name;
                            },
                            sortable:true
                         },
                         {
                            name:"Atomic Weight",
                            cssClasses:[
                              "tableHeader"
                            ],
                            value:function(row) {
                               return row.atomic_weight;
                            }
                         },
                         {
                            name : "Details",
                            cssClasses:[
                              "tableHeader"
                            ],
                            macro : "detailColMacro"
                        }]
                  }
                }
              }
          }/}
  {/macro}



{/Template}