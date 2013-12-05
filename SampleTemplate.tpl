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
	$classpath : 'SampleTemplate',
	$css: ["SampleTemplateStyle"],
  $hasScript : true
}}

{macro main()}
  <div class="tableTemplate">
    <h1>This page demonstrates the usage of the TableTemplate.</h1>

    {call simpleTable() /}

    {call sortingTable() /}

    {call pagingTable() /}

    {call filteringTable() /}

    {call complexTable() /}

  </div>
{/macro}

{macro simpleTable()}
<h2>Simple Table Example ({@aria:Link {label : "hide/show", onclick : { fn : __toggle , args : "simpleTable"} }/})</h2> 
<hr />
<div id="simpleTable">
{@aria:Template {
        defaultTemplate: "atplugins.tabletemplate.Table",
        data: {
          table : {
            items: this._getDataSet(0, 5),
            config : {
                columns : [
                       {
                          name:"Atomic Number",
                          value:function(row) {
                             return row.atomic_number;
                          }
                       },
                       {
                          name:"Symbol",
                          value:function(row) {
                             return row.symbol;
                          }
                       },
                       {
                          name:"Name",
                          cssClasses:[
                             "customClass"
                          ],
                          type:"text",
                          value:function(row) {
                             return row.name;
                          }
                       }]
            }
          }
        }
    }/}
</div>
{/macro}


{macro sortingTable()}
<h2>Table With Sorting ({@aria:Link {label : "hide/show", onclick : { fn : __toggle , args : "sortingTable"} }/})</h2>
<hr />
<div id="sortingTable">
{@aria:Template {
        defaultTemplate: "atplugins.tabletemplate.Table",
        data: {
          table : {
            items: this._getDataSet(0, 20),
            config : {
                columns : [
                       {
                          name:"Atomic Number",
                          value:function(row) {
                             return row.atomic_number;
                          }
                       },
                       {
                          name:"Symbol",
                          value:function(row) {
                             return row.symbol;
                          },
                          sortable:true
                       },
                       {
                          name:"Name",
                          cssClasses:[
                             "customClass"
                          ],
                          type:"text",
                          value:function(row) {
                             return row.name;
                          },
                          sortable:true
                       }]
            }
          }
        }
    }/}
  </div>
{/macro}

{macro pagingTable()}
  <h2>Table With Paging ({@aria:Link {label : "hide/show", onclick : { fn : __toggle , args : "pagingTable"} }/})</h2>
  <hr />
  <div id="pagingTable">
  {@aria:Template {
          defaultTemplate: "atplugins.tabletemplate.Table",
          data: {
            table : {
              items: this._getDataSet(0, 30),
              config : {
                  paging : {
                    active : true,
                    position: "top",
                    pageSize : 10
                  },
                  columns : [
                         {
                            name:"Atomic Number",
                            value:function(row) {
                               return row.atomic_number;
                            }
                         },
                         {
                            name:"Symbol",
                            value:function(row) {
                               return row.symbol;
                            }
                         },
                         {
                            name:"Name",
                            value:function(row) {
                               return row.name;
                            }
                         }]
              }
            }
          }
      }/}
  </div>
{/macro}

{macro filteringTable()}
  <h2>Table With Filtering ({@aria:Link {label : "hide/show", onclick : { fn : __toggle , args : "filteringTable"} }/})</h2>
  <hr />
  <div id="filteringTable">
  {@aria:Template {
          defaultTemplate: "atplugins.tabletemplate.Table",
          data: {
            table : {
              items: this._getDataSet(0, 5),
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
                  columns : [
                         {
                            name:"Atomic Number",
                            value:function(row) {
                               return row.atomic_number;
                            }
                         },
                         {
                            name:"Symbol",
                            value:function(row) {
                               return row.symbol;
                            }
                         },
                         {
                            name:"Name",
                            value:function(row) {
                               return row.name;
                            }
                         }]
              }
            }
          }
      }/}
    </div>
{/macro}


{macro complexTable()}
  <h2>Complex Table Example ({@aria:Link {label : "hide/show", onclick : { fn : __toggle , args : "complexTable"} }/})</h2>
  <hr />
  <div id="complexTable">
  {@aria:Template {
          defaultTemplate: "atplugins.tabletemplate.Table",
          data: {
            table : {
              items: this._getDataSet(0),
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
                      label : "Show atomic_number above 100",
                      keyValue : "invoiced",
                      fn : function (view) {
                          view.filterIn(view.FILTER_SET, function(o) {
                            return ( parseInt(o.value.atomic_number,10) > 100);
                          });
                        }
                      }],
            filterGroup : "all"
          },
          paging : {
            active : true,
            position: "bottom",
            pageSize : 10
          },
          cssClasses : [],
          selection : {
              selectable : true,
              multiple : false,
          },
          columns : [{
                        name:"Atomic Number",
                        value:function(row) {
                           return row.atomic_number;
                        },
                        sortable:true
                     },
                     {
                        name:"Symbol",
                        value:function(row) {
                           return row.symbol;
                        }
                     },
                     {
                        name:"Name",
                        value:function(row) {
                           return row.name;
                        },
                        sortable:true
                     },
                     {
                        name:"Atomic Weight",
                        value:function(row) {
                           return row.atomic_weight;
                        }
                     },
                     {
                        name:"Density g/cm",
                        value:function(row) {
                           return row.density;
                        }
                     },
                     {
                        name:"Melting Point K",
                        value:function(row) {
                           return row.melting_point;
                        }
                     },
                     {
                        name:"Boiling Point K",
                        value:function(row) {
                           return row.boiling_point;
                        }
                     },
                     {
                        name:"Atomic Radius pm",
                        value:function(row) {
                           return row.atomic_radius;
                        }
                     },
                     {
                        name:"Covalent Radius pm",
                        value:function(row) {
                           return row.covalent_radius;
                        }
                     },
                     {
                        name:"Atomic Volume cm3/mol",
                        value:function(row) {
                           return row.atomic_volume;
                        }
                     },
                     {
                        name:"Specific Heat kJ/mol",
                        value:function(row) {
                           return row.specific_heat;
                        }
                     },
                     {
                        name:"Fusion Heat kJ/mol",
                        value:function(row) {
                           return row.fusion_heat;
                        }
                     },
                     {
                        name:"Evaporation Heat kJ/mol",
                        value:function(row) {
                           return row.evaporation_heat;
                        }
                     },
                     {
                        name:"Thermal conductivity (@25°C W/m K)",
                        value:function(row) {
                           return row.thermal_conductivity;
                        }
                     },
                     {
                        name:"Pauling Negativity",
                        value:function(row) {
                           return row.pauling_negativity;
                        }
                     },
                     {
                        name:"First Ionizing kJ/mol",
                        value:function(row) {
                           return row.first_ionizing;
                        }
                     },
                     {
                        name:"Oxidation States",
                        value:function(row) {
                           return row.oxidation_states;
                        }
                     },
                     {
                        name:"Electronic Configuration",
                        value:function(row) {
                           return row.electronic_configuration;
                        }
                     },
                     {
                        name:"Lattice Structure",
                        value:function(row) {
                           return row.lattice_structure;
                        }
                     },
                     {
                        name:"Lattice Constant",
                        value:function(row) {
                           return row.lattice_constant;
                        }
                     }
                  ]
      }}
          }
      }/}
      </div>
{/macro}

{/Template}